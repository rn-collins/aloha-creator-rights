import Head from 'next/head';

const sources = [
  {
    topic: 'Endorsements and disclosures',
    authority: 'Federal Trade Commission',
    title: "FTC’s Endorsement Guides: What People Are Asking",
    url: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking',
    scope: 'Official FTC staff guidance on endorsements, material connections, disclosures, platform tools, monitoring, and format-specific questions. Guidance is not a substitute for the FTC Act, rules, or matter-specific legal analysis.'
  },
  {
    topic: 'Influencer disclosure basics',
    authority: 'Federal Trade Commission',
    title: 'Disclosures 101 for Social Media Influencers',
    url: 'https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers',
    scope: 'Official educational guidance addressing material connections and disclosure presentation in common social formats.'
  },
  {
    topic: 'Digital replicas and federal policy',
    authority: 'U.S. Copyright Office',
    title: 'Copyright and Artificial Intelligence — Part 1: Digital Replicas',
    url: 'https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-1-Digital-Replicas-Report.pdf',
    scope: 'The Office’s policy report and recommendations. Recommendations and proposed legislation are not enacted federal law; state publicity, privacy, contract, labor, and other rules may also matter.'
  },
  {
    topic: 'AI authorship and copyrightability',
    authority: 'U.S. Copyright Office',
    title: 'Copyright and Artificial Intelligence',
    url: 'https://www.copyright.gov/ai/',
    scope: 'Official hub for the Office’s multi-part AI reports and updates, including digital replicas and copyrightability.'
  },
  {
    topic: 'EU AI transparency obligations',
    authority: 'EUR-Lex',
    title: 'Regulation (EU) 2024/1689 — consolidated version dated 27 July 2026',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02024R1689-20260727',
    scope: 'Current consolidated documentation text reviewed for Article 50. Duties depend on the actor, system, content, use, audience, and effective date; they are not a universal label requirement for every use of AI content.'
  }
];

export default function Sources(){
  return <main style={{maxWidth:820,margin:'0 auto',padding:'64px 24px',fontFamily:'Manrope,system-ui',lineHeight:1.65,color:'#1C1B1F'}}>
    <Head><title>Official sources | Creator Rights Issue Spotter</title><meta name="description" content="Official authority map and currency limits for the Creator Rights Issue Spotter."/><meta name="robots" content="index, follow"/><link rel="canonical" href="https://aloha-creator-rights.vercel.app/sources"/></Head>
    <a href="/" style={{color:'#1B7A68'}}>← Creator Rights Issue Spotter</a>
    <p style={{fontSize:12,letterSpacing:'.1em',textTransform:'uppercase',color:'#5A5857',marginTop:40}}>Authority map · verified August 15, 2026</p>
    <h1 style={{fontSize:36,lineHeight:1.15}}>Official sources and currency limits</h1>
    <div style={{background:'#FFF3DE',border:'1px solid #E5CBA6',padding:'16px 18px',margin:'24px 0 34px'}}><strong>Legal-information boundary.</strong> These sources support educational issue spotting only. They do not make the questionnaire complete, current for every jurisdiction, or sufficient for a real matter. Platform policies and law change; verify the live rule and obtain qualified review before relying on any result.</div>
    {sources.map(s=><section key={s.url} style={{borderTop:'1px solid #E2DDD6',padding:'24px 0'}}>
      <div style={{fontSize:12,color:'#1B7A68',fontWeight:700,textTransform:'uppercase',letterSpacing:'.06em'}}>{s.topic}</div>
      <h2 style={{fontSize:21,margin:'7px 0'}}><a href={s.url} target="_blank" rel="noopener noreferrer" style={{color:'#1C1B1F'}}>{s.title} ↗</a></h2>
      <div style={{fontSize:13,color:'#5A5857',marginBottom:8}}>Primary authority: {s.authority}</div>
      <p style={{margin:0,color:'#5A5857'}}>{s.scope}</p>
    </section>)}
    <section style={{borderTop:'1px solid #E2DDD6',padding:'26px 0'}}><h2 style={{fontSize:21}}>What this page intentionally does not claim</h2><ul><li>It is not a fifty-state publicity-rights survey.</li><li>It does not determine whether proposed legislation has become law.</li><li>It does not preserve a snapshot of changing platform policies.</li><li>It does not evaluate a contract, license, collective-bargaining agreement, or specific activation.</li></ul></section>
    <p><a href="/privacy">Privacy</a> · <a href="/terms">Use and limitations</a></p>
  </main>
}
