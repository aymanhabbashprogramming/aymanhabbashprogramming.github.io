import './SiteNavigation.css'

function scrollToTop(event) {
  event.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function SiteNavigation({ name = 'MOHAMMED AYMAN HABBASH' }) {
  return (
    <nav className="site-navigation" aria-label="Primary navigation">
      <a className="site-navigation__brand" href="#top" aria-label={`${name} — home`} onClick={scrollToTop}>
        <span className="site-navigation__brand-mark">E</span>
        <span>{name.toUpperCase()}</span>
      </a>
      <div className="site-navigation__links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#training">Training</a>
        <a href="#certificates">Certificates</a>
      </div>
    </nav>
  )
}

export default SiteNavigation
