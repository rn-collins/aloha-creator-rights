import Head from 'next/head';

export default function Privacy() {
  return <main style={{maxWidth:760,margin:'0 auto',padding:'64px 24px',fontFamily:'Manrope,system-ui',lineHeight:1.7}}>
    <Head><title>Privacy | Creator Rights Issue Spotter</title><meta name="robots" content="index, follow"/></Head>
    <a href="/">← Creator Rights Issue Spotter</a>
    <h1>Privacy</h1>
    <p>This prototype processes questionnaire responses only in your browser. It does not save or transmit your answers.</p>
    <p>The site uses Vercel Analytics and Speed Insights for aggregate performance and usage measurement. Do not send confidential, privileged, client, or sensitive personal information through links from this site.</p>
    <p>For questions about this notice, contact RN Collins through the LinkedIn link provided on the site.</p>
    <p><small>Last updated: August 14, 2026.</small></p>
  </main>
}
