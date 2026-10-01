import './Footer.css'

const LINKS = [
  { href: '#about',    label: 'Experience' },
  { href: '#skills',   label: 'Tech Stack'  },
  { href: '#projects', label: 'Projects'    },
  { href: '#training', label: 'Training'    },
]

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
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* ── Three columns ── */}
        <div className="footer__columns">

          <div className="footer__col footer__col--left">
            <p className="footer__brand">Mohammed Ayman Habbash</p>
            <p className="footer__tagline">Software Developer. Computer Engineering student at Selçuk University.</p>
          </div>

          <div className="footer__col footer__col--center">
            <nav aria-label="Footer navigation">
              {LINKS.map(link => (
                <a key={link.href} className="footer__nav-link" href={link.href}>{link.label}</a>
              ))}
            </nav>
          </div>

          <div className="footer__col footer__col--right" aria-hidden="true" />

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer__bottom">
          <div className="footer__bottom-spacer" />
          <p className="footer__copy">© {year} Mohammed Ayman Habbash. All rights reserved.</p>
          <div className="footer__bottom-end">
            <a className="footer__top-btn" href="#top" onClick={scrollToTop} aria-label="Back to top" title="Back to top">
              <ArrowUpIcon />
              Back to top
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
