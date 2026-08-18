export const VERIFIED_AT = '2026-08-18'
export const NEXT_REVIEW = '2026-09-18'

export const AUTHORITIES = {
  ftc255: {
    id: 'ftc255',
    topic: 'Endorsements and material connections',
    authority: 'Federal Trade Commission / eCFR',
    title: '16 CFR Part 255 — Endorsements and Testimonials',
    url: 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255',
    jurisdiction: 'United States — federal',
    authorityType: 'Administrative guides interpreting FTC Act §5',
    published: '2023-07-26',
    reviewed: VERIFIED_AT,
    nextReview: NEXT_REVIEW,
    status: 'current',
    scope: 'Applies to endorsements and testimonials in advertising. Whether a representation or disclosure is deceptive remains fact-specific; the Guides do not resolve contracts, copyright, publicity rights, or every advertising use.'
  },
  ftcFaq: {
    id: 'ftcFaq',
    topic: 'Format, placement, monitoring, and platform tools',
    authority: 'Federal Trade Commission staff',
    title: 'FTC’s Endorsement Guides: What People Are Asking',
    url: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking',
    jurisdiction: 'United States — federal',
    authorityType: 'Official staff business guidance',
    published: '2023-06-29',
    reviewed: VERIFIED_AT,
    nextReview: NEXT_REVIEW,
    status: 'current-guidance',
    scope: 'Explains FTC staff views on material connections, disclosure presentation, monitoring, and platform disclosure tools. Guidance is not a safe harbor or a substitute for the statute, Guides, or matter-specific analysis.'
  },
  copyrightAct: {
    id: 'copyrightAct',
    topic: 'Authorship, ownership, licenses, and exclusive rights',
    authority: 'U.S. Copyright Office',
    title: 'Copyright Act, Titles 17 U.S.C. §§ 101, 106, 201, 204',
    url: 'https://www.copyright.gov/title17/',
    jurisdiction: 'United States — federal',
    authorityType: 'Statutory text',
    published: 'current official compilation',
    reviewed: VERIFIED_AT,
    nextReview: NEXT_REVIEW,
    status: 'current',
    scope: 'Provides the federal copyright framework. It does not by itself answer contract interpretation, state publicity/privacy rights, labor obligations, platform terms, or the territorial rights needed for a particular project.'
  },
  aiCopyright: {
    id: 'aiCopyright',
    topic: 'Copyrightability of generative-AI outputs',
    authority: 'U.S. Copyright Office',
    title: 'Copyright and Artificial Intelligence, Part 2: Copyrightability',
    url: 'https://www.copyright.gov/ai/',
    jurisdiction: 'United States — federal',
    authorityType: 'Official policy report and registration analysis',
    published: '2025-01-29',
    reviewed: VERIFIED_AT,
    nextReview: NEXT_REVIEW,
    status: 'current-policy-analysis',
    scope: 'Addresses human authorship and copyrightability. It does not allocate ownership or permissions under a particular contract and is not a judicial holding.'
  },
  digitalReplicas: {
    id: 'digitalReplicas',
    topic: 'Voice, likeness, and digital replicas',
    authority: 'U.S. Copyright Office',
    title: 'Copyright and Artificial Intelligence, Part 1: Digital Replicas',
    url: 'https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-1-Digital-Replicas-Report.pdf',
    jurisdiction: 'United States — federal policy; state law remains relevant',
    authorityType: 'Official policy report and legislative recommendation',
    published: '2024-07-31',
    reviewed: VERIFIED_AT,
    nextReview: NEXT_REVIEW,
    status: 'recommendation-not-enacted-rule',
    scope: 'Surveys digital-replica issues and recommends federal legislation. The recommendation is not itself enacted federal law. State publicity, privacy, contract, tort, labor, and collective-bargaining rules may control.'
  },
  musicCopyright: {
    id: 'musicCopyright',
    topic: 'Musical works and sound recordings',
    authority: 'U.S. Copyright Office',
    title: 'What Musicians Should Know about Copyright',
    url: 'https://www.copyright.gov/engage/musicians/',
    jurisdiction: 'United States — federal',
    authorityType: 'Official educational guidance linked to Copyright Act rights',
    published: 'official current resource',
    reviewed: VERIFIED_AT,
    nextReview: NEXT_REVIEW,
    status: 'current-guidance',
    scope: 'Distinguishes rights in musical works and sound recordings. Actual clearance may require multiple rightsholders, licenses, territories, media, term, and platform permissions.'
  },
  euAiAct: {
    id: 'euAiAct',
    topic: 'AI transparency duties',
    authority: 'EUR-Lex',
    title: 'Regulation (EU) 2024/1689 — consolidated text, Article 50',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng',
    jurisdiction: 'European Union',
    authorityType: 'Binding regulation; duties are actor- and use-specific',
    published: 'consolidated 2026-07-27',
    reviewed: VERIFIED_AT,
    nextReview: NEXT_REVIEW,
    status: 'current',
    scope: 'Article 50 applies to specified provider and deployer situations. Most provisions apply from 2 August 2026, subject to the Regulation’s staged dates and later amendments. It is not a universal label rule for every AI-assisted work.'
  }
}

export const STEP_AUTHORITY_IDS = [
  ['ftc255','copyrightAct','aiCopyright'],
  ['copyrightAct','aiCopyright'],
  ['digitalReplicas','copyrightAct'],
  ['ftc255','ftcFaq'],
  ['copyrightAct','musicCopyright','aiCopyright'],
  ['euAiAct'],
  ['ftcFaq']
]

export function authorityState(source, now = new Date()) {
  const reviewDue = source.nextReview && now > new Date(source.nextReview + 'T23:59:59Z')
  return reviewDue ? 'review-due' : source.status
}

export function getAuthorities(ids = []) {
  return ids.map(id => AUTHORITIES[id]).filter(Boolean)
}
