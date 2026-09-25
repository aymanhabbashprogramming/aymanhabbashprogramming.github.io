import { useEffect, useRef, useState } from 'react'
import './Achievements.css'
import { useLanguage } from '../i18n/LanguageContext'

const courses = Array.from({ length: 14 }, (_, index) => index + 5)

function CertificateIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 3.5h8l3 3v10A2.5 2.5 0 0 1 15.5 19h-8A2.5 2.5 0 0 1 5 16.5v-10A2.5 2.5 0 0 1 7.5 4Z" />
      <path d="M15 4v4h4M9 13l2 2 4-4" />
    </svg>
  )
}

function ArrowUpRight() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" /></svg>
}

function Achievements({ certificates = courses }) {
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
    }, { threshold: 0.08 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="certificates" className={`achievements ${isVisible ? 'achievements--visible' : ''}`} aria-labelledby="achievements-title">
      <div className="achievements__inner">
        <header className="achievements__header">
          <span className="achievements__index" aria-hidden="true">07</span>
          <h2 id="achievements-title">{t.headings.achievements}<span>.</span></h2>
        </header>
        <p className="achievements__intro">{t.common.certificatesIntro}</p>
        <div className="achievements__grid">
          {certificates.map((course, index) => (
            <article className="achievements__card" style={{ '--certificate-index': index }} key={course}>
              <CertificateIcon />
              <h3>{t.common.course} {course}</h3>
              <a href={`/certificates/course-${course}.pdf`} target="_blank" rel="noopener noreferrer">
                {t.common.viewCertificate} <ArrowUpRight />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
