import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const mainTrack = [
  { title: 'Languages', skills: ['C++', 'C#'] },
  { title: 'Database', skills: ['SQL', 'SQL Server', 'ADO.NET'] },
  { title: '.NET Development', skills: ['.NET Framework', 'WinForms', 'Entity Framework'] },
  { title: 'Software Engineering', skills: ['OOP', 'Layered Architecture (3-Layer)', 'Data Structures & Algorithms', 'Software Design Principles'] },
  { title: 'Tools', skills: ['Git', 'GitHub', 'Visual Studio'] },
]

function SkillBlock({ title, skills, index, secondary = false }) {
  return (
    <article className={`skills__block ${secondary ? 'skills__block--secondary' : ''}`} style={{ '--block-index': index }}>
      <h3>{title}</h3>
      <ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
    </article>
  )
}

function Skills() {
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
    <section ref={sectionRef} id="skills" className={`skills ${isVisible ? 'skills--visible' : ''}`} aria-labelledby="skills-title">
      <div className="skills__inner">
        <header className="skills__header">
          <span className="skills__index" aria-hidden="true">02</span>
          <h2 id="skills-title">Skills<span>.</span></h2>
        </header>

        <div className="skills__blocks">
          {mainTrack.map((block, index) => <SkillBlock {...block} index={index} key={block.title} />)}
        </div>
        <div className="skills__divider" aria-hidden="true" />
        <div className="skills__secondary-block">
          <SkillBlock title="Acquired Skills" skills={['HTML', 'CSS', 'React']} index={5} secondary />
        </div>
      </div>
    </section>
  )
}

export default Skills
