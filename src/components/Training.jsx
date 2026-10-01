import { useEffect, useRef, useState, useCallback } from 'react'
import './Training.css'

const courseTitles = [
  'Algorithms Level 2',
  'C++ Level 2',
  'Algorithms Level 3',
  'Algorithms Level 4',
  'Foundations Level 2',
  'OOP Level 1',
  'OOP Level 2',
  'Data Structures Level 1',
  'Algorithms Level 5',
  'C# Level 1',
  'Database Level 1: SQL',
  'OOP in C#',
  'Database Project',
  'C# and Database',
]

const earlyCourses = [
  { title: 'Foundations Level 1' },
  { title: 'Algorithms Level 1' },
  { title: 'C++ Level 1' },
  { title: 'Advanced Solutions for Algorithms Level 1' },
].map((course, i) => ({ number: `Course ${i + 1}`, title: course.title }))

const courseCertificates = [
  ...earlyCourses,
  ...courseTitles.map((title, i) => {
    const number = i + 5
    return { number: `Course ${number}`, title, pdf: `/certificates/course-${number}.pdf` }
  }),
]

const educationEntries = [
  {
    title: 'Programming Advices',
    platformUrl: 'https://programmingadvices.com',
    description: 'I followed a structured programming learning path on Programming Advices, a platform run by programmer Mohammed Abu-Hadhoud, who has more than 30 years of experience. I started from the fundamentals and progressed step by step. I solved each task on my own first, then compared my solution with the solutions provided on the platform to learn better ways of thinking and implementing. So far, I have completed 18 courses and applied what I learned in practice. The most important things I learned were object-oriented programming in C++, which I applied in the Bank Management System project, and data structures, which I built from scratch in the Data Structures in C++ project. I also learned C# and databases using SQL and SQL Server, and applied them in three projects: ContactHub, ContactsDesktop, and ContactsManager. I am still continuing my learning on the platform.',
    certificates: courseCertificates,
  },
]

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6l6 6-6 6" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5 9.5 17 19 7.5" />
  </svg>
)

function CertificateCarousel({ certificates }) {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    const maxScroll = scrollWidth - clientWidth
    setCanScrollLeft(scrollLeft > 4)
    setCanScrollRight(scrollLeft < maxScroll - 4)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const frame = requestAnimationFrame(updateArrows)
    const handleScroll = () => updateArrows()
    const handleResize = () => updateArrows()

    track.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [updateArrows, certificates])

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.training__cert')
    const amount = card ? card.getBoundingClientRect().width + 16 : track.clientWidth
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <div className="training__carousel">
      <button
        type="button"
        className="training__carousel-arrow training__carousel-arrow--left"
        style={{ visibility: canScrollLeft ? 'visible' : 'hidden' }}
        aria-hidden={!canScrollLeft}
        tabIndex={canScrollLeft ? 0 : -1}
        onClick={() => scrollByCard(-1)}
        aria-label="Previous certificates"
      >
        <span className="training__carousel-arrow-icon training__carousel-arrow-icon--left"><ChevronIcon /></span>
      </button>

      <div className="training__carousel-track" ref={trackRef}>
        {certificates.map((cert) => (
          <div className="training__cert" key={cert.number}>
            <div className="training__cert-head">
              <span className="training__cert-number">{cert.number}</span>
            </div>
            <div className="training__cert-body">
              <p className="training__cert-title">{cert.title}</p>
              {cert.pdf ? (
                <a className="training__cert-link" href={cert.pdf} target="_blank" rel="noopener noreferrer">
                  View Certificate
                </a>
              ) : (
                <span className="training__cert-status">
                  <CheckIcon />
                  Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="training__carousel-arrow training__carousel-arrow--right"
        style={{ visibility: canScrollRight ? 'visible' : 'hidden' }}
        aria-hidden={!canScrollRight}
        tabIndex={canScrollRight ? 0 : -1}
        onClick={() => scrollByCard(1)}
        aria-label="Next certificates"
      >
        <span className="training__carousel-arrow-icon"><ChevronIcon /></span>
      </button>
    </div>
  )
}

function EducationCard({ entry, index }) {
  return (
    <article className="training__card" style={{ '--entry-index': index }}>
      <div className="training__card-topline">
        <h3>{entry.title}</h3>
        {entry.platformUrl && (
          <a className="training__platform-link" href={entry.platformUrl} target="_blank" rel="noopener noreferrer">
            Visit Platform
          </a>
        )}
      </div>
      <p className="training__card-description">{entry.description}</p>
      <h4 className="training__cert-heading">Certifications</h4>
      <CertificateCarousel certificates={entry.certificates} />
      <p className="training__cert-note">Certificates are issued by the platform starting from Course 5.</p>
    </article>
  )
}

function Training({ items = educationEntries }) {
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
    <section ref={sectionRef} id="training" className={`training site-section site-section--divided ${isVisible ? 'training--visible' : ''}`} aria-labelledby="training-title">
      <div className="training__inner">
        <header className="training__header">
          <h2 id="training-title">Training and Professional Development</h2>
        </header>
        {items.map((entry, index) => (
          <EducationCard entry={entry} index={index} key={entry.title} />
        ))}
      </div>
    </section>
  )
}

export default Training
