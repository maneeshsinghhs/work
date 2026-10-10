import { useEffect, useState } from 'react'
import './App.css'

export const COMPANY_NAME = 'Your Company'
const copyrightYear = new Date().getFullYear()
const pages = ['Home', 'Services', 'About', 'Contact', 'Blog']
const services = [
  ['01', 'Digital product engineering', 'Design and build web platforms, mobile applications, and business software around the people who use them.'],
  ['02', 'AI & intelligent automation', 'Explore practical AI use cases, connect intelligent workflows, and keep people involved in the decisions that matter.'],
  ['03', 'Data & analytics', 'Connect scattered data, build clear dashboards, and turn business information into useful decisions.'],
  ['04', 'Cloud & modernization', 'Modernize legacy applications and create cloud foundations with reliability, performance, and cost in mind.'],
  ['05', 'Experience design', 'Translate customer needs into intuitive journeys, accessible interfaces, and coherent digital experiences.'],
  ['06', 'Technology consulting', 'Define your roadmap, review architecture, and plan delivery with a clear connection to your business goals.'],
]
const articles = [
  ['Artificial intelligence', 'From AI experiments to useful business workflows', 'How to choose a focused use case, prepare your data, and keep human review part of the process.'],
  ['Cloud & engineering', 'Modernizing software without losing momentum', 'A practical approach to improving existing platforms while keeping everyday operations moving.'],
  ['Data & experience', 'Better decisions start with connected data', 'Why useful analytics depend on clear questions, reliable information, and thoughtful design.'],
]
const faqs = [
  ['Where should a project start?', 'Start with a business problem, the people affected, and your current systems. Together, we can define a focused first step and what success should look like.'],
  ['Can you work with an existing application?', 'An existing platform can be the starting point. An initial review helps identify which parts to improve, integrate, or modernize before planning delivery.'],
  ['How does AI fit into a project?', 'AI should serve a specific need. We begin with the workflow and available data, then consider a small, measurable use case with appropriate human review.'],
  ['What should I bring to the first conversation?', 'A short description of your goal, current challenges, and any timeline or budget constraints is enough to begin. Detailed requirements can come later.'],
]
function currentPage() {
  const slug = window.location.pathname.replace(/\/$/, '').toLowerCase()
  return pages.find(p => `/${p.toLowerCase()}` === slug) || (slug === '' ? 'Home' : 'Not found')
}
function App() {
  const [page, setPage] = useState(currentPage)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const update = () => { setPage(currentPage()); setMenuOpen(false) }
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])
  useEffect(() => { document.title = `${page} | ${COMPANY_NAME}` }, [page])
  function navigate(event, target) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.history.pushState({}, '', target === 'Home' ? '/' : `/${target.toLowerCase()}`)
    setPage(target); setMenuOpen(false); window.scrollTo(0, 0)
  }
  const link = (target, text, className = '') => <a className={className} href={target === 'Home' ? '/' : `/${target.toLowerCase()}`} onClick={e => navigate(e, target)}>{text}</a>
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a><header className="header"><div className="container header-inner">
      {link('Home', <><span className="brand-icon">Y<span>↗</span></span><span>{COMPANY_NAME}<small>TECHNOLOGY PARTNER</small></span></>, 'brand')}
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <nav aria-label="Main navigation" className={menuOpen ? 'open' : ''}>{pages.map(p => <a key={p} href={p === 'Home' ? '/' : `/${p.toLowerCase()}`} aria-current={page === p ? 'page' : undefined} onClick={e => navigate(e, p)}>{p}</a>)}</nav>
      {link('Contact', 'Let’s talk ↗', 'button header-cta')}
    </div></header>
    <main id="main-content">
      {page === 'Home' ? <>
        <section className="hero container"><div className="hero-copy"><p className="eyebrow"><span className="dot"/> DIGITAL PRODUCTS. INTELLIGENT POSSIBILITIES.</p><h1>Built for<br/>your <em>next.</em></h1><p className="lead">From digital products to AI, data, and cloud platforms, we connect thoughtful strategy with engineering that moves your business forward.</p><div className="actions">{link('Contact', 'Build with us ↗', 'button')}{link('Services', 'Explore our services →', 'text-link')}</div><p className="hero-note">Product thinking. Connected data. Human-led innovation.</p></div><div className="hero-art" aria-hidden="true"><div className="art-topline"><span>THE NEXT POSSIBLE</span><span>↗</span></div><div className="sculpture"><div className="sculpture-ring ring-a"/><div className="sculpture-ring ring-b"/><div className="sculpture-ring ring-c"/></div><div className="art-bottomline"><span>PRODUCT × DATA × AI</span><span>01 — ∞</span></div><div className="floating-card"><span className="dot"/> Intelligence. With purpose.</div></div></section>
        <div className="principles"><div className="container"><span>Built around your business</span><span>Human-centered technology</span><span>From strategy to delivery</span></div></div>
        <section className="container section"><div className="section-heading"><div><p className="eyebrow">WHAT WE DO</p><h2>Big ambitions.<br/>Practical solutions.</h2></div>{link('Services', 'All services ↗', 'text-link')}</div><ServiceCards compact/></section>
        <section className="focus-band"><div className="container focus-inner"><div><p className="eyebrow">BUILT AROUND YOUR WORLD</p><h2>Business context.<br/>Before technology.</h2></div><div><p>Whether you’re shaping a SaaS product, connecting an online store, or improving an internal workflow, the starting point is the same: understand the people, the process, and the outcome.</p><div className="focus-tags"><span>Digital commerce</span><span>SaaS & platforms</span><span>Enterprise workflows</span></div></div></div></section><section className="container process-section"><div className="section-heading"><div><p className="eyebrow">HOW WE GET THERE</p><h2>Less friction.<br/>More forward.</h2></div><p className="process-summary">A clear path from your first question<br/>to your next breakthrough.</p></div><div className="process-grid">{[['01', 'Discover', 'We listen, ask better questions, and find what matters most.'], ['02', 'Create', 'We turn direction into thoughtful design and dependable engineering.'], ['03', 'Evolve', 'We learn, refine, and help your technology grow with you.']].map(([n, title, description]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section><section className="container faq-section"><div className="section-heading"><div><p className="eyebrow">BEFORE WE BEGIN</p><h2>Good questions.<br/>Clear answers.</h2></div></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section><section className="container invitation"><div><p className="eyebrow">LET’S MAKE IT HAPPEN</p><h2>Your next idea deserves<br/>a great technology partner.</h2></div>{link('Contact', 'Start a conversation ↗', 'button')}</section>
      </> : page === 'Services' ? <section className="container section"><PageIntro label="OUR EXPERTISE" title="Connected expertise. Clear direction." description="Bring product engineering, AI, data, cloud, and experience design together around your next business challenge."/><ServiceCards/><div className="invitation"><h2>Have a challenge in mind?</h2>{link('Contact', 'Let’s work through it ↗', 'button')}</div></section>
      : page === 'About' ? <section className="container section"><PageIntro label="ABOUT US" title="Technology is better when people come first." description="We’re building a digital engineering partner around a simple idea: understanding your business should come before choosing the technology."/><div className="about-grid"><div className="about-panel"><span>OUR APPROACH</span><h2>Curious minds.<br/>Shared ambition.</h2><p>Our focus connects digital products, intelligent workflows, and modern platforms with the business goals behind them.</p></div><div><h2>A partner for your next chapter</h2><p>Our approach brings strategy, design, and engineering into one conversation. We start with your operating context, make decisions openly, and plan manageable steps from discovery through delivery and improvement.</p><h3>What guides us</h3><ul className="values"><li>Listen before we build</li><li>Keep complexity manageable</li><li>Build for the long term</li><li>Work together, openly</li></ul></div></div></section>
      : page === 'Contact' ? <Contact/>
      : page === 'Blog' ? <section className="container section"><PageIntro label="IDEAS & PERSPECTIVES" title="A little clarity for what’s next." description="Ideas on practical AI, digital products, connected data, and modern cloud platforms."/><p className="notice">Our blog is coming soon. Here’s a look at topics we’re preparing.</p><div className="blog-grid">{articles.map(([category,title,desc],i) => <article className="blog-card" key={title}><div className={`blog-art art-${i}`} aria-hidden="true">{['↗','⌘','✳'][i]}</div><div className="blog-copy"><p className="eyebrow">{category} · COMING SOON</p><h2>{title}</h2><p>{desc}</p></div></article>)}</div></section>
      : <section className="container section"><PageIntro label="404" title="This page hasn’t been built yet." description="Let’s get you back to somewhere familiar."/>{link('Home','Back to home →','button')}</section>}
    </main>
    <footer><div className="container footer-inner"><div><strong>{COMPANY_NAME}</strong><p>Thoughtful technology. Meaningful progress.</p></div><div className="footer-links">{pages.map(p => <span key={p}>{link(p,p)}</span>)}</div></div><div className="container footer-bottom"><span>© {copyrightYear} {COMPANY_NAME}. All rights reserved.</span><span>Built for what’s next ↗</span></div></footer>
  </>
}
function PageIntro({label,title,description}) { return <div className="page-intro"><p className="eyebrow">{label}</p><h1>{title}</h1><p className="lead">{description}</p></div> }
function ServiceCards({compact = false}) { return <div className={`service-grid ${compact ? 'compact' : ''}`}>{services.map(([number,title,desc]) => <article className="service-card" key={number}><span className="service-number">{number} /</span><span className="service-arrow" aria-hidden="true">↗</span><h3>{title}</h3><p>{desc}</p></article>)}</div> }
function Contact() {
  const [message, setMessage] = useState('')
  return <section className="container section"><PageIntro label="LET’S CONNECT" title="Every great project starts with a conversation." description="Tell us a little about what you have in mind."/><div className="contact-grid"><div><h2>What’s your next move?</h2><p>Whether you’re exploring an idea or planning a larger transformation, we’d love to hear about it.</p><div className="notice">Contact details will be added once the company name and business information are finalized.</div></div><form onSubmit={e => {e.preventDefault(); setMessage('Thank you for sharing your idea. This form is a preview; messages are not sent yet. Contact delivery will be connected when business details are ready.')}}><div className="form-row"><label>Your name<input name="name" autoComplete="name" required placeholder="Full name"/></label><label>Email address<input type="email" name="email" autoComplete="email" required placeholder="you@company.com"/></label></div><label>Company <span>(optional)</span><input name="company" autoComplete="organization" placeholder="Your organization"/></label><label>What can we help with?<textarea name="message" required rows="5" placeholder="Tell us about your project…"/></label><p className="form-note">Preview form — submission delivery is not connected yet.</p><button className="button" type="submit">Preview inquiry ↗</button>{message && <p role="status" className="notice">{message}</p>}</form></div></section>
}
export default App
