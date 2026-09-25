import { useEffect, useRef, useState } from 'react'
import './OtherProjects.css'

const projects = [
  {
    title: 'Image Processing System',
    badges: ['C#', 'Mathematical Operations', 'Image Processing'],
    description: 'A practical image processing application implementing approximately 15 operations, including image resizing, image combination, image splitting, and mathematical operations on images.',
    url: 'https://github.com/aymanhabbashprogramming/ImageProcessingSystem',
    icon: 'image',
  },
  {
    title: 'ContactsManager',
    badges: ['C#', 'SQL', 'CRUD'],
    description: 'A C# application connected to a SQL database, implementing practical database operations and CRUD functionality.',
    url: 'https://github.com/aymanhabbashprogramming/ContactsManager',
    icon: 'database',
  },
  {
    title: 'Tic-Tac-Toe Game',
    badges: ['C#', 'WinForms', 'Graphics/GDI+'],
    description: 'A C# WinForms game demonstrating game logic and custom graphical drawing using the Graphics and Paint mechanisms.',
    url: 'https://github.com/aymanhabbashprogramming/Tic-Tac-Toe-Game',
    icon: 'game',
  },
  {
    title: 'Pizza Project',
    badges: ['C#', 'WinForms', 'Dynamic Pricing'],
    description: 'A C# WinForms application for pizza ordering with dynamic order handling and real-time price calculation.',
    url: 'https://github.com/aymanhabbashprogramming/PizzaProject',
    icon: 'pizza',
  },
]

function ProjectIcon({ type }) {
  const paths = {
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m4 17 5-5 3.5 3.5 2.5-2.5L20 18" /></>,
    database: <><ellipse cx="12" cy="5" rx="7.5" ry="3" /><path d="M4.5 5v7c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V5" /><path d="M4.5 12v7c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-7" /></>,
    game: <><path d="M7.2 9h9.6a4 4 0 0 1 3.77 5.34l-1.1 3.06a2.3 2.3 0 0 1-4.03.62l-1.3-1.72h-4.28l-1.3 1.72a2.3 2.3 0 0 1-4.03-.62l-1.1-3.06A4 4 0 0 1 7.2 9Z" /><path d="M8 13v4M6 15h4M16.5 14h.01M18.5 16h.01" /></>,
    pizza: <><path d="M4 19 12 4l8 15H4Z" /><path d="M7.6 12h.01M12 15.2h.01M15.4 11.5h.01" /><path d="M4 19h16" /></>,
  }
  return <svg className="other-projects__icon" aria-hidden="true" viewBox="0 0 24 24">{paths[type]}</svg>
}

function GitHubIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.2.65-.46v-1.78c-2.65.57-3.21-1.13-3.21-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.47 2.25 1.05 2.8.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.61.98A9.1 9.1 0 0 1 12 7.2c.81 0 1.63.11 2.39.32 1.82-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.1 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.47-4.37 4.71.34.3.65.87.65 1.75v2.6c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" /></svg>
}

function OtherProjects({ items = projects }) {
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
    }, { threshold: 0.12 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={`other-projects ${isVisible ? 'other-projects--visible' : ''}`} aria-labelledby="other-projects-title">
      <div className="other-projects__inner">
        <header className="other-projects__header">
          <span className="other-projects__index" aria-hidden="true">04</span>
          <h2 id="other-projects-title">Other Projects<span>.</span></h2>
        </header>
        <div className="other-projects__grid">
          {items.map((project, index) => (
            <article className="other-projects__card" style={{ '--project-index': index }} key={project.title}>
              <ProjectIcon type={project.icon} />
              <h3>{project.title}</h3>
              <ul className="other-projects__badges" aria-label={`${project.title} technologies`}>
                {project.badges.map((badge) => <li key={badge}>{badge}</li>)}
              </ul>
              <p>{project.description}</p>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <GitHubIcon /> View Repository
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OtherProjects
