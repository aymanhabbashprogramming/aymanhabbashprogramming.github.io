import { useEffect, useRef, useState } from 'react'
import './Skills.css'
import { useLanguage } from '../i18n/LanguageContext'

/* --- أيقونات SVG --- */
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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const mainTrack = [
  { title: 'Languages', skills: ['C++', 'C#'], icon: <CodeIcon /> },
  { title: 'Database', skills: ['SQL', 'SQL Server', 'ADO.NET'], icon: <DatabaseIcon /> },
  { title: '.NET Development', skills: ['.NET Framework', 'WinForms', 'Entity Framework'], icon: <LayersIcon /> },
  { title: 'Software Concepts', skills: ['OOP', 'Layered Architecture (3-Layer)', 'Data Structures & Algorithms'], icon: <BlueprintIcon /> },
  { title: 'Tools', skills: ['Git', 'GitHub', 'Visual Studio'], icon: <WrenchIcon /> },
]

function SkillBlock({ title, skills, icon, index }) {
  return (
    <article className="skills__block" style={{ '--block-index': index }}>
      <div className="skills__block-header">
        <span className="site-icon-box skills__block-icon" aria-hidden="true">{icon}</span>
        <h3>{title}</h3>
      </div>
      <div className="skills__block-body">
        <ul className="site-badge-list">{skills.map((skill) => <li className="site-badge" key={skill}>{skill}</li>)}</ul>
      </div>
    </article>
  )
}

function Skills() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showMore, setShowMore] = useState(false)

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
    <section ref={sectionRef} id="skills" className={`skills site-section site-section--divided ${isVisible ? 'skills--visible' : ''}`} aria-labelledby="skills-title">
      <div className="skills__inner">
        <header className="skills__header">
          <h2 id="skills-title" className="skills__title">{t.headings.skills}</h2>
        </header>

        <p className="skills__intro">{t.skillsIntro}</p>

        <div className="skills__blocks" id="skills-blocks">
          {mainTrack.map((block, index) => <SkillBlock {...block} index={index} key={block.title} />)}

          {showMore && (
            <div className="skills__more-panel">
              <p>More skills coming soon.</p>
            </div>
          )}
        </div>

        <div className="skills__more">
          <button
            type="button"
            className="skills__more-toggle"
            aria-expanded={showMore}
            aria-controls="skills-blocks"
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? 'Show Less' : 'Show More Skills'}
            <span className={`skills__more-chevron ${showMore ? 'skills__more-chevron--up' : ''}`} aria-hidden="true">
              <ChevronIcon />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Skills
