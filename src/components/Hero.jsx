import './Hero.css'
import { useLanguage } from '../i18n/LanguageContext'

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.2.65-.46v-1.78c-2.65.57-3.21-1.13-3.21-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.47 2.25 1.05 2.8.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.61.98A9.1 9.1 0 0 1 12 7.2c.81 0 1.63.11 2.39.32 1.82-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.1 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.47-4.37 4.71.34.3.65.87.65 1.75v2.6c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  )
}

function EnvelopeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  )
}

const CV_URLS = {
  en: 'cv/cv_english.pdf',
  ar: 'cv/cv_arabic.pdf',
  tr: 'cv/cv_turkish.pdf',
}

function Hero() {
  const { t, language } = useLanguage()
  const h = t.hero
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const cvUrl = `${base}/${CV_URLS[language]}`

  return (
    <main className="hero" id="top" aria-labelledby="hero-title">

      {/* ── Banner ── */}
      <div className="hero__banner">
        <div className="hero__banner-inner">

          {/* Left column */}
          <div className="hero__left">
            <p className="hero__description" lang={language}>
              {h.description}
            </p>

            {/* Action row: GitHub button + CV button + email */}
            <div className="hero__actions">
              <a
                className="hero__github"
                href="https://github.com/aymanhabbashprogramming"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
                {h.github}
              </a>

              <a
                className="hero__cv"
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {h.viewCV}
              </a>

              <a
                className="hero__email"
                href={`mailto:${h.email}`}
              >
                <EnvelopeIcon />
                <span dir="ltr">{h.email}</span>
              </a>
            </div>

            {/* University block */}
            <div className="hero__banner-uni">
              <div className="hero__banner-uni-badge">
                <img
                  src="/images/Picture2.png"
                  alt={h.uniLogoAlt}
                  className="hero__banner-uni-logo"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <div className="hero__banner-uni-text">
                <span className="hero__banner-uni-name">{h.uniName}</span>
                <span className="hero__banner-uni-dept">{h.uniDept}</span>
              </div>
            </div>
          </div>

          {/* Right column: profile card */}
          <div className="hero__body-right">
            <div className="hero__photo-wrap">
              <div className="hero__avatar">
                <img
                  src="/images/myimage.png"
                  alt={h.photoAlt}
                />
              </div>
            </div>
            <h1 id="hero-title" className="hero__profile-name">{h.profileName}</h1>
            <p className="hero__profile-role">{h.role}</p>
            <p className="hero__profile-tech" dir="ltr">{h.tech}</p>
          </div>

        </div>
      </div>

      {/* ── Body (kept for scroll targets) ── */}
      <div className="hero__body" />
    </main>
  )
}

export default Hero
