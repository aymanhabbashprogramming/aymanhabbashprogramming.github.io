import { useEffect, useRef, useState } from 'react'
import './SiteNavigation.css'
import { useLanguage } from '../i18n/LanguageContext'

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'tr', label: 'TR', name: 'Türkçe' },
  { code: 'ar', label: 'AR', name: 'العربية' },
]

function HomeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
      <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a.272.272 0 0 0 .091-.086L12 5.432Z" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

function LanguageSwitcher({ language, setLanguage, label, onOpen }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const current = LANGUAGES.find(l => l.code === language) || LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    function handleOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  function select(code) {
    setLanguage(code)
    setOpen(false)
  }

  function handleButtonKey(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o) }
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true) }
  }

  function handleOptionKey(e, code, idx) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(code) }
    if (e.key === 'ArrowDown') { e.preventDefault(); containerRef.current?.querySelectorAll('[role="option"]')[idx + 1]?.focus() }
    if (e.key === 'ArrowUp') { e.preventDefault(); idx === 0 ? containerRef.current?.querySelector('.site-navigation__lang-btn')?.focus() : containerRef.current?.querySelectorAll('[role="option"]')[idx - 1]?.focus() }
    if (e.key === 'Escape') setOpen(false)
  }

  function handleToggle() {
    const next = !open
    if (next) onOpen()
    setOpen(next)
  }

  return (
    <div className="site-navigation__lang-wrap" ref={containerRef}>
      <button
        type="button"
        className="site-navigation__lang-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={handleToggle}
        onKeyDown={handleButtonKey}
      >
        {current.label}
        <svg className="site-navigation__lang-chevron" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          className="site-navigation__lang-dropdown"
          role="listbox"
          aria-label={label}
        >
          {LANGUAGES.map((lang, idx) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={lang.code === language}
              tabIndex={0}
              className={`site-navigation__lang-option${lang.code === language ? ' site-navigation__lang-option--active' : ''}`}
              onClick={() => select(lang.code)}
              onKeyDown={(e) => handleOptionKey(e, lang.code, idx)}
            >
              <span className="site-navigation__lang-code">{lang.label}</span>
              <span className="site-navigation__lang-name">{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SiteNavigation() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    function handleOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen])

  function scrollToTop(e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleNavLink(e, id) {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={navRef} className="site-navigation-wrapper">
      <nav className={`site-navigation${scrolled ? ' site-navigation--scrolled' : ''}`} aria-label="Primary navigation">
        <div className="site-navigation__left">
          <a
            className="site-navigation__home"
            href="#top"
            onClick={scrollToTop}
            aria-label={t.nav.backToTop}
            title={t.nav.backToTop}
          >
            <HomeIcon />
            <span className="site-navigation__home-label">{t.nav.home}</span>
          </a>
        </div>

        <div className="site-navigation__links">
          <a href="#about">{t.nav.about}</a>
          <a href="#skills">{t.nav.skills}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#training">{t.nav.training}</a>
        </div>

        <div className="site-navigation__right">
          <div className="site-navigation__end-group">
            <LanguageSwitcher
              language={language}
              setLanguage={setLanguage}
              label={t.nav.language}
              onOpen={() => setMenuOpen(false)}
            />
            <button
              type="button"
              className="site-navigation__hamburger"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`site-navigation__mobile-menu${menuOpen ? ' site-navigation__mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <a href="#about" onClick={(e) => handleNavLink(e, 'about')}>{t.nav.about}</a>
        <a href="#skills" onClick={(e) => handleNavLink(e, 'skills')}>{t.nav.skills}</a>
        <a href="#projects" onClick={(e) => handleNavLink(e, 'projects')}>{t.nav.projects}</a>
        <a href="#training" onClick={(e) => handleNavLink(e, 'training')}>{t.nav.training}</a>
      </div>
    </div>
  )
}

export default SiteNavigation
