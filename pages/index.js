import { useState, useEffect } from 'react'
import Head from 'next/head'
import InquiryModal from '../components/InquiryModal';
const G='#1B7A68',GD='#0F5E50',GL='#E8F5F2',BG='#F6F3EC',TX='#1C1B1F',MU='#5A5857',BD='#E2DDD6'
const STEPS=[{q:'Is the creator a human, virtual character, or AI-generated persona?',hint:'Virtual and AI-generated creators require bespoke agreements — standard influencer contracts do not apply.',opts:[{l:'Human creator',v:'human',icon:'H',c:'low'},{l:'Virtual or AI-generated persona',v:'virtual',icon:'V',c:'high'}],flag:{virtual:'Virtual and AI-generated personas require explicit FTC disclosure as non-human entities on all content. A bespoke virtual persona licensing and IP agreement is required before any activation.'}},{q:'Does your agreement explicitly address AI-generated content?',hint:'Agreements drafted before 2023 almost certainly do not include AI content clauses.',opts:[{l:'Yes — our agreement includes AI content language',v:'ai-yes',icon:'✓',c:'low'},{l:'No — our agreement predates or omits AI content',v:'ai-no',icon:'✗',c:'high'},{l:'Unsure — I would need to review the agreement',v:'ai-unsure',icon:'?',c:'med'}],flag:{'ai-no':'AI content rider required before activation. Minimum: creator must disclose AI-generated content, agency retains review rights, IP ownership explicitly assigned.','ai-unsure':'Review required before activation. Treat as unaddressed until confirmed otherwise.'}},{q:'Does the activation involve the creator\'s likeness in AI-generated content?',hint:'Explicit written authorization is required — verbal consent is not sufficient.',opts:[{l:'Yes — with explicit written authorization',v:'likeness-ok',icon:'✓',c:'low'},{l:'Yes — without written authorization',v:'likeness-no',icon:'✗',c:'high'},{l:'No — likeness not used in AI content',v:'likeness-na',icon:'—',c:'low'}],flag:{'likeness-no':'Stop — do not proceed. Using a creator\'s likeness in AI content without written consent creates exposure under California AB 2602, right of publicity statutes, and the proposed NO FAKES Act.'}},{q:'Are FTC disclosure requirements met across all content formats?',hint:'FTC 2023-2024 updates apply differently to static posts, Stories, video, live, and AI-generated content.',opts:[{l:'Yes — reviewed across all formats',v:'ftc-yes',icon:'✓',c:'low'},{l:'No — reviewed for primary format only',v:'ftc-no',icon:'✗',c:'med'},{l:'Unsure — handled by the creator',v:'ftc-unsure',icon:'?',c:'med'}],flag:{'ftc-no':'Disclosure must be reviewed per format. Static, Stories, video, live, and AI-generated content each have distinct FTC requirements.','ftc-unsure':'Do not rely on creator-managed disclosure. Agency is responsible for ensuring compliance.'}},{q:'Does the activation include licensed or AI-generated music?',hint:'AI music tools trained on unlicensed material create downstream copyright exposure.',opts:[{l:'Licensed from a cleared AI-aware catalog',v:'music-ok',icon:'✓',c:'low'},{l:'AI-generated — provenance unclear',v:'music-unclear',icon:'✗',c:'med'},{l:'No music in this activation',v:'music-na',icon:'—',c:'low'}],flag:{'music-unclear':'Document provenance of all AI-generated music before publication. Tools trained on unlicensed material create downstream exposure regardless of output originality.'}},{q:'Is this activation running in any European markets?',hint:'EU AI Act Article 50 requires AI content disclosure in commercial contexts from August 2026.',opts:[{l:'Yes — includes EU markets',v:'eu-yes',icon:'!',c:'med'},{l:'No — US only or non-EU markets',v:'eu-no',icon:'✓',c:'low'}],flag:{'eu-yes':'EU AI Act compliance required. Brief European legal counsel before activation in EU markets.'}},{q:'Has platform-specific AI content policy been reviewed for each platform?',hint:'Meta, TikTok, YouTube, and X each have different AI labeling requirements.',opts:[{l:'Yes — reviewed per platform',v:'plat-yes',icon:'✓',c:'low'},{l:'No — using the same approach across all platforms',v:'plat-no',icon:'✗',c:'med'}],flag:{'plat-no':'Platform policies vary significantly. Review Meta, TikTok, YouTube, and X requirements individually before activation.'}}]
export default function Home(){
  const [step,setStep]=useState(0)
  const [answers,setAnswers]=useState([])
  const [flags,setFlags]=useState([])
  const [done,setDone]=useState(false)
  const [regData,setRegData]=useState(null)

  useEffect(()=>{fetch('/api/rights-data').then(r=>r.json()).then(d=>setRegData(d)).catch(()=>{})},[])
  const answer=(v)=>{
    const s=STEPS[step]
    const newFlags=[...flags]
    if(s.flag&&s.flag[v])newFlags.push({label:s.flag[v],q:step})
    setAnswers(p=>[...p,v])
    setFlags(newFlags)
    if(step>=STEPS.length-1)setDone(true)
    else setStep(p=>p+1)
  }
  const reset=()=>{setStep(0);setAnswers([]);setFlags([]);setDone(false)}
  const iconC={low:{bg:'#EAF3DE',color:'#3B6D11'},high:{bg:'#FCEBEB',color:'#A32D2D'},med:{bg:'#FAEEDA',color:'#854F0B'}}
  const progress=Math.round((step/STEPS.length)*100)
  return(<><Head><title>Creator Rights Framework — Aloha AI Consulting</title><meta name="description" content="Seven questions before any creator activation. Identifies governance gaps and returns a remediation checklist cross-referenced with live FTC enforcement and current AI legislation."/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta property="og:title" content="Creator Rights Framework"/><meta property="og:description" content="Identify AI governance gaps before any creator activation. Free, takes 2 minutes."/><meta property="og:type" content="website"/><meta property="og:url" content="https://aloha-creator-rights.vercel.app"/><meta name="twitter:card" content="summary"/><link rel="canonical" href="https://aloha-creator-rights.vercel.app"/><link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=Manrope:wght@400;500&family=DM+Mono&display=swap" rel="stylesheet"/></Head>

  <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:BG}}>
    <header style={{background:G,padding:'0 40px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 0'}}>
        <div style={{display:'flex',alignItems:'center',gap:14}}><div style={{width:36,height:36,borderRadius:6,background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.25)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne',fontSize:10,fontWeight:700,color:'white'}}>AAC</div><div><div style={{fontFamily:'Syne',fontSize:14,fontWeight:600,color:'white'}}>Aloha AI Consulting</div><div style={{fontSize:11,color:'rgba(255,255,255,.6)'}}>Creator Rights Framework</div></div></div>
        {regData&&(regData.ftc?.length>0||regData.congress?.length>0)&&<div style={{fontFamily:'DM Mono',fontSize:11,color:'rgba(255,255,255,.6)'}}>{regData.ftc?.length>0&&<span>{regData.ftc.length} FTC actions</span>}{regData.ftc?.length>0&&regData.congress?.length>0&&<span> · </span>}{regData.congress?.length>0&&<span>{regData.congress.length} AI bills</span>}</div>}
      </div>
      <div style={{height:3,background:'rgba(255,255,255,.2)',borderRadius:2}}><div style={{height:'100%',background:'rgba(255,255,255,.7)',borderRadius:2,width:`${done?100:progress}%`,transition:'width .3s'}}></div></div>
    </header>
    <a href="#main-content" style={{position:'absolute',left:'-9999px',width:'1px',height:'1px',overflow:'hidden'}} onFocus={e=>{e.target.style.cssText='position:static;width:auto;height:auto;overflow:visible'}}>Skip to main content</a><main id="main-content" aria-label="Creator rights assessment" style={{flex:1,maxWidth:760,margin:'0 auto',padding:'48px clamp(20px, 5vw, 40px)',width:'100%'}}>
      <h1 style={{fontFamily:'Syne',fontSize:28,fontWeight:700,color:TX,marginBottom:10,letterSpacing:'-.02em'}}>Creator Rights Framework</h1>
      <p style={{fontSize:15,color:MU,lineHeight:1.65,maxWidth:580,marginBottom:40}}>Answer seven questions before activating any creator partnership. The framework identifies governance gaps and returns a specific remediation checklist — cross-referenced against live FTC enforcement activity and current AI legislation.</p>
      {!done?(
        <div style={{background:'white',border:`1px solid ${BD}`,borderRadius:10,padding:'36px 40px'}}>
          <div style={{fontFamily:'DM Mono',fontSize:11,color:G,marginBottom:12}}>Question {step+1} of {STEPS.length}</div>
          <h2 style={{fontFamily:'Syne',fontSize:20,fontWeight:600,color:TX,marginBottom:8,lineHeight:1.35}}>{STEPS[step].q}</h2>
          <p style={{fontSize:14,color:MU,lineHeight:1.65,marginBottom:28}}>{STEPS[step].hint}</p>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {STEPS[step].opts.map(o=>{const c=iconC[o.c];return(<button key={o.v} onClick={()=>answer(o.v)} style={{display:'flex',alignItems:'center',gap:14,padding:'16px 20px',border:`1px solid ${BD}`,borderRadius:8,background:BG,cursor:'pointer',textAlign:'left',fontFamily:'Manrope'}}><div style={{width:28,height:28,borderRadius:'50%',background:c.bg,color:c.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne',fontSize:11,fontWeight:700,flexShrink:0}}>{o.icon}</div><span style={{fontSize:15,color:TX,fontWeight:500}}>{o.l}</span></button>)})}
          </div>
        </div>
      ):(
        <div>
          <h2 style={{fontFamily:'Syne',fontSize:22,fontWeight:700,color:TX,marginBottom:6}}>{flags.length===0?'Activation cleared — no gaps identified':''+flags.length+' action'+(flags.length!==1?'s':'')+' required before activation'}</h2>
          <p style={{fontSize:14,color:MU,marginBottom:24}}>{flags.length>0?'Address each item below before proceeding.':'No governance gaps identified based on your responses.'}{regData?.ftc?.length>0?` Cross-referenced against ${regData.ftc.length} live FTC enforcement actions.`:''}</p>
          {flags.map((f,i)=>(<div key={i} style={{background:'white',border:`1px solid ${BD}`,borderLeft:`3px solid #A32D2D`,borderRadius:'0 8px 8px 0',padding:'20px 24px',marginBottom:12}}><div style={{fontFamily:'Syne',fontSize:12,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:'#A32D2D',marginBottom:6}}>Action required</div><div style={{fontSize:14,color:TX,lineHeight:1.65}}>{f.label}</div></div>))}
          {flags.length===0&&(<div style={{background:'white',border:`1px solid ${BD}`,borderLeft:`3px solid #3B6D11`,borderRadius:'0 8px 8px 0',padding:'20px 24px',marginBottom:12}}><div style={{fontFamily:'Syne',fontSize:12,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:'#3B6D11',marginBottom:6}}>Cleared</div><div style={{fontSize:14,color:TX,lineHeight:1.65}}>This activation has addressed the core AI and creator rights governance requirements. Maintain standard FTC disclosure practices and document all agreements before activation.</div></div>)}
          {regData?.ftc?.length>0&&(<div style={{background:'white',border:`1px solid ${BD}`,borderRadius:10,padding:'20px 24px',marginBottom:16}}><div style={{fontFamily:'Syne',fontSize:11,fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:MU,marginBottom:12}}>Live FTC context</div>{regData.ftc.slice(0,3).map((item,i)=>(<div key={i} style={{padding:'8px 0',borderBottom:i<2?`1px solid #F0EDE8`:'none'}}><a href={item.link} target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:TX,fontWeight:500,lineHeight:1.4,display:'block'}}>{item.title?.slice(0,100)}</a></div>))}</div>)}
          <button onClick={reset} style={{width:'100%',padding:14,background:G,border:'none',borderRadius:8,fontFamily:'Syne',fontSize:14,fontWeight:600,color:'white',cursor:'pointer',marginTop:8}}>Run a new activation</button>
        </div>
      )}
          </main>
    <InquiryModal source="creator-rights" />
    <footer style={{background:TX,padding:'24px clamp(20px,5vw,40px)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
      <div><div style={{fontFamily:'Syne',fontSize:13,fontWeight:600,color:'white'}}>RN Collins</div><div style={{fontSize:12,color:'rgba(255,255,255,.5)',marginTop:2}}>Neuroscientist · JD Candidate, Northeastern · AI Governance Researcher, Brown University AISLE Project</div></div>
      <div style={{display:'flex',alignItems:'center',gap:20}}><a href="https://linkedin.com/in/rn-collins" target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:'rgba(255,255,255,.6)'}}>LinkedIn</a><button onClick={()=>} style={{fontFamily:'Syne',fontSize:12,fontWeight:600,padding:'8px 18px',background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.25)',borderRadius:6,color:'white',cursor:'pointer'}}>Contact the Architect</button></div>
    </footer>
  </div></>)
}
