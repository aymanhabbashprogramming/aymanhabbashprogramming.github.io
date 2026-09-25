import './SiteNavigation.css'
import { useLanguage } from '../i18n/LanguageContext'

function scrollToTop(event) {
  event.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function SiteNavigation({ name = 'MOHAMMED AYMAN HABBASH' }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <nav className="site-navigation" aria-label="Primary navigation">
      <a className="site-navigation__brand" href="#top" aria-label={`${name} — home`} onClick={scrollToTop}>
        <span className="site-navigation__brand-mark">E</span>
        <span>{name.toUpperCase()}</span>
      </a>
      <div className="site-navigation__links">
        <a href="#about">{t.nav.about}</a>
        <a href="#skills">{t.nav.skills}</a>
        <a href="#projects">{t.nav.projects}</a>
        <a href="#training">{t.nav.training}</a>
        <a href="#certificates">{t.nav.certificates}</a>
        <select className="site-navigation__language" value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t.nav.language}>
          <option value="en">EN</option><option value="tr">TR</option><option value="ar">AR</option>
        </select>
      </div>
    </nav>
  )
}

export default SiteNavigation
