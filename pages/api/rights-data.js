// /pages/api/rights-data.js
// Sources: FTC RSS + Congress.gov RSS + Copyright Office RSS + EUR-Lex RSS + platform developer blogs
// Cache: Upstash Redis REST, 6hr TTL — reuses FTC + Congress from shared regulatory cache

const CACHE_KEY = 'aloha:rights:v2'
const CACHE_TTL = 60 * 60 * 6

async function redisGet(key) {
  try {
    const r = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` }
    })
    const d = await r.json()
    return d.result ? JSON.parse(d.result) : null
  } catch { return null }
}

async function redisSet(key, value, ttl) {
  try {
    await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${key}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([JSON.stringify(value), 'EX', ttl])
    })
  } catch {}
}

function parseRSS(xml, keywords = []) {
  const items = []
  const matches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)
  for (const m of matches) {
    const b = m[1]
    const title = (b.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || b.match(/<title>(.*?)<\/title>/))?.[1]?.trim()
    const link = b.match(/<link>(.*?)<\/link>/)?.[1]?.trim()
    const date = b.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim()
    const desc = (b.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || b.match(/<description>(.*?)<\/description>/))?.[1]?.trim()
    if (!title) continue
    if (keywords.length === 0 || keywords.some(kw => title.toLowerCase().includes(kw) || desc?.toLowerCase().includes(kw))) {
      items.push({ title, link, date, description: desc?.slice(0, 180) })
    }
  }
  return items.slice(0, 4)
}

async function safeFetch(url, opts = {}) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'AlohaAIConsulting/1.0' }, ...opts })
    return r.ok ? await r.text() : null
  } catch { return null }
}

async function fetchFTCRights() {
  const xml = await safeFetch('https://www.ftc.gov/feeds/press-releases.xml')
  if (!xml) return []
  return parseRSS(xml, ['ai', 'influencer', 'disclosure', 'endorsement', 'synthetic', 'creator', 'deepfake'])
}

async function fetchCongressRights() {
  const xml = await safeFetch('https://www.congress.gov/rss/legislation.xml')
  if (!xml) return []
  return parseRSS(xml, ['no fakes', 'likeness', 'deepfake', 'artificial intelligence', 'creator', 'synthetic media', 'defiance'])
}

async function fetchCopyrightOffice() {
  const xml = await safeFetch('https://www.copyright.gov/newsnet/rss.xml')
  if (!xml) return []
  return parseRSS(xml, ['ai', 'artificial intelligence', 'music', 'generative', 'training', 'authorship'])
}

async function fetchEURLex() {
  // EU AI Act implementation notices
  const xml = await safeFetch('https://eur-lex.europa.eu/oj/direct-access.html?ojYears=2024,2025,2026&ojSeries=L&sortOrder=newest&format=rss')
  if (!xml) return []
  return parseRSS(xml, ['artificial intelligence', 'ai act', 'synthetic', 'deepfake']).slice(0, 3)
}

async function fetchPlatformBlogs() {
  const feeds = [
    { name: 'Meta Newsroom', url: 'https://about.fb.com/feed/' },
    { name: 'TikTok Newsroom', url: 'https://newsroom.tiktok.com/en-us/rss' },
    { name: 'YouTube Blog', url: 'https://blog.youtube/feeds/posts/default' }
  ]
  const kw = ['ai', 'artificial intelligence', 'creator', 'disclosure', 'synthetic', 'labeling', 'policy']
  const results = []
  for (const feed of feeds) {
    try {
      const xml = await safeFetch(feed.url)
      if (!xml) continue
      const items = parseRSS(xml, kw).slice(0, 2)
      items.forEach(item => results.push({ ...item, platform: feed.name }))
    } catch {}
  }
  return results.slice(0, 5)
}

export default async function handler(req, res) {
  const forceRefresh = req.query.refresh === '1'

  if (!forceRefresh) {
    const cached = await redisGet(CACHE_KEY)
    if (cached) return res.status(200).json(cached)
  }

  const [ftc, congress, copyright, eurlex, platforms] = await Promise.allSettled([
    fetchFTCRights(), fetchCongressRights(), fetchCopyrightOffice(), fetchEURLex(), fetchPlatformBlogs()
  ])

  const payload = {
    ftc: ftc.status === 'fulfilled' ? ftc.value : [],
    congress: congress.status === 'fulfilled' ? congress.value : [],
    copyright: copyright.status === 'fulfilled' ? copyright.value : [],
    eurlex: eurlex.status === 'fulfilled' ? eurlex.value : [],
    platforms: platforms.status === 'fulfilled' ? platforms.value : [],
    fetchedAt: new Date().toISOString()
  }

  await redisSet(CACHE_KEY, payload, CACHE_TTL)
  return res.status(200).json(payload)
}
