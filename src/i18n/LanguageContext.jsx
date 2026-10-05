/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const translations = {
  en: {
    nav: { home: 'Home', about: 'Core Skills', skills: 'Tech Stack', projects: 'Projects', training: 'Training', certificates: 'Certificates', language: 'Language', backToTop: 'Back to top' },
    hero: {
      name: 'Mohammed Ayman Habbash',
      uniName: 'Selçuk University',
      uniDept: 'Computer Engineering',
      uniLogoAlt: 'Selçuk University logo',
      description: 'Computer Engineering student at Selçuk University, with a strong specialization in C++, C#, and SQL. I have designed and built multiple structured software systems, including pharmacy management, point-of-sale, and banking applications, applying layered architecture and solid software design principles throughout the full development lifecycle.',
      profileName: 'Mohammed Ayman Habbash',
      role: 'Software Developer',
      tech: 'C++ | C# | SQL',
      github: 'View My GitHub',
    },
    skillsIntro: "Using these technologies, I've built multiple structured software systems, and continue to expand my skill set.",
    headings: { about: 'What My Development Experience Includes', skills: 'Technical Skills and Foundations', featured: 'Projects', other: 'Other Projects', education: 'Education', training: 'Training & Professional Development', achievements: 'Achievements & Certifications' },
    about: {
      intro: 'Using the skills and tools shown below, I build solid, well-organized software projects that are easy to maintain and extend. As I learn new skills, I continue to apply this same approach to keep improving the quality and efficiency of my projects.',
      showMore: 'Show More Skills',
      showLess: 'Show Less',
      cards: [
        { title: 'Layered Architecture', description: 'As part of my development experience, I structure code into three layers: Data Access, Business Logic, and Presentation. This makes project files easier to organize, simplifies maintenance later on, and makes it easier to trace and fix errors.', badges: ['Data Access', 'Business Logic', 'Presentation'] },
        { title: 'Object-Oriented Programming', description: 'Object-oriented programming is a core part of how I write code. I separate different entities by creating independent classes for each one, applying the principles of abstraction, encapsulation, and inheritance, and defining the appropriate access level for each property or method, whether public, private, or protected. I applied these concepts practically by building a banking management system in C++.', badges: ['Encapsulation', 'Inheritance', 'Abstraction'] },
        { title: 'Database Integration', description: 'As part of my experience with databases, I have worked with ADO.NET across multiple projects, always focusing on writing efficient queries, since query performance matters as much as the query itself. I also used Entity Framework in the POS / Inventory System project, drawing on my solid understanding of relational databases and object-oriented programming to work with it effectively.', badges: ['ADO.NET', 'Entity Framework'] },
        { title: 'Data Structures', description: 'Data structures are also an important part of my experience. I focus on choosing the right data type for each situation, and when needed, I build custom data types instead of relying only on ready-made ones. I applied this principle practically by building fundamental data structures from scratch in C++, including linked lists, dynamic arrays, stacks, and queues, among others.', badges: ['Custom Data Types', 'Memory Management', 'Algorithm Efficiency'] },
      ],
    },
    common: { viewRepository: 'View Repository', viewCertificate: 'View Certificate', course: 'Course', certificatesIntro: 'Certificates obtained for the completed courses within the structured programming and software development training path.', completed: 'Completed', upcoming: 'Upcoming', currentStudent: 'Current Student', currentlyPursuing: 'CURRENTLY PURSUING', showMoreProjects: 'Show More Projects', showLessProjects: 'Show Less', visitPlatform: 'Visit Platform', certifications: 'Certifications', certNote: 'Certificates are issued by the platform starting from Course 5.' },
    footer: { name: 'Mohammed Ayman Habbash', tagline: 'Software Developer. Computer Engineering student at Selçuk University.', copyright: (year) => `© ${year} Mohammed Ayman Habbash. All rights reserved.` },
  },
  tr: {
    nav: { home: 'Ana Sayfa', about: 'Temel Beceriler', skills: 'Teknolojiler', projects: 'Projeler', training: 'Eğitim', certificates: 'Sertifikalar', language: 'Dil', backToTop: 'Başa dön' },
    hero: {
      name: 'Muhammed Eymen Habbeş',
      uniName: 'Selçuk Üniversitesi',
      uniDept: 'Bilgisayar Mühendisliği',
      uniLogoAlt: 'Selçuk Üniversitesi logosu',
      description: "Selçuk Üniversitesi'nde Bilgisayar Mühendisliği öğrencisiyim ve C++, C# ve SQL alanlarında uzmanlaşıyorum. Eczane yönetimi, satış noktası ve bankacılık uygulamaları dahil olmak üzere birçok yapılandırılmış yazılım sistemi tasarlayıp geliştirdim; tüm geliştirme süreci boyunca katmanlı mimariyi ve sağlam yazılım tasarım ilkelerini uyguladım.",
      profileName: 'Muhammed Eymen Habbeş',
      role: 'Yazılım Geliştirici',
      tech: 'C++ | C# | SQL',
      github: 'GitHub Profilimi Görüntüle',
    },
    skillsIntro: 'Bu teknolojileri kullanarak birçok yapılandırılmış yazılım sistemi geliştirdim ve becerilerimi genişletmeye devam ediyorum.',
    headings: { about: 'Geliştirme Deneyimim Neleri Kapsıyor', skills: 'Teknik Beceriler ve Temeller', featured: 'Projeler', other: 'Diğer Projeler', education: 'Eğitim', training: 'Eğitim ve Mesleki Gelişim', achievements: 'Başarılar ve Sertifikalar' },
    about: {
      intro: 'Aşağıda gösterilen beceri ve araçları kullanarak, bakımı ve geliştirilmesi kolay, sağlam ve iyi düzenlenmiş yazılım projeleri oluşturuyorum. Yeni beceriler öğrendikçe, projelerimin kalitesini ve verimliliğini artırmak için aynı yaklaşımı uygulamaya devam ediyorum.',
      showMore: 'Daha Fazla Beceri Göster',
      showLess: 'Daha Az Göster',
      cards: [
        { title: 'Katmanlı Mimari', description: 'Geliştirme deneyimimin bir parçası olarak kodu üç katmana ayırıyorum: Veri Erişimi (Data Access), İş Mantığı (Business Logic) ve Sunum (Presentation). Bu sayede proje dosyaları daha düzenli olur, ilerideki bakım kolaylaşır ve hataları bulup düzeltmek daha kolay hale gelir.', badges: ['Veri Erişimi', 'İş Mantığı', 'Sunum'] },
        { title: 'Nesne Yönelimli Programlama', description: 'Nesne yönelimli programlama, kod yazma biçimimin temel bir parçasıdır. Farklı varlıkları, her biri için bağımsız sınıflar oluşturarak birbirinden ayırıyor; soyutlama, kapsülleme ve kalıtım ilkelerini uyguluyor ve her özellik ya da metot için public, private veya protected olmak üzere uygun erişim düzeyini belirliyorum. Bu kavramları, C++ ile bir bankacılık yönetim sistemi geliştirerek uygulamalı olarak kullandım.', badges: ['Kapsülleme', 'Kalıtım', 'Soyutlama'] },
        { title: 'Veritabanı Entegrasyonu', description: "Veritabanlarıyla ilgili deneyimim kapsamında birçok projede ADO.NET ile çalıştım ve her zaman verimli sorgular yazmaya özen gösterdim; çünkü sorgunun performansı, sorgunun kendisi kadar önemlidir. Ayrıca Stok ve Satış Noktası Sistemi projesinde Entity Framework'ü kullandım ve ilişkisel veritabanları ile nesne yönelimli programlama konusundaki sağlam bilgim sayesinde onunla etkili bir şekilde çalıştım.", badges: ['ADO.NET', 'Entity Framework'] },
        { title: 'Veri Yapıları', description: 'Veri yapıları da deneyimimin önemli bir parçasıdır. Her durum için doğru veri tipini seçmeye özen gösteriyor, gerektiğinde yalnızca hazır tiplere bağlı kalmak yerine özel veri tipleri oluşturuyorum. Bu ilkeyi, C++ ile bağlı listeler, dinamik diziler, yığınlar ve kuyruklar gibi temel veri yapılarını sıfırdan geliştirerek uygulamalı olarak hayata geçirdim.', badges: ['Özel Veri Tipleri', 'Bellek Yönetimi', 'Algoritma Verimliliği'] },
      ],
    },
    common: { viewRepository: 'Depoyu Görüntüle', viewCertificate: 'Sertifikayı Görüntüle', course: 'Kurs', certificatesIntro: 'Yapılandırılmış programlama ve yazılım geliştirme eğitim yolundaki tamamlanmış kurslar için alınan sertifikalar.', completed: 'Tamamlandı', upcoming: 'Yaklaşan', currentStudent: 'Mevcut Öğrenci', currentlyPursuing: 'HALEN DEVAM EDİYOR', showMoreProjects: 'Daha Fazla Proje Göster', showLessProjects: 'Daha Az Göster', visitPlatform: 'Platformu Ziyaret Et', certifications: 'Sertifikalar', certNote: "Platform, sertifikaları Kurs 5'ten itibaren vermektedir." },
    footer: { name: 'Muhammed Eymen Habbeş', tagline: 'Yazılım Geliştirici. Selçuk Üniversitesi Bilgisayar Mühendisliği öğrencisi.', copyright: (year) => `© ${year} Muhammed Eymen Habbeş. Tüm hakları saklıdır.` },
  },
  ar: {
    nav: { home: 'الرئيسية', about: 'المهارات الأساسية', skills: 'التقنيات والأدوات', projects: 'المشاريع', training: 'التدريب', certificates: 'الشهادات', language: 'اللغة', backToTop: 'العودة إلى الأعلى' },
    hero: {
      name: 'محمد أيمن هباش',
      uniName: 'جامعة سلجوق',
      uniDept: 'هندسة الحاسوب',
      uniLogoAlt: 'شعار جامعة سلجوق',
      description: 'طالب هندسة حاسوب في جامعة سلجوق، أتخصص في لغات C++ وC# وSQL. صمّمتُ وبنيتُ عدة أنظمة برمجية، منها نظام لإدارة الصيدليات ونقاط البيع والبنوك، مع تطبيق البنية متعددة الطبقات ومبادئ التصميم البرمجي السليم في جميع مراحل التطوير.',
      profileName: 'محمد أيمن هباش',
      role: 'مطوّر برمجيات',
      tech: 'C++ | C# | SQL',
      github: 'زيارة حسابي على GitHub',
    },
    skillsIntro: 'باستخدام هذه التقنيات، قمت ببناء العديد من الأنظمة البرمجية المنظمة، وما زلت أعمل على توسيع مجموعة مهاراتي.',
    headings: { about: 'ما تشمله خبرتي في التطوير', skills: 'المهارات والأسس التقنية', featured: 'المشاريع', other: 'مشاريع أخرى', education: 'التعليم', training: 'التدريب والتطوير المهني', achievements: 'الإنجازات والشهادات' },
    about: {
      intro: 'باستخدام المهارات والأدوات الموضحة أدناه، أبني مشاريع برمجية متينة ومنظمة يسهل صيانتها وتطويرها. ومع كل مهارة جديدة أتعلمها، أواصل تطبيق النهج نفسه لتحسين جودة مشاريعي وكفاءتها.',
      showMore: 'عرض المزيد من المهارات',
      showLess: 'عرض أقل',
      cards: [
        {
          title: 'البنية متعددة الطبقات',
          description: 'ضمن الخبرات التي اكتسبتها، أقوم بفصل بنية الكود إلى ثلاث طبقات: طبقة الوصول للبيانات (Data Access)، وطبقة منطق الأعمال (Business Logic)، وطبقة العرض (Presentation). بهذه الطريقة يصبح تنظيم ملفات المشروع أوضح، وتسهل صيانته لاحقًا مع سهولة أكبر في تتبع الأخطاء وإصلاحها.',
          badges: ['الوصول للبيانات', 'منطق الأعمال', 'العرض'],
        },
        {
          title: 'البرمجة كائنية التوجه',
          description: 'البرمجة كائنية التوجه جزء أساسي من أسلوبي في كتابة الكود. أقوم بفصل الكيانات المختلفة عن بعضها من خلال إنشاء كلاسات مستقلة لكل منها، مع تطبيق مبادئ التجريد والتغليف والوراثة، وتحديد مستوى الوصول المناسب لكل خاصية أو دالة، سواء كان عامًا أو خاصًا أو محميًا. طبّقت هذه المفاهيم عمليًا من خلال بناء نظام إدارة العمليات البنكية بلغة C++.',
          badges: ['التغليف', 'الوراثة', 'التجريد'],
        },
        {
          title: 'التكامل مع قواعد البيانات',
          description: 'في إطار خبرتي مع قواعد البيانات، تعاملت مع ADO.NET في عدة مشاريع، وحرصت دائمًا على كتابة الاستعلامات بطريقة فعالة، لأن كفاءة الاستعلام لا تقل أهمية عن الاستعلام نفسه. كما استخدمت Entity Framework في مشروع نظام المخزون ونقاط البيع، مستفيدًا من فهمي الجيد لقواعد البيانات العلائقية والبرمجة الكائنية في التعامل معها بسهولة.',
          badges: ['ADO.NET', 'Entity Framework'],
        },
        {
          title: 'هياكل البيانات',
          description: 'تُعد هياكل البيانات جزءًا مهمًا من خبرتي أيضًا، حيث أحرص على اختيار أنواع البيانات المناسبة لكل حالة، وعند الحاجة أقوم ببناء أنواع بيانات مخصصة بدل الاقتصار على الأنواع الجاهزة فقط. طبّقت هذا المبدأ عمليًا من خلال بناء هياكل بيانات أساسية من الصفر بلغة C++، مثل القوائم المترابطة والمصفوفات الديناميكية والمكدسات وطوابير الانتظار.',
          badges: ['أنواع بيانات مخصصة', 'إدارة الذاكرة', 'كفاءة الخوارزميات'],
        },
      ],
    },
    common: { viewRepository: 'عرض المستودع', viewCertificate: 'عرض الشهادة', course: 'الكورس', certificatesIntro: 'شهادات تم الحصول عليها للدورات المكتملة ضمن مسار التدريب المنهجي في البرمجة وتطوير البرمجيات.', completed: 'مكتمل', upcoming: 'قادم', currentStudent: 'طالب حالي', currentlyPursuing: 'أدرس حاليًا', showMoreProjects: 'عرض المزيد من المشاريع', showLessProjects: 'عرض أقل', visitPlatform: 'زيارة المنصة', certifications: 'الشهادات', certNote: 'تُصدر المنصة الشهادات ابتداءً من الكورس 5.' },
    footer: { name: 'محمد أيمن هباش', tagline: 'مطوّر برمجيات. طالب هندسة حاسوب في جامعة سلجوق.', copyright: (year) => `© ${year} محمد أيمن هباش. جميع الحقوق محفوظة.` },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') || 'en')

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
