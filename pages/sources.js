import Head from 'next/head'
import { AUTHORITIES, VERIFIED_AT, NEXT_REVIEW, authorityState } from '../lib/creatorAuthorities'

const sources = Object.values(AUTHORITIES)

export default function Sources(){
  return <main style={{maxWidth:880,margin:'0 auto',padding:'64px 24px',fontFamily:'Manrope,system-ui',lineHeight:1.65,color:'#1C1B1F'}}>
    <Head><title>Authority register | Creator Rights Issue Spotter</title><meta name="description" content="Dated primary-authority register, jurisdiction limits, and currency states for the Creator Rights Issue Spotter."/><meta name="robots" content="index, follow"/><link rel="canonical" href="https://aloha-creator-rights.vercel.app/sources"/><meta property="og:title" content="Authority register | Creator Rights Issue Spotter"/><meta property="og:description" content="Dated primary authorities with jurisdiction, authority type, and currency state."/><meta property="og:type" content="article"/><meta property="og:url" content="https://aloha-creator-rights.vercel.app/sources"/><meta property="og:image" content="https://aloha-creator-rights.vercel.app/og.png"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:alt" content="Creator Rights Issue Spotter — educational issue spotting across seven questions: creator type, AI terms in the agreement, likeness and voice authorization, disclosure across formats, music provenance, EU market exposure, and platform policy."/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:image" content="https://aloha-creator-rights.vercel.app/og.png"/></Head>
    <a href="/" style={{color:'#1B7A68'}}>← Creator Rights Issue Spotter</a>
    <p style={{fontSize:12,letterSpacing:'.1em',textTransform:'uppercase',color:'#5A5857',marginTop:40}}>Authority register · verified {VERIFIED_AT} · next review {NEXT_REVIEW}</p>
    <h1 style={{fontSize:36,lineHeight:1.15}}>Official sources, status, and jurisdiction limits</h1>
    <div style={{background:'#FFF3DE',border:'1px solid #E5CBA6',padding:'16px 18px',margin:'24px 0 18px'}}><strong>Legal-information boundary.</strong> This register supports educational issue spotting only. It is not a comprehensive legal survey, legal advice, rights clearance, or a substitute for reviewing the actual facts, documents, parties, territories, governing law, and current platform rules with qualified counsel.</div>
    <div style={{background:'#F6F3EC',border:'1px solid #E2DDD6',padding:'14px 18px',marginBottom:34,fontSize:13,color:'#5A5857'}}>Automated currency rule: an authority becomes <strong>review due</strong> after {NEXT_REVIEW}. “Current” means only that the linked official source was checked on {VERIFIED_AT}; it does not guarantee no later amendment, decision, enforcement action, or jurisdiction-specific rule exists.</div>
    {sources.map(s=>{const state=authorityState(s);return <section key={s.id} id={s.id} style={{borderTop:'1px solid #E2DDD6',padding:'26px 0'}}>
      <div style={{display:'flex',justifyContent:'space-between',gap:14,alignItems:'flex-start',flexWrap:'wrap'}}>
        <div style={{fontSize:12,color:'#1B7A68',fontWeight:700,textTransform:'uppercase',letterSpacing:'.06em'}}>{s.topic}</div>
        <div style={{fontSize:11,padding:'3px 8px',borderRadius:4,background:state==='review-due'?'#FCEBEB':'#EAF3DE',color:state==='review-due'?'#A32D2D':'#3B6D11',fontWeight:700}}>{state}</div>
      </div>
      <h2 style={{fontSize:21,margin:'7px 0'}}><a href={s.url} target="_blank" rel="noopener noreferrer" style={{color:'#1C1B1F'}}>{s.title} ↗</a></h2>
      <dl style={{display:'grid',gridTemplateColumns:'minmax(120px,170px) 1fr',gap:'6px 14px',fontSize:13,color:'#5A5857'}}>
        <dt>Primary authority</dt><dd style={{margin:0}}>{s.authority}</dd>
        <dt>Jurisdiction</dt><dd style={{margin:0}}>{s.jurisdiction}</dd>
        <dt>Authority type</dt><dd style={{margin:0}}>{s.authorityType}</dd>
        <dt>Published / version</dt><dd style={{margin:0}}>{s.published}</dd>
        <dt>Verified</dt><dd style={{margin:0}}>{s.reviewed}</dd>
        <dt>Next review</dt><dd style={{margin:0}}>{s.nextReview}</dd>
      </dl>
      <p style={{margin:'14px 0 0',color:'#5A5857'}}><strong>Scope limit:</strong> {s.scope}</p>
    </section>})}
    <section style={{borderTop:'1px solid #E2DDD6',padding:'28px 0'}}>
      <h2 style={{fontSize:21}}>Known exclusions and mandatory escalation</h2>
      <ul>
        <li>No fifty-state publicity, privacy, digital-replica, or right-of-promotion survey.</li>
        <li>No country-by-country analysis outside the limited EU AI Act reference.</li>
        <li>No contract, collective-bargaining agreement, guild rule, license, or choice-of-law analysis.</li>
        <li>No current policy register for TikTok, YouTube, Instagram, Twitch, X, music libraries, app stores, or advertising networks.</li>
        <li>No trademark, defamation, consumer-product, sector-specific advertising, tax, employment, securities, or child-directed-content analysis.</li>
      </ul>
      <p><strong>Escalate before publication or payment</strong> when a project uses a person’s voice or likeness, lacks a documented license chain, targets multiple jurisdictions, includes regulated claims, involves a minor, depends on exclusivity or ownership, or cannot identify the current platform rule.</p>
    </section>
    <p><a href="/privacy">Privacy</a> · <a href="/terms">Use and limitations</a></p>
  </main>
}
