import { useEffect, useState } from 'react'
import './App.css'

export const COMPANY_NAME = 'Your Company'
const copyrightYear = new Date().getFullYear()
const pages = ['Home', 'Services', 'About', 'Contact', 'Blog']
const services = [
  ['01', 'Software development', 'Purpose-built web and mobile applications that turn complex challenges into simple experiences.'],
  ['02', 'Cloud & infrastructure', 'Resilient cloud foundations that help your business scale with confidence.'],
  ['03', 'IT consulting', 'A clear technology roadmap, shaped around your people, processes, and ambitions.'],
  ['04', 'Cybersecurity', 'Practical security strategies to protect your systems and keep your business moving.'],
]
const articles = [
  ['Cloud', 'Building a cloud strategy that grows with you', 'A starting point for thinking about scale, resilience, and long-term value.'],
  ['Engineering', 'What makes great business software?', 'Why understanding the people behind the process comes first.'],
  ['Strategy', 'Making technology work for your team', 'A practical perspective on choosing tools with purpose.'],
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
    <header className="header"><div className="container header-inner">
      {link('Home', <><span className="brand-icon">Y<span>↗</span></span><span>{COMPANY_NAME}<small>TECHNOLOGY PARTNER</small></span></>, 'brand')}
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <nav aria-label="Main navigation" className={menuOpen ? 'open' : ''}>{pages.map(p => <a key={p} href={p === 'Home' ? '/' : `/${p.toLowerCase()}`} aria-current={page === p ? 'page' : undefined} onClick={e => navigate(e, p)}>{p}</a>)}</nav>
      {link('Contact', 'Let’s talk ↗', 'button header-cta')}
    </div></header>
    <main id="main-content">
      {page === 'Home' ? <>
        <section className="hero container"><div className="hero-copy"><p className="eyebrow"><span className="dot"/> YOUR NEXT CHAPTER STARTS HERE</p><h1>Technology that<br/>moves your<br/><em>business forward.</em></h1><p className="lead">We bring clarity to complexity. From your first idea to your next big leap, we build digital solutions that work for you.</p><div className="actions">{link('Contact', 'Build with us ↗', 'button')}{link('Services', 'Explore our services →', 'text-link')}</div><p className="hero-note">Thoughtful strategy. Reliable engineering. Lasting partnerships.</p></div><div className="hero-art" aria-hidden="true"><div className="grid-art"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="core">↗</div><span className="art-label top">IDEAS INTO IMPACT</span><span className="art-label bottom">CONNECTED. BUILT FOR WHAT’S NEXT.</span><div className="floating-card"><span className="dot"/> Designed to move you forward</div></div></section>
        <div className="principles"><div className="container"><span>Built around your business</span><span>Human-centered technology</span><span>From strategy to delivery</span></div></div>
        <section className="container section"><div className="section-heading"><div><p className="eyebrow">WHAT WE DO</p><h2>Big ambitions.<br/>Practical solutions.</h2></div>{link('Services', 'All services ↗', 'text-link')}</div><ServiceCards compact/></section>
        <section className="container invitation"><div><p className="eyebrow">LET’S MAKE IT HAPPEN</p><h2>Your next idea deserves<br/>a great technology partner.</h2></div>{link('Contact', 'Start a conversation ↗', 'button')}</section>
      </> : page === 'Services' ? <section className="container section"><PageIntro label="OUR EXPERTISE" title="The right technology. Real possibilities." description="From planning to implementation, we help you build a stronger digital business."/><ServiceCards/><div className="invitation"><h2>Have a challenge in mind?</h2>{link('Contact', 'Let’s work through it ↗', 'button')}</div></section>
      : page === 'About' ? <section className="container section"><PageIntro label="ABOUT US" title="Technology is better when people come first." description="We’re building a technology company around a simple idea: great solutions start with listening."/><div className="about-grid"><div className="about-panel"><span>OUR APPROACH</span><h2>Curious minds.<br/>Shared ambition.</h2><p>We connect business goals with thoughtful engineering, helping teams turn possibilities into useful, lasting solutions.</p></div><div><h2>A partner for your next chapter</h2><p>We believe in clear communication, practical decisions, and care in every detail. Our approach starts with understanding your needs and continues through design, delivery, and ongoing improvement.</p><h3>What guides us</h3><ul className="values"><li>Listen before we build</li><li>Keep complexity manageable</li><li>Build for the long term</li><li>Work together, openly</li></ul></div></div></section>
      : page === 'Contact' ? <Contact/>
      : page === 'Blog' ? <section className="container section"><PageIntro label="IDEAS & PERSPECTIVES" title="A little clarity for what’s next." description="A space for thoughts on technology, engineering, and building better businesses."/><p className="notice">Our blog is coming soon. Here’s a look at topics we’re preparing.</p><div className="blog-grid">{articles.map(([category,title,desc],i) => <article className="blog-card" key={title}><div className={`blog-art art-${i}`} aria-hidden="true">{['↗','⌘','✳'][i]}</div><div className="blog-copy"><p className="eyebrow">{category} · COMING SOON</p><h2>{title}</h2><p>{desc}</p></div></article>)}</div></section>
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
