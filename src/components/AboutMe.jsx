import { useEffect, useRef, useState } from 'react'
import './AboutMe.css'
import { useLanguage } from '../i18n/LanguageContext'

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

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

// English terms that must render LTR inside Arabic text
function Ltr({ children }) {
  return <bdi dir="ltr">{children}</bdi>
}

// Arabic descriptions have inline English terms wrapped in <bdi dir="ltr">
// so they are stored as render functions, not plain strings.
const arDescriptions = [
  // Card 1 — Layered Architecture
  () => (
    <>
      ضمن الخبرات التي اكتسبتها، أقوم بفصل بنية الكود إلى ثلاث طبقات: طبقة الوصول للبيانات (<Ltr>Data Access</Ltr>)، وطبقة منطق الأعمال (<Ltr>Business Logic</Ltr>)، وطبقة العرض (<Ltr>Presentation</Ltr>). بهذه الطريقة يصبح تنظيم ملفات المشروع أوضح، وتسهل صيانته لاحقًا مع سهولة أكبر في تتبع الأخطاء وإصلاحها.
    </>
  ),
  // Card 2 — OOP
  () => (
    <>
      البرمجة كائنية التوجه جزء أساسي من أسلوبي في كتابة الكود. أقوم بفصل الكيانات المختلفة عن بعضها من خلال إنشاء كلاسات مستقلة لكل منها، مع تطبيق مبادئ التجريد والتغليف والوراثة، وتحديد مستوى الوصول المناسب لكل خاصية أو دالة، سواء كان عامًا أو خاصًا أو محميًا. طبّقت هذه المفاهيم عمليًا من خلال بناء نظام إدارة العمليات البنكية بلغة <Ltr>C++</Ltr>.
    </>
  ),
  // Card 3 — Database Integration
  () => (
    <>
      في إطار خبرتي مع قواعد البيانات، تعاملت مع <Ltr>ADO.NET</Ltr> في عدة مشاريع، وحرصت دائمًا على كتابة الاستعلامات بطريقة فعالة، لأن كفاءة الاستعلام لا تقل أهمية عن الاستعلام نفسه. كما تعاملت مع <Ltr>Entity Framework</Ltr> في مشاريع أخرى، مستفيدًا من فهمي الجيد لقواعد البيانات العلائقية والبرمجة الكائنية في التعامل معها بسهولة.
    </>
  ),
  // Card 4 — Data Structures
  () => (
    <>
      تُعد هياكل البيانات جزءًا مهمًا من خبرتي أيضًا، حيث أحرص على اختيار أنواع البيانات المناسبة لكل حالة، وعند الحاجة أقوم ببناء أنواع بيانات مخصصة بدل الاقتصار على الأنواع الجاهزة فقط. طبّقت هذا المبدأ عمليًا من خلال بناء هياكل بيانات أساسية من الصفر بلغة <Ltr>C++</Ltr>، مثل القوائم المترابطة والمصفوفات الديناميكية والمكدسات وطوابير الانتظار.
    </>
  ),
]

const ICONS = [<LayersIcon />, <ClassesIcon />, <DatabaseIcon />, <TreeIcon />]
const WRAP_BADGES = [false, false, false, true]
const ACCENT = 'sky'

function AboutMe() {
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
    }, { threshold: 0.15 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const cards = t.about.cards

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`about site-section site-section--divided ${isVisible ? 'about--visible' : ''}`}
      aria-labelledby="about-title"
    >
      <div className="about__frame">
        <div className="about__heading">
          <h2 id="about-title">{t.headings.about}</h2>
          <p className="about__intro">{t.about.intro}</p>
        </div>

        <div className="about__grid" id="about-grid">
          {cards.map((card, index) => {
            const DescNode = language === 'ar' ? arDescriptions[index] : null
            return (
              <article
                key={index}
                className={`about__card about__card--${ACCENT}`}
                style={{ '--card-index': index }}
              >
                <div className="about__card-head">
                  <div className="about__card-icon" aria-hidden="true">
                    {ICONS[index]}
                  </div>
                  <h3 className="about__card-title">{card.title}</h3>
                </div>
                <div className="about__card-body">
                  {card.badges && (
                    <ul className={`about__card-badges ${WRAP_BADGES[index] ? 'about__card-badges--wrap' : ''}`}>
                      {card.badges.map((badge) => (
                        <li key={badge} dir={language === 'ar' ? undefined : undefined}>{badge}</li>
                      ))}
                    </ul>
                  )}
                  <p className="about__card-description">
                    {DescNode ? <DescNode /> : card.description}
                  </p>
                </div>
              </article>
            )
          })}

          {showMore && (
            <div className="about__more-panel">
              <p>More skills coming soon.</p>
            </div>
          )}
        </div>

        <div className="about__more">
          <button
            type="button"
            className="about__more-toggle"
            aria-expanded={showMore}
            aria-controls="about-grid"
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? t.about.showLess : t.about.showMore}
            <span className={`about__more-chevron ${showMore ? 'about__more-chevron--up' : ''}`} aria-hidden="true">
              <ChevronIcon />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
