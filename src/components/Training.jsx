import { useEffect, useRef, useState, useCallback } from 'react'
import './Training.css'
import { useLanguage } from '../i18n/LanguageContext'

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
  'C# - Level 1',
  'Database Level 1: SQL',
  'OOP In C#',
  'Database Project',
  'C# & Database',
]

const earlyCourses = [
  { title: 'Foundations Level 1' },
  { title: 'Algorithms Level 1' },
  { title: 'C++ Level 1' },
  { title: 'Advanced Solutions for Algorithms Level 1' },
].map((course, i) => ({ number: i + 1, title: course.title }))

const courseCertificates = [
  ...earlyCourses,
  ...courseTitles.map((title, i) => {
    const number = i + 5
    return { number, title, pdf: `/certificates/course-${number}.pdf` }
  }),
]

const EN_DESCRIPTION = 'I followed a structured programming learning path on Programming Advices, a platform run by programmer Mohammed Abu-Hadhoud, who has more than 30 years of experience. I started from the fundamentals and progressed step by step. I solved each task on my own first, then compared my solution with the solutions provided on the platform to learn better ways of thinking and implementing. So far, I have completed 18 courses and applied what I learned in practice. The most important things I learned were object-oriented programming in C++, which I applied in the Bank Management System project, and data structures, which I built from scratch in the Data Structures in C++ project. I also learned C# and databases using SQL and SQL Server, and applied them in three projects: ContactHub, ContactsDesktop, and ContactsManager. I am still continuing my learning on the platform.'

const TR_DESCRIPTION = 'Programming Advices platformunda, 30 yılı aşkın deneyime sahip programcı Mohammed Abu-Hadhoud tarafından sunulan yapılandırılmış bir programlama eğitim yolunu takip ettim. Temellerden başlayarak adım adım ilerledim; her görevi önce kendi başıma çözdüm, ardından daha iyi düşünme ve uygulama yollarını öğrenmek için çözümümü platformda sunulan çözümlerle karşılaştırdım. Şu ana kadar 18 kursu tamamladım ve öğrendiklerimi uygulamaya döktüm. Öğrendiğim en önemli konular arasında, Bankacılık Yönetim Sistemi projesinde uyguladığım C++ ile nesne yönelimli programlama ve C++ ile Veri Yapıları projesinde sıfırdan geliştirdiğim veri yapıları yer alıyor. Ayrıca C# dilini ve SQL ile SQL Server kullanarak veritabanlarını öğrendim; bunları Kişi Merkezi, Kişiler - Masaüstü ve Kişi Yöneticisi olmak üzere üç projede uyguladım. Platformda öğrenmeye devam ediyorum.'

const AR_DESCRIPTION = () => (
  <>
    تابعتُ مسارًا تعليميًا منظمًا في البرمجة على منصة{' '}
    <bdi dir="ltr">Programming Advices</bdi>
    {' '}، التي يقدّمها المبرمج محمد أبو هدهود صاحب الخبرة التي تتجاوز 30 عامًا. بدأتُ فيها من الأساسيات وتدرّجتُ خطوة بخطوة، وكنت أحلّ كل مهمة بنفسي أولًا، ثم أقارن حلّي بالحلول المطروحة في المنصة لأتعلّم طرقًا أفضل في التفكير والتنفيذ. أنهيتُ حتى الآن 18 كورسًا، وطبّقتُ ما تعلّمته فيها عمليًا. أهم الأمور التي تعلّمتها هي البرمجة كائنية التوجه بلغة{' '}
    <bdi dir="ltr">C++</bdi>
    {' '}وطبّقتها في مشروع نظام الإدارة المصرفية، وكذلك هياكل البيانات التي بنيتُها من الصفر في مشروع هياكل البيانات بلغة{' '}
    <bdi dir="ltr">C++</bdi>
    {' '}. كما تعلّمتُ لغة{' '}
    <bdi dir="ltr">C#</bdi>
    {' '}وقواعد البيانات باستخدام{' '}
    <bdi dir="ltr">SQL</bdi>
    {' '}و<bdi dir="ltr">SQL Server</bdi>
    {' '}، وطبّقتها في ثلاثة مشاريع هي مركز جهات الاتصال، وجهات الاتصال - سطح المكتب، ومدير جهات الاتصال. وما زلتُ مستمرًا في التعلّم على المنصة.
  </>
)

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

function CertificateCarousel({ certificates, viewCertificate, completed, courseLabel }) {
  const trackRef = useRef(null)
  const { language } = useLanguage()
  const [canScrollStart, setCanScrollStart] = useState(false)
  const [canScrollEnd, setCanScrollEnd]     = useState(false)

  const updateArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    const absLeft = Math.abs(scrollLeft)
    const maxScroll = scrollWidth - clientWidth
    setCanScrollStart(absLeft > 4)
    setCanScrollEnd(absLeft < maxScroll - 4)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const frame = requestAnimationFrame(updateArrows)
    track.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows, certificates])

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.training__cert')
    const amount = card ? card.getBoundingClientRect().width + 16 : track.clientWidth
    const isRtl = getComputedStyle(track).direction === 'rtl'
    track.scrollBy({ left: direction * amount * (isRtl ? -1 : 1), behavior: 'smooth' })
  }

  return (
    <div className="training__carousel">
      <button
        type="button"
        className="training__carousel-arrow training__carousel-arrow--start"
        style={{ visibility: canScrollStart ? 'visible' : 'hidden' }}
        aria-hidden={!canScrollStart}
        tabIndex={canScrollStart ? 0 : -1}
        onClick={() => scrollByCard(-1)}
        aria-label="Previous certificates"
      >
        <span className="training__carousel-arrow-icon training__carousel-arrow-icon--back"><ChevronIcon /></span>
      </button>

      <div className="training__carousel-track" ref={trackRef}>
        {certificates.map((cert) => {
          const numberLabel = `${courseLabel} ${cert.number}`
          return (
            <div className="training__cert" key={cert.number}>
              <div className="training__cert-head">
                <span className="training__cert-number">{numberLabel}</span>
              </div>
              <div className="training__cert-body">
                <p className="training__cert-title" dir="ltr">{cert.title}</p>
                {cert.pdf ? (
                  <a className="training__cert-link" href={cert.pdf} target="_blank" rel="noopener noreferrer">
                    {viewCertificate}
                  </a>
                ) : (
                  <span className="training__cert-status">
                    <CheckIcon />
                    {completed}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className="training__carousel-arrow training__carousel-arrow--end"
        style={{ visibility: canScrollEnd ? 'visible' : 'hidden' }}
        aria-hidden={!canScrollEnd}
        tabIndex={canScrollEnd ? 0 : -1}
        onClick={() => scrollByCard(1)}
        aria-label="Next certificates"
      >
        <span className="training__carousel-arrow-icon"><ChevronIcon /></span>
      </button>
    </div>
  )
}

function EducationCard({ entry, t }) {
  const description = typeof entry.description === 'function' ? entry.description() : entry.description
  return (
    <article className="training__card" style={{ '--entry-index': 0 }}>
      <div className="training__card-topline">
        <h3>{entry.title}</h3>
        {entry.platformUrl && (
          <a className="training__platform-link" href={entry.platformUrl} target="_blank" rel="noopener noreferrer">
            {t.common.visitPlatform}
          </a>
        )}
      </div>
      <p className="training__card-description">{description}</p>
      <h4 className="training__cert-heading">{t.common.certifications}</h4>
      <CertificateCarousel
        certificates={entry.certificates}
        viewCertificate={t.common.viewCertificate}
        completed={t.common.completed}
        courseLabel={t.common.course}
      />
      <p className="training__cert-note">{t.common.certNote}</p>
    </article>
  )
}

function Training() {
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
    }, { threshold: 0.12 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const entry = {
    title: 'Programming Advices',
    platformUrl: 'https://programmingadvices.com',
    description: language === 'ar' ? AR_DESCRIPTION : language === 'tr' ? TR_DESCRIPTION : EN_DESCRIPTION,
    certificates: courseCertificates,
  }

  return (
    <section ref={sectionRef} id="training" className={`training site-section site-section--divided ${isVisible ? 'training--visible' : ''}`} aria-labelledby="training-title">
      <div className="training__inner">
        <header className="training__header">
          <h2 id="training-title">{t.headings.training}</h2>
        </header>
        <EducationCard entry={entry} t={t} />
      </div>
    </section>
  )
}

export default Training
