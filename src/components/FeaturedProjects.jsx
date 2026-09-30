import { useEffect, useRef, useState } from 'react'
import './FeaturedProjects.css'
import { useLanguage } from '../i18n/LanguageContext'

const projects = [
  {
    title: 'Pharmacy Management System',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/PharmacyManagementSystem' }],
    badges: ['C#', 'SQL', '.NET Framework', '3-Layer Architecture'],
    description: 'A pharmacy management system that handles users, suppliers, and patient records, allowing medications received by each patient to be tracked through a dedicated archive. The system also manages medication dispensing and sales through batches, prioritizing the sale of medications closest to their expiration date, in addition to issuing sales and purchase invoices.',
    icon: <PillIcon />,
  },
  {
    title: 'POS / Inventory System',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/POS-InventorySystem' }],
    badges: ['C#', 'SQL Server', 'Entity Framework', '3-Layer Architecture'],
    description: 'A sales and point-of-sale management system focused on tracking product movement in and out of inventory, with every sale or purchase linked to its own invoice. The system also manages supplier, customer, and user data within a single integrated structure.',
    icon: <CartIcon />,
  },
  {
    title: 'Bank Management System',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/BankManagementSystem' }],
    badges: ['C++', 'OOP', 'Software Design'],
    description: 'A banking management system operating under a comprehensive permissions system, where each user’s allowed operations are defined across the system, including client management, transfers, user management, and login records. The system supports withdrawals, deposits, and transfers between client accounts, along with a dedicated screen for currency exchange rates and direct currency conversion operations.',
    icon: <BankIcon />,
  },
  {
    title: 'Data Structures in C++',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/Data-Structures-CPP' }],
    badges: ['C++', 'Data Structures', 'Algorithms', 'Template Classes', 'Template Functions'],
    description: 'A data structures project involving building core structures from scratch, such as doubly linked lists, dynamic arrays, queues, and stacks, using a template-based approach to make them usable with any data type. I applied these structures practically in an undo/redo system for text editing using the stack, and in another system simulating a real-world queue line that issues tickets and tracks served clients.',
    icon: <NodesIcon />,
  },
  {
    title: 'ContactsDesktop',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/ContactsDesktop' }],
    badges: ['C#', 'WinForms', '3-Layer Architecture', 'Code Reusability'],
    description: 'A contacts management system with a WinForms interface, fully reusing the business logic and data access layers from the ContactHub project without duplicating any code, limiting the work in this project to the presentation layer only. This project demonstrates a practical application of the reusability principle within a 3-tier architecture.',
    icon: <DesktopIcon />,
  },
  {
    title: 'Image Processing System',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/ImageProcessingSystem' }],
    badges: ['C#', 'Windows Forms', '.NET Framework', 'Krypton Toolkit', 'Pixel-Level Processing'],
    description: 'An image processing application implementing 15 different operations manually, without relying on ready-made libraries, by working directly with the image’s pixel data. Each operation’s result is displayed in a separate area without altering the original image, with the ability to undo changes when needed.',
    icon: <ImageIcon />,
  },
]

const moreProjects = [
  {
    title: 'ContactHub',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/ContactHub' }],
    badges: ['C#', 'SQL Server', 'ADO.NET', '3-Layer Architecture', 'DataTable', 'Console Application'],
    description: 'A contact management system that manages countries and contacts, supporting add, update, delete, and search operations. The project applies a 3-tier architecture, where every operation flows clearly from the presentation layer to the business logic layer, then to the data access layer that executes against the database. Efficient queries were used throughout, such as existence-check queries instead of retrieving a full record just to confirm its presence, alongside using DataTable to organize and process query results.',
    icon: <AddressCardIcon />,
  },
  {
    title: 'ContactsManager',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/ContactsManager' }],
    badges: ['C#', 'ADO.NET', 'SQL Server'],
    description: 'A contacts management system connected to a database, supporting the four core operations: create, read, update, and delete. The system supports searching in multiple ways, whether by first name, first name and country, or partial matching, along with the ability to delete a single contact or multiple contacts at once.',
    icon: <UsersIcon />,
  },
  {
    title: 'Tic-Tac-Toe Game',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/Tic-Tac-Toe-Game' }],
    badges: ['C#', 'Windows Forms', 'Graphics (GDI+)', 'Bitwise Operations'],
    description: 'A Tic-Tac-Toe game with a WinForms interface, where the game board is drawn manually using Graphics instead of relying on ready-made buttons. The project represents each cell as a bit, comparing the player’s state against predefined binary patterns using bitwise operations to detect a win or draw quickly and efficiently, instead of manually checking every possible combination.',
    icon: <GameBoardIcon />,
  },
  {
    title: 'Pizza Order App',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/PizzaProject' }],
    badges: ['C#', 'Windows Forms'],
    description: 'A pizza ordering application with a WinForms interface, allowing order customization through size, toppings, and crust type selection, with the total price calculated instantly as each option changes. The app displays a full order summary before confirmation, with the ability to cancel or reset the form entirely.',
    icon: <PizzaIcon />,
  },
]

const toLocalized = (list) => list.map(({ title, badges, description }) => ({ title, badges, description }))

const localizedProjects = {
  en: toLocalized(projects),
  tr: toLocalized(projects),
  ar: toLocalized(projects),
}

const localizedMoreProjects = {
  en: toLocalized(moreProjects),
  tr: toLocalized(moreProjects),
  ar: toLocalized(moreProjects),
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.2.65-.46v-1.78c-2.65.57-3.21-1.13-3.21-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.47 2.25 1.05 2.8.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.61.98A9.1 9.1 0 0 1 12 7.2c.81 0 1.63.11 2.39.32 1.82-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.1 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.47-4.37 4.71.34.3.65.87.65 1.75v2.6c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  )
}

function PillIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-45 12 12)" />
      <path d="M9.5 9.5l5 5" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  )
}

function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v9M9.5 10v9M14.5 10v9M19 10v9" />
      <path d="M3 21h18" />
    </svg>
  )
}

function NodesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="12" r="2.2" />
      <path d="M7 6.8l10 4.4M7 17.2l10-4.4" />
    </svg>
  )
}

function AddressCardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <circle cx="8.5" cy="11" r="1.9" />
      <path d="M5.5 16c.6-1.7 2-2.6 3-2.6s2.4.9 3 2.6" />
      <path d="M14.5 9.5h4M14.5 12.5h4M14.5 15.5h2.5" />
    </svg>
  )
}

function DesktopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4" width="19" height="12" rx="1.5" />
      <path d="M8 21h8M12 16v5" />
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M21 16l-5.5-5.5a1.5 1.5 0 0 0-2.1 0L4 19" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.7-3 3-4.8 5.5-4.8s4.8 1.8 5.5 4.8" />
      <circle cx="17.5" cy="9.5" r="2.3" />
      <path d="M15.7 14.5c2 .1 3.7 1.7 4.3 4.2" />
    </svg>
  )
}

function GameBoardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </svg>
  )
}

function PizzaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5.5 12 21 21 5.5C18 4 15 3 12 3S6 4 3 5.5Z" />
      <path d="M3 5.5c3 2 6 3 9 3s6-1 9-3" />
      <circle cx="10" cy="9.7" r=".9" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="10.6" r=".9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13.8" r=".9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function ProjectCard({ project, localized, index, viewRepositoryLabel }) {
  return (
    <article className="featured-projects__card" style={{ '--project-index': index }}>
      <div className="featured-projects__card-head">
        <span className="site-icon-box featured-projects__card-icon" aria-hidden="true">{project.icon}</span>
        <h3>{localized.title}</h3>
      </div>
      <div className="featured-projects__card-body">
        <ul className="site-badge-list" aria-label={`${localized.title} technologies`}>
          {localized.badges.map((badge) => <li className="site-badge" key={badge}>{badge}</li>)}
        </ul>
        <p>{localized.description}</p>
      </div>
      <div className="featured-projects__card-foot">
        {project.repositories.map((repository) => (
          <a href={repository.url} target="_blank" rel="noopener noreferrer" key={repository.url}>
            <GitHubIcon /> {repository.label === 'View Repository' ? viewRepositoryLabel : repository.label}
          </a>
        ))}
      </div>
    </article>
  )
}

function FeaturedProjects({ items = projects, extraItems = moreProjects }) {
  const { t, language } = useLanguage()
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
    }, { threshold: 0.08 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className={`featured-projects site-section site-section--divided ${isVisible ? 'featured-projects--visible' : ''}`} aria-labelledby="featured-projects-title">
      <div className="featured-projects__inner">
        <header className="featured-projects__header">
          <h2 id="featured-projects-title">{t.headings.featured}</h2>
        </header>

        <div className="featured-projects__grid" id="featured-projects-grid">
          {items.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              localized={localizedProjects[language][index]}
              index={index}
              viewRepositoryLabel={t.common.viewRepository}
            />
          ))}
          {showMore && extraItems.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              localized={localizedMoreProjects[language][index]}
              index={items.length + index}
              viewRepositoryLabel={t.common.viewRepository}
            />
          ))}
        </div>

        <div className="featured-projects__more">
          <button
            type="button"
            className="featured-projects__more-toggle"
            aria-expanded={showMore}
            aria-controls="featured-projects-grid"
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? 'Show Less' : 'Show More Projects'}
            <span className={`featured-projects__more-chevron ${showMore ? 'featured-projects__more-chevron--up' : ''}`} aria-hidden="true">
              <ChevronIcon />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
