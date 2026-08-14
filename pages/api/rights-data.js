// The former RSS aggregation was removed from the public experience after review.
export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
  return res.status(200).json({
    status: 'suppressed',
    message: 'Automated regulatory-feed results are not used as legal clearance or current-law verification.',
    ftc: [],
    congress: [],
    copyright: [],
    eurlex: [],
    platforms: [],
    fetchedAt: null
  });
}
