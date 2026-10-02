import './Hero.css'
import { useLanguage } from '../i18n/LanguageContext'

function ProfileIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M4.5 20.2a7.5 7.5 0 0 1 15 0" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.2.65-.46v-1.78c-2.65.57-3.21-1.13-3.21-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.47 2.25 1.05 2.8.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.61.98A9.1 9.1 0 0 1 12 7.2c.81 0 1.63.11 2.39.32 1.82-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.1 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.47-4.37 4.71.34.3.65.87.65 1.75v2.6c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  )
}

function Hero() {
  const { t, language } = useLanguage()
  const h = t.hero

  return (
    <main className="hero" id="top" aria-labelledby="hero-title">

      {/* ── Banner ── */}
      <div className="hero__banner">
        <div className="hero__banner-inner">
          <h1 id="hero-title" className="hero__name">{h.name}</h1>

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
      </div>

      {/* ── Body ── */}
      <div className="hero__body">
        <div className="hero__body-inner">

          <div className="hero__body-left">
            <p className="hero__description" lang={language}>
              {h.description}
            </p>
          </div>

          {/* Photo + info column */}
          <div className="hero__body-right">
            <div className="hero__photo-wrap">
              <div className="hero__avatar"><ProfileIcon /></div>
            </div>
            <p className="hero__profile-name">{h.profileName}</p>
            <p className="hero__profile-role">{h.role}</p>
            <p className="hero__profile-tech" dir="ltr">{h.tech}</p>
            <a
              className="hero__github"
              href="https://github.com/aymanhabbashprogramming"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              {h.github}
            </a>
          </div>

        </div>
      </div>

    </main>
  )
}

export default Hero
