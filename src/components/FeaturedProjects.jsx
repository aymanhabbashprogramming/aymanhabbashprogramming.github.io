import { useEffect, useRef, useState } from 'react'
import './FeaturedProjects.css'
import { useLanguage } from '../i18n/LanguageContext'

const projects = [
  {
    title: 'Pharmacy Management System',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/PharmacyManagementSystem' }],
    badges: ['C#', 'SQL', '.NET Framework', '3-Layer Architecture'],
    description: 'A structured pharmacy management system demonstrating practical experience in application development, database integration, and separation of Data Access, Business Logic, and Presentation layers.',
  },
  {
    title: 'POS / Inventory System',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/POS-InventorySystem' }],
    badges: ['C#', 'SQL Server', 'Entity Framework', '3-Layer Architecture'],
    description: 'A point-of-sale and inventory management system covering products, categories, customers, suppliers, purchasing, sales, inventory operations, and business logic.',
  },
  {
    title: 'Bank Management System',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/BankManagementSystem' }],
    badges: ['C++', 'OOP', 'Software Design'],
    description: 'A comprehensive banking system developed in C++, demonstrating object-oriented programming, classes, inheritance, data handling, and structured application design.',
  },
  {
    title: 'Data Structures in C++',
    repositories: [{ label: 'View Repository', url: 'https://github.com/aymanhabbashprogramming/Data-Structures-CPP' }],
    badges: ['C++', 'Data Structures', 'Algorithms', 'Pointers'],
    description: 'A C++ project implementing core data structures and algorithms from scratch, including linked lists, dynamic arrays, stacks, queues, and practical data-structure applications.',
  },
  {
    title: 'ContactHub + ContactsDesktop',
    repositories: [
      { label: 'ContactHub', url: 'https://github.com/aymanhabbashprogramming/ContactHub' },
      { label: 'ContactsDesktop', url: 'https://github.com/aymanhabbashprogramming/ContactsDesktop' },
    ],
    badges: ['C#', 'SQL Server', 'ADO.NET', '3-Layer Architecture', 'Code Reusability'],
    description: 'A two-project architecture demonstrating separation of Data Access, Business Logic, and Presentation layers. The existing Data Access and Business Logic layers were reused in a separate desktop application without rewriting the underlying code.',
  },
]

const localizedProjects = {
  en: projects.map(({ title, badges, description }) => ({ title, badges, description })),
  tr: [
    { title: 'Eczane Yönetim Sistemi', badges: ['C#', 'SQL', '.NET Framework', '3 Katmanlı Mimari'], description: 'Uygulama geliştirme, veritabanı entegrasyonu ve Veri Erişimi, İş Mantığı ile Sunum katmanlarının ayrılması konularında pratik deneyim gösteren yapılandırılmış bir eczane yönetim sistemi.' },
    { title: 'POS / Envanter Sistemi', badges: ['C#', 'SQL Server', 'Entity Framework', '3 Katmanlı Mimari'], description: 'Ürünler, kategoriler, müşteriler, tedarikçiler, satın alma, satış, envanter işlemleri ve iş mantığını kapsayan bir satış noktası ve envanter yönetim sistemi.' },
    { title: 'Banka Yönetim Sistemi', badges: ['C++', 'OOP', 'Yazılım Tasarımı'], description: 'Nesne yönelimli programlama, sınıflar, kalıtım, veri işleme ve yapılandırılmış uygulama tasarımını gösteren C++ ile geliştirilmiş kapsamlı bir bankacılık sistemi.' },
    { title: 'C++ ile Veri Yapıları', badges: ['C++', 'Veri Yapıları', 'Algoritmalar', 'İşaretçiler'], description: 'Bağlı listeler, dinamik diziler, yığınlar, kuyruklar ve pratik veri yapısı uygulamaları dahil temel veri yapıları ile algoritmaları sıfırdan uygulayan bir C++ projesi.' },
    { title: 'ContactHub + ContactsDesktop', badges: ['C#', 'SQL Server', 'ADO.NET', '3 Katmanlı Mimari', 'Kodun Yeniden Kullanımı'], description: 'Veri Erişimi, İş Mantığı ve Sunum katmanlarının ayrımını gösteren iki projeli mimari. Mevcut Veri Erişimi ve İş Mantığı katmanları, temel kod yeniden yazılmadan ayrı bir masaüstü uygulamasında yeniden kullanılmıştır.' },
  ],
  ar: [
    { title: 'نظام إدارة الصيدلية', badges: ['C#', 'SQL', '.NET Framework', 'معمارية ثلاثية الطبقات'], description: 'نظام منظم لإدارة الصيدلية يوضح خبرة عملية في تطوير التطبيقات وتكامل قواعد البيانات وفصل طبقات الوصول إلى البيانات ومنطق الأعمال وواجهة العرض.' },
    { title: 'نظام نقاط البيع والمخزون', badges: ['C#', 'SQL Server', 'Entity Framework', 'معمارية ثلاثية الطبقات'], description: 'نظام لنقاط البيع وإدارة المخزون يغطي المنتجات والفئات والعملاء والموردين والمشتريات والمبيعات وعمليات المخزون ومنطق الأعمال.' },
    { title: 'نظام إدارة البنك', badges: ['C++', 'البرمجة كائنية التوجه', 'تصميم البرمجيات'], description: 'نظام مصرفي شامل طُوّر باستخدام C++، يوضح البرمجة كائنية التوجه والفئات والوراثة ومعالجة البيانات وتصميم التطبيقات المنظم.' },
    { title: 'هياكل البيانات في C++', badges: ['C++', 'هياكل البيانات', 'الخوارزميات', 'المؤشرات'], description: 'مشروع C++ ينفذ هياكل البيانات والخوارزميات الأساسية من الصفر، بما فيها القوائم المرتبطة والمصفوفات الديناميكية والمكدسات والطوابير وتطبيقات عملية لهياكل البيانات.' },
    { title: 'ContactHub + ContactsDesktop', badges: ['C#', 'SQL Server', 'ADO.NET', 'معمارية ثلاثية الطبقات', 'إعادة استخدام الكود'], description: 'معمارية من مشروعين توضح فصل طبقات الوصول إلى البيانات ومنطق الأعمال وواجهة العرض. أُعيد استخدام طبقتي الوصول إلى البيانات ومنطق الأعمال الموجودتين في تطبيق سطح مكتب منفصل دون إعادة كتابة الكود الأساسي.' },
  ],
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.2.65-.46v-1.78c-2.65.57-3.21-1.13-3.21-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.47 2.25 1.05 2.8.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.61.98A9.1 9.1 0 0 1 12 7.2c.81 0 1.63.11 2.39.32 1.82-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.1 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.47-4.37 4.71.34.3.65.87.65 1.75v2.6c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  )
}

function FeaturedProjects({ items = projects }) {
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
    }, { threshold: 0.08 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className={`featured-projects ${isVisible ? 'featured-projects--visible' : ''}`} aria-labelledby="featured-projects-title">
      <div className="featured-projects__inner">
        <header className="featured-projects__header">
          <span className="featured-projects__index" aria-hidden="true">03</span>
          <h2 id="featured-projects-title">{t.headings.featured}<span>.</span></h2>
        </header>

        <div className="featured-projects__timeline">
          {items.map((project, index) => {
            const localized = localizedProjects[language][index]
            return (
            <article className={`featured-projects__item featured-projects__item--${index % 2 === 0 ? 'left' : 'right'}`} style={{ '--project-index': index }} key={project.title}>
              <span className="featured-projects__node" aria-hidden="true" />
              <div className="featured-projects__card">
                <span className="featured-projects__number" aria-hidden="true">0{index + 1}</span>
                <h3>{localized.title}</h3>
                <ul className="featured-projects__badges" aria-label={`${localized.title} technologies`}>
                  {localized.badges.map((badge) => <li key={badge}>{badge}</li>)}
                </ul>
                <p>{localized.description}</p>
                <div className="featured-projects__repositories">
                  {project.repositories.map((repository) => (
                    <a href={repository.url} target="_blank" rel="noopener noreferrer" key={repository.url}>
                      <GitHubIcon /> {repository.label === 'View Repository' ? t.common.viewRepository : repository.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
