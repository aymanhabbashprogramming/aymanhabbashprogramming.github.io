import './Hero.css'
import { useLanguage } from '../i18n/LanguageContext'

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.2.65-.46v-1.78c-2.65.57-3.21-1.13-3.21-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.47 2.25 1.05 2.8.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.61.98A9.1 9.1 0 0 1 12 7.2c.81 0 1.63.11 2.39.32 1.82-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.1 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.47-4.37 4.71.34.3.65.87.65 1.75v2.6c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M4.5 20.2a7.5 7.5 0 0 1 15 0" />
    </svg>
  )
}

function GraduationCapIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 3.5 2 8.5l10 5 10-5-10-5Z" />
      <path d="M6 10.8v4.4c0 1.4 2.7 3.3 6 3.3s6-1.9 6-3.3v-4.4" />
      <path d="M21 9.2v6" />
    </svg>
  )
}

function UniversityIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 21h18" />
      <path d="M4 21V10l8-6 8 6v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 12h.01M12 12h.01M15 12h.01" />
    </svg>
  )
}

function Hero({ name = 'MOHAMMED AYMAN HABBASH', role = 'Software Developer | C++ • C# • SQL' }) {
  const { t } = useLanguage()
  return (
    <main className="hero" aria-labelledby="hero-title">
      <div className="hero__glow hero__glow--blue" />
      <div className="hero__glow hero__glow--violet" />

      <div className="hero__layout">
        <section className="hero__content hero__panel--card" id="top">
          <p className="hero__intro">{t.hero.greeting}</p>
          <h1 id="hero-title">{name}<span className="hero__period">.</span></h1>
          <p className="hero__role">
            <span className="hero__role-badges">
              <span className="hero__role-badge hero__role-badge--violet">{(t.hero.role || role).split('|')[0].trim()}</span>
              <span className="hero__role-badge">C++</span>
              <span className="hero__role-badge">C#</span>
              <span className="hero__role-badge">SQL</span>
            </span>
          </p>
          <p className="hero__description">
            {t.hero.description}
          </p>
        </section>

        <aside className="hero__panel" aria-label="Profile summary">
          <div className="hero__avatar">
            <ProfileIcon />
          </div>

          <div className="hero__languages">
            <span className="hero__languages-line">
              <UniversityIcon />
              Selçuk University
            </span>
            <span className="hero__languages-line">
              <GraduationCapIcon />
              Computer Engineering
            </span>
          </div>

          <a
            className="hero__github"
            href="https://github.com/aymanhabbashprogramming"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
            View My GitHub
          </a>
        </aside>
      </div>
    </main>
  )
}

export default Hero
