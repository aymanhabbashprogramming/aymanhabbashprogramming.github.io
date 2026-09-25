import { useEffect, useRef, useState } from 'react'
import './Education.css'

function GraduationCap() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m2.5 9.5 9.5-5 9.5 5-9.5 5-9.5-5Z" />
      <path d="M6 11.35v4.25c1.54 1.24 3.56 1.9 6 1.9s4.46-.66 6-1.9v-4.25" />
      <path d="M21.5 9.5v5" />
    </svg>
  )
}

function Education() {
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
    }, { threshold: 0.15 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="education" className={`education ${isVisible ? 'education--visible' : ''}`} aria-labelledby="education-title">
      <div className="education__inner">
        <header className="education__header">
          <span className="education__index" aria-hidden="true">05</span>
          <h2 id="education-title">Education<span>.</span></h2>
        </header>
        <article className="education__card">
          <div className="education__icon"><GraduationCap /></div>
          <div className="education__details">
            <span className="education__label">CURRENTLY PURSUING</span>
            <h3>Selçuk University</h3>
            <p>Faculty of Technology — Computer Engineering</p>
          </div>
          <span className="education__status"><i /> Current Student</span>
        </article>
      </div>
    </section>
  )
}

export default Education
