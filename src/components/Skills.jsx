import { useCallback, useEffect, useRef, useState } from 'react'
import './Skills.css'
import { useLanguage } from '../i18n/LanguageContext'

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

const BlueprintIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
)

const WrenchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

// Wraps English technical names in <bdi dir="ltr"> so they stay LTR in RTL layouts.
function B({ children }) { return <bdi dir="ltr">{children}</bdi> }

const COLUMNS = [
  { title: 'Languages',         icon: <CodeIcon />,      skills: [
      { key: 'C++',   node: <B>C++</B>  },
      { key: 'C#',    node: <B>C#</B>   },
  ]},
  { title: 'Database',          icon: <DatabaseIcon />,  skills: [
      { key: 'SQL',        node: <B>SQL</B>        },
      { key: 'SQL Server', node: <B>SQL Server</B> },
      { key: 'ADO.NET',    node: <B>ADO.NET</B>    },
  ]},
  { title: '.NET Development',  icon: <LayersIcon />,    skills: [
      { key: '.NET Framework',    node: <B>.NET Framework</B>    },
      { key: 'WinForms',          node: <B>WinForms</B>          },
      { key: 'Entity Framework',  node: <B>Entity Framework</B>  },
  ]},
  { title: 'Software Concepts', icon: <BlueprintIcon />, skills: [
      { key: 'OOP',                          node: 'OOP'                              },
      { key: 'Layered Architecture',         node: 'Layered Architecture'             },
      { key: 'Data Structures and Algorithms', node: 'Data Structures and Algorithms' },
  ]},
  { title: 'Tools',             icon: <WrenchIcon />,    skills: [
      { key: 'Git',          node: <B>Git</B>          },
      { key: 'GitHub',       node: <B>GitHub</B>       },
      { key: 'Visual Studio', node: <B>Visual Studio</B> },
  ]},
]

// Arabic overrides — only titles and Software Concepts items differ
const AR_TITLES = ['اللغات', 'قواعد البيانات', 'تطوير .NET', 'مفاهيم برمجية', 'الأدوات']
const AR_SOFTWARE_CONCEPTS = [
  { key: 'OOP',                          node: 'البرمجة كائنية التوجه'           },
  { key: 'Layered Architecture',         node: 'البنية متعددة الطبقات'           },
  { key: 'Data Structures and Algorithms', node: 'هياكل البيانات والخوارزميات' },
]

// Turkish overrides — only titles and Software Concepts items differ
const TR_TITLES = ['Diller', 'Veritabanı', '.NET Geliştirme', 'Yazılım Kavramları', 'Araçlar']
const TR_SOFTWARE_CONCEPTS = [
  { key: 'OOP',                          node: 'Nesne Yönelimli Programlama' },
  { key: 'Layered Architecture',         node: 'Katmanlı Mimari'             },
  { key: 'Data Structures and Algorithms', node: 'Veri Yapıları ve Algoritmalar' },
]

function SkillColumn({ title, skills, icon, index }) {
  return (
    <div className="skills__col" style={{ '--col-index': index }}>
      <div className="skills__col-heading">
        <span className="skills__col-icon" aria-hidden="true">{icon}</span>
        <span className="skills__col-title">{title}</span>
      </div>
      <ul className="skills__col-list">
        {skills.map((skill) => (
          <li key={skill.key} className="skills__col-item">{skill.node}</li>
        ))}
      </ul>
    </div>
  )
}

function SkillsCarousel() {
  const { language } = useLanguage()
  const trackRef = useRef(null)
  const [canScrollStart, setCanScrollStart] = useState(false)
  const [canScrollEnd, setCanScrollEnd]     = useState(false)

  const updateArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    // scrollLeft can be negative in RTL in some browsers — use abs
    const absLeft = Math.abs(scrollLeft)
    const maxScroll = scrollWidth - clientWidth
    setCanScrollStart(absLeft > 4)
    setCanScrollEnd(absLeft < maxScroll - 4)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const frame = requestAnimationFrame(updateArrows)
    track.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows])

  const scrollByCol = (direction) => {
    const track = trackRef.current
    if (!track) return
    const col = track.querySelector('.skills__col')
    const colWidth = col ? col.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0) : track.clientWidth
    // In RTL scrollLeft is negative: a more-negative value means scrolled further toward
    // the inline-end (visually left). direction=-1 is "toward inline-start" (back/right in RTL),
    // which physically means scrollLeft toward 0 = positive delta. Flip sign in RTL.
    const isRtl = getComputedStyle(track).direction === 'rtl'
    track.scrollBy({ left: direction * colWidth * (isRtl ? -1 : 1), behavior: 'smooth' })
  }

  return (
    <div className="skills__carousel">
      <button
        type="button"
        className="skills__arrow skills__arrow--start"
        style={{ visibility: canScrollStart ? 'visible' : 'hidden' }}
        aria-hidden={!canScrollStart}
        tabIndex={canScrollStart ? 0 : -1}
        onClick={() => scrollByCol(-1)}
        aria-label="Scroll skills left"
      >
        <span className="skills__arrow-icon skills__arrow-icon--back"><ChevronIcon /></span>
      </button>

      <div className="skills__track" ref={trackRef}>
        {COLUMNS.map((col, i) => {
          let title = col.title
          let skills = col.skills
          if (language === 'ar') {
            title = AR_TITLES[i]
            if (i === 3) skills = AR_SOFTWARE_CONCEPTS
          } else if (language === 'tr') {
            title = TR_TITLES[i]
            if (i === 3) skills = TR_SOFTWARE_CONCEPTS
          }
          return <SkillColumn key={col.title} title={title} skills={skills} icon={col.icon} index={i} />
        })}
      </div>

      <button
        type="button"
        className="skills__arrow skills__arrow--end"
        style={{ visibility: canScrollEnd ? 'visible' : 'hidden' }}
        aria-hidden={!canScrollEnd}
        tabIndex={canScrollEnd ? 0 : -1}
        onClick={() => scrollByCol(1)}
        aria-label="Scroll skills right"
      >
        <span className="skills__arrow-icon"><ChevronIcon /></span>
      </button>
    </div>
  )
}

function Skills() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.1 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`skills site-section site-section--divided ${isVisible ? 'skills--visible' : ''}`}
      aria-labelledby="skills-title"
    >
      <div className="skills__inner">
        <header className="skills__header">
          <h2 id="skills-title" className="skills__title">{t.headings.skills}</h2>
        </header>

        <p className="skills__intro">{t.skillsIntro}</p>

        <SkillsCarousel />
      </div>
    </section>
  )
}

export default Skills
