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

const ReuseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
)

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const cardsData = [
  {
    id: 1,
    icon: <LayersIcon />,
    title: 'Layered Architecture',
    description: 'Structuring applications into separate layers — Data Access, Business Logic, and Presentation — to keep code organized, maintainable, and easy to extend over time.',
    accent: 'sky'
  },
  {
    id: 2,
    icon: <DatabaseIcon />,
    title: 'Database Integration',
    description: 'Building real, working connections between applications and databases (SQL Server), handling practical data operations rather than isolated queries.',
    accent: 'violet'
  },
  {
    id: 3,
    icon: <ReuseIcon />,
    title: 'Code Reusability',
    description: 'Designing Data Access and Business Logic layers that can be reused across different applications without rewriting the underlying code.',
    accent: 'sky'
  },
  {
    id: 4,
    icon: <CodeIcon />,
    title: 'Strong Programming Foundation',
    description: 'A solid base in object-oriented programming, data structures, and algorithms — built through C++ and applied practically through C#.',
    accent: 'violet'
  }
]

const localizedCards = {
  en: cardsData.map(({ title, description }) => ({ title, description })),
  tr: [
    { title: 'Katmanlı Mimari', description: 'Uygulamaları kodun düzenli, bakımı kolay ve zaman içinde genişletilebilir kalması için Veri Erişimi, İş Mantığı ve Sunum olmak üzere ayrı katmanlara ayırma yaklaşımı.' },
    { title: 'Veritabanı Entegrasyonu', description: 'Uygulamalar ile veritabanları (SQL Server) arasında gerçek ve çalışan bağlantılar kurmak; izole sorgular yerine pratik veri işlemlerini yönetmek.' },
    { title: 'Kodun Yeniden Kullanılabilirliği', description: 'Temel kodu yeniden yazmadan farklı uygulamalarda kullanılabilecek Veri Erişimi ve İş Mantığı katmanları tasarlamak.' },
    { title: 'Güçlü Programlama Temeli', description: 'C++ ile oluşturulan ve C# ile pratikte uygulanan nesne yönelimli programlama, veri yapıları ve algoritmalarda sağlam bir temel.' },
  ],
  ar: [
    { title: 'المعمارية الطبقية', description: 'تنظيم التطبيقات في طبقات منفصلة — الوصول إلى البيانات ومنطق الأعمال وواجهة العرض — للحفاظ على الكود منظمًا وقابلًا للصيانة والتوسع مع الوقت.' },
    { title: 'تكامل قواعد البيانات', description: 'بناء اتصالات حقيقية وعملية بين التطبيقات وقواعد البيانات (SQL Server)، مع التعامل مع عمليات البيانات العملية بدلًا من الاستعلامات المنعزلة.' },
    { title: 'إعادة استخدام الكود', description: 'تصميم طبقات الوصول إلى البيانات ومنطق الأعمال بحيث يمكن إعادة استخدامها في تطبيقات مختلفة دون إعادة كتابة الكود الأساسي.' },
    { title: 'أساس قوي في البرمجة', description: 'قاعدة متينة في البرمجة كائنية التوجه وهياكل البيانات والخوارزميات، بُنيت باستخدام C++ وطُبقت عمليًا عبر C#.' },
  ],
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
          <span className="about__index" aria-hidden="true">01</span>
          <h2 id="about-title">{t.headings.about}<span>.</span></h2>
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
              <div className="about__card-icon" aria-hidden="true">
                {card.icon}
              </div>
              <h3 className="about__card-title">{localized.title}</h3>
              <p className="about__card-description">{localized.description}</p>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutMe
