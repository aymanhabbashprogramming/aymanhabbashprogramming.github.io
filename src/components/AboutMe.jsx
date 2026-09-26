import { useEffect, useRef, useState } from 'react'
import './AboutMe.css'
import { useLanguage } from '../i18n/LanguageContext'

// أيقونات SVG بسيطة ومتناسقة مع باقي الصفحة
const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)

const TreeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2" />
    <circle cx="5" cy="14" r="2" />
    <circle cx="19" cy="14" r="2" />
    <circle cx="5" cy="20.5" r="1.4" />
    <circle cx="19" cy="20.5" r="1.4" />
    <path d="M12 6v4M12 10 5 12M12 10l7 2M5 16v2.5M19 16v2.5" />
  </svg>
)

const ClassesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
    <path d="M6.5 10v2a2 2 0 0 0 2 2h1M17.5 10v2a2 2 0 0 0-2 2h-1" />
  </svg>
)

const cardsData = [
  {
    id: 1,
    icon: <LayersIcon />,
    title: 'Layered Architecture',
    description: 'As part of my development experience, I structure code into three layers: Data Access, Business Logic, and Presentation. This makes project files easier to organize, simplifies maintenance later on, and makes it easier to trace and fix errors.',
    badges: ['Data Access', 'Business Logic', 'Presentation'],
    accent: 'sky'
  },
  {
    id: 2,
    icon: <ClassesIcon />,
    title: 'Object-Oriented Programming',
    description: 'Object-oriented programming is a core part of how I write code. I separate different entities by creating independent classes for each one, applying the principles of abstraction, encapsulation, and inheritance, and defining the appropriate access level for each property or method, whether public, private, or protected. I applied these concepts practically by building a banking management system in C++.',
    badges: ['Encapsulation', 'Inheritance', 'Abstraction'],
    accent: 'sky'
  },
  {
    id: 3,
    icon: <DatabaseIcon />,
    title: 'Database Integration',
    description: 'As part of my experience with databases, I have worked with ADO.NET across multiple projects, always focusing on writing efficient queries, since query performance matters as much as the query itself. I have also worked with Entity Framework in other projects, drawing on my solid understanding of relational databases and object-oriented programming to work with it effectively.',
    badges: ['ADO.NET', 'Entity Framework'],
    accent: 'sky'
  },
  {
    id: 4,
    icon: <TreeIcon />,
    title: 'Data Structures',
    description: 'Data structures are also an important part of my experience. I focus on choosing the right data type for each situation, and when needed, I build custom data types instead of relying only on ready-made ones. I applied this principle practically by building fundamental data structures from scratch in C++, including linked lists, dynamic arrays, stacks, and queues, among others.',
    badges: ['Custom Data Types', 'Memory Management', 'Algorithm Efficiency'],
    accent: 'sky'
  }
]

const localizedCards = {
  en: cardsData.map(({ title, description }) => ({ title, description })),
  tr: cardsData.map(({ title, description }) => ({ title, description })),
  ar: cardsData.map(({ title, description }) => ({ title, description })),
}

function AboutMe() {
  const { t, language } = useLanguage()
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
    <section
      ref={sectionRef}
      id="about"
      className={`about ${isVisible ? 'about--visible' : ''}`}
      aria-labelledby="about-title"
    >
      <div className="about__frame">
        <div className="about__heading">
          <h2 id="about-title">{t.headings.about}</h2>
          <p className="about__intro">
            Using the skills and tools shown below, I build solid, well-organized software projects that are easy to maintain and extend. As I learn new skills, I continue to apply this same approach to keep improving the quality and efficiency of my projects.
          </p>
        </div>

        <div className="about__grid">
          {cardsData.map((card, index) => {
            const localized = localizedCards[language][index]
            return (
            <article
              key={card.id}
              className={`about__card about__card--${card.accent}`}
              style={{ '--card-index': index }}
            >
              <div className="about__card-head">
                <div className="about__card-icon" aria-hidden="true">
                  {card.icon}
                </div>
                <h3 className="about__card-title">{localized.title}</h3>
              </div>
              <div className="about__card-body">
                {card.badges && (
                  <ul className="about__card-badges">
                    {card.badges.map((badge) => <li key={badge}>{badge}</li>)}
                  </ul>
                )}
                <p className="about__card-description">{localized.description}</p>
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutMe
