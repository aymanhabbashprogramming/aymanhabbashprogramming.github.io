import './Footer.css'
import { useLanguage } from '../i18n/LanguageContext'

function ArrowUpIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

function scrollToTop(e) {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const links = [
    { href: '#about',    label: t.nav.about    },
    { href: '#skills',   label: t.nav.skills   },
    { href: '#projects', label: t.nav.projects  },
    { href: '#training', label: t.nav.training  },
  ]

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* ── Top row: name | links | spacer ── */}
        <div className="footer__columns">
          <div className="footer__col footer__col--identity">
            <p className="footer__brand">{t.footer.name}</p>
            <p className="footer__tagline">{t.footer.tagline}</p>
          </div>

          <div className="footer__col footer__col--center">
            <nav aria-label="Footer navigation">
              {links.map(link => (
                <a key={link.href} className="footer__nav-link" href={link.href}>{link.label}</a>
              ))}
            </nav>
          </div>

          <div className="footer__col footer__col--spacer" aria-hidden="true" />
        </div>

        {/* ── Bottom bar: spacer | copyright | back-to-top ── */}
        <div className="footer__bottom">
          <div className="footer__bottom-spacer" />
          <p className="footer__copy">{t.footer.copyright(year)}</p>
          <div className="footer__bottom-end">
            <a className="footer__top-btn" href="#top" onClick={scrollToTop} aria-label={t.nav.backToTop} title={t.nav.backToTop}>
              <ArrowUpIcon />
              {t.nav.backToTop}
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
