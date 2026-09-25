import { useEffect, useRef, useState } from 'react'
import './Training.css'

const entries = [
  {
    title: 'Structured Programming & Software Development Training',
    status: 'Completed',
    description: 'Completed 18 progressive courses under the guidance of an experienced programming instructor, following a consistent training methodology covering programming fundamentals, problem solving, algorithms, C++, object-oriented programming, and advanced programming concepts.',
    state: 'completed',
  },
  {
    title: 'Current Training — Course 19',
    status: 'Upcoming',
    description: 'An upcoming comprehensive practical course designed to bring together the concepts covered throughout the previous 18 courses into a complete software project, including C#, OOP, SQL and database integration, 3-layer architecture, and user interface development.',
    state: 'upcoming',
  },
]

function Training({ items = entries }) {
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
    <section ref={sectionRef} id="training" className={`training ${isVisible ? 'training--visible' : ''}`} aria-labelledby="training-title">
      <div className="training__inner">
        <header className="training__header">
          <span className="training__index" aria-hidden="true">06</span>
          <h2 id="training-title">Training &amp; Professional Development<span>.</span></h2>
        </header>
        <div className="training__timeline">
          {items.map((entry, index) => (
            <article className={`training__entry training__entry--${entry.state}`} style={{ '--entry-index': index }} key={entry.title}>
              <span className="training__node" aria-hidden="true" />
              <div className="training__card">
                <div className="training__topline">
                  <h3>{entry.title}</h3>
                  <span className="training__status">{entry.status}</span>
                </div>
                <p>{entry.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Training
