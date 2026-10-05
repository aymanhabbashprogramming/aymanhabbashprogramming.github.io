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
    description: 'An inventory and point of sale management system focused on tracking product movement, where every sale or purchase is linked to its own invoice. The system also manages supplier, customer, and user data within a single integrated structure.',
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
  ar: toLocalized(projects),  // individual cards override this below
}

const localizedMoreProjects = {
  en: toLocalized(moreProjects),
  tr: toLocalized(moreProjects),
  ar: toLocalized(moreProjects),
}

// Turkish card overrides — keyed by index in the `projects` array.
// Only title and description differ; badges stay English (same as base).
const trProjectOverrides = {
  0: {
    title: 'Eczane Yönetim Sistemi',
    description: 'Kullanıcıları, tedarikçileri ve hasta kayıtlarını yöneten bir eczane yönetim sistemi; her hastanın aldığı ilaçların özel bir arşiv üzerinden takip edilmesini sağlar. Sistem ayrıca ilaçların dağıtımını ve satışını partiler halinde yönetir, son kullanma tarihi en yakın olan ilaçların satışına öncelik verir ve satış ile alış faturaları düzenler.',
  },
  1: {
    title: 'Stok ve Satış Noktası Sistemi',
    description: 'Ürün hareketlerinin takibine odaklanan bir stok ve satış noktası yönetim sistemi; her satış veya alış işlemi kendine ait bir faturaya bağlanır. Sistem ayrıca tedarikçi, müşteri ve kullanıcı verilerini tek ve bütünleşik bir yapı içinde yönetir.',
  },
  2: {
    title: 'Bankacılık Yönetim Sistemi',
    description: 'Kapsamlı bir yetkilendirme sistemiyle çalışan bir bankacılık yönetim sistemi; her kullanıcının izin verilen işlemleri, müşteri yönetimi, transferler, kullanıcı yönetimi ve giriş kayıtları dahil olmak üzere sistem genelinde tanımlanır. Sistem, müşteri hesapları arasında para çekme, para yatırma ve transfer işlemlerini destekler; ayrıca döviz kurları ve doğrudan döviz çevirme işlemleri için özel bir ekran sunar.',
  },
  3: {
    title: 'C++ ile Veri Yapıları',
    description: 'Çift yönlü bağlı listeler, dinamik diziler, kuyruklar ve yığınlar gibi temel veri yapılarını sıfırdan oluşturmayı içeren bir veri yapıları projesi; şablon (template) tabanlı bir yaklaşımla her veri tipiyle kullanılabilir hale getirilmiştir. Bu yapıları, yığın kullanan bir metin düzenleme geri al/yinele (undo/redo) sisteminde ve bilet veren ve hizmet verilen müşterileri takip eden gerçek bir sıra düzenini simüle eden başka bir sistemde uygulamalı olarak kullandım.',
  },
  4: {
    title: 'Kişiler - Masaüstü',
    description: 'WinForms arayüzüne sahip bir kişi yönetim sistemi; Kişi Merkezi projesinin iş mantığı ve veri erişim katmanlarını hiçbir kodu tekrarlamadan tamamen yeniden kullanır ve bu projedeki çalışmayı yalnızca sunum katmanıyla sınırlar. Bu proje, 3 katmanlı mimari içinde yeniden kullanılabilirlik ilkesinin pratik bir uygulamasını gösterir.',
  },
  5: {
    title: 'Görüntü İşleme Sistemi',
    description: 'Hazır kütüphanelere başvurmadan, doğrudan görüntünün piksel verileri üzerinde çalışarak 15 farklı işlemi elle uygulayan bir görüntü işleme uygulaması. Her işlemin sonucu, orijinal görüntü değiştirilmeden ayrı bir alanda gösterilir ve gerektiğinde değişiklikler geri alınabilir.',
  },
}

// Turkish card overrides for moreProjects — keyed by index in the `moreProjects` array.
const trMoreProjectOverrides = {
  0: {
    title: 'Kişi Merkezi',
    description: 'Ülkeleri ve kişileri yöneten; ekleme, güncelleme, silme ve arama işlemlerini destekleyen bir kişi yönetim sistemi. Proje, her işlemin sunum katmanından iş mantığı katmanına, ardından veritabanında çalışan veri erişim katmanına net bir şekilde aktığı 3 katmanlı mimariyi uygular. Proje genelinde verimli sorgular kullanıldı; örneğin bir kaydın varlığını doğrulamak için tüm kaydı getirmek yerine varlık kontrolü sorguları kullanıldı ve sorgu sonuçlarını düzenlemek ve işlemek için DataTable kullanıldı.',
  },
  1: {
    title: 'Kişi Yöneticisi',
    description: 'Veritabanına bağlı; oluşturma, okuma, güncelleme ve silme olmak üzere dört temel işlemi destekleyen bir kişi yönetim sistemi. Sistem; ada göre, ad ve ülkeye göre veya kısmi eşleşmeyle olmak üzere birden fazla şekilde aramayı destekler, ayrıca tek bir kişiyi ya da birden fazla kişiyi aynı anda silme imkânı sunar.',
  },
  2: {
    title: 'X-O Oyunu',
    description: 'WinForms arayüzüne sahip bir X-O (Tic-Tac-Toe) oyunu; oyun tahtası hazır butonlar yerine Graphics kullanılarak elle çizilir. Proje, her hücreyi bir bit olarak temsil eder ve olası tüm kombinasyonları tek tek kontrol etmek yerine, oyuncunun durumunu önceden tanımlanmış ikili desenlerle bitsel işlemler (bitwise operations) kullanarak karşılaştırır; böylece galibiyet veya beraberlik hızlı ve verimli bir şekilde tespit edilir.',
  },
  3: {
    title: 'Pizza Sipariş Uygulaması',
    description: 'WinForms arayüzüne sahip bir pizza sipariş uygulaması; boyut, malzeme ve hamur türü seçimiyle siparişin kişiselleştirilmesine olanak tanır ve her seçenek değiştiğinde toplam fiyat anında hesaplanır. Uygulama, onaydan önce siparişin tam bir özetini gösterir ve siparişi iptal etme ya da formu tamamen sıfırlama imkânı sunar.',
  },
}

// Arabic card overrides for moreProjects — keyed by index in the `moreProjects` array.
// title/description can be a plain string or a render function () => JSX (for mixed Arabic+English).
// badges are arrays of React nodes; English terms wrapped in <bdi dir="ltr">.
const arMoreProjectOverrides = {
  3: {
    title: 'تطبيق طلب البيتزا',
    description: () => <>تطبيق لطلب البيتزا بواجهة <bdi dir="ltr">WinForms</bdi>، يتيح تخصيص الطلب من خلال اختيار الحجم والإضافات ونوع العجينة، مع حساب السعر الإجمالي فورًا عند تغيير أي خيار. ويعرض التطبيق ملخصًا كاملًا للطلب قبل تأكيده، مع إمكانية إلغائه أو إعادة تعيين النموذج بالكامل.</>,
    badges: [
      <bdi dir="ltr" key="cs">C#</bdi>,
      <bdi dir="ltr" key="wf">Windows Forms</bdi>,
    ],
    isRtl: true,
  },
  2: {
    title: () => <>لعبة <bdi dir="ltr">X-O</bdi></>,
    description: () => <>لعبة إكس أو <bdi dir="ltr">(Tic-Tac-Toe)</bdi> بواجهة <bdi dir="ltr">WinForms</bdi>، تُرسم فيها لوحة اللعب يدويًا باستخدام <bdi dir="ltr">Graphics</bdi> بدل الاعتماد على أزرار جاهزة. ويمثّل المشروع كل خانة على شكل بت <bdi dir="ltr">(bit)</bdi>، ويقارن حالة اللاعب بأنماط ثنائية محددة مسبقًا باستخدام العمليات على مستوى البت <bdi dir="ltr">(Bitwise Operations)</bdi>، لاكتشاف الفوز أو التعادل بسرعة وكفاءة، بدل التحقق يدويًا من كل التركيبات الممكنة.</>,
    badges: [
      <bdi dir="ltr" key="cs">C#</bdi>,
      <bdi dir="ltr" key="wf">Windows Forms</bdi>,
      <bdi dir="ltr" key="gdi">Graphics (GDI+)</bdi>,
      <bdi dir="ltr" key="bw">Bitwise Operations</bdi>,
    ],
    isRtl: true,
  },
  1: {
    title: 'مدير جهات الاتصال',
    description: 'نظام لإدارة جهات الاتصال مرتبط بقاعدة بيانات، ويدعم العمليات الأساسية الأربع: الإنشاء، والقراءة، والتعديل، والحذف. ويتيح النظام البحث بعدة طرق، سواء بالاسم الأول، أو بالاسم الأول والدولة معًا، أو بالمطابقة الجزئية، إلى جانب إمكانية حذف جهة اتصال واحدة أو عدة جهات اتصال دفعة واحدة.',
    badges: [
      <bdi dir="ltr" key="cs">C#</bdi>,
      <bdi dir="ltr" key="ado">ADO.NET</bdi>,
      <bdi dir="ltr" key="sql">SQL Server</bdi>,
    ],
    isRtl: true,
  },
  0: {
    title: 'مركز جهات الاتصال',
    description: () => <>نظام لإدارة جهات الاتصال يدير بيانات الدول وجهات الاتصال، ويدعم عمليات الإضافة والتعديل والحذف والبحث. يطبّق المشروع البنية ثلاثية الطبقات، حيث تنتقل كل عملية بوضوح من طبقة العرض إلى طبقة منطق الأعمال، ثم إلى طبقة الوصول إلى البيانات التي تنفّذها على قاعدة البيانات. واستُخدمت استعلامات فعّالة في جميع أجزاء المشروع، مثل استعلامات التحقق من الوجود بدل جلب السجل كاملًا لمجرد التأكد من وجوده، إلى جانب استخدام <bdi dir="ltr">DataTable</bdi> لتنظيم نتائج الاستعلامات ومعالجتها.</>,
    badges: [
      <bdi dir="ltr" key="cs">C#</bdi>,
      <bdi dir="ltr" key="sql">SQL Server</bdi>,
      <bdi dir="ltr" key="ado">ADO.NET</bdi>,
      <bdi dir="ltr" key="arch">3-Layer Architecture</bdi>,
      <bdi dir="ltr" key="dt">DataTable</bdi>,
      <bdi dir="ltr" key="con">Console Application</bdi>,
    ],
    isRtl: true,
  },
}

// Arabic card overrides — keyed by index in the `projects` array.
// title/description can be a plain string or a render function () => JSX (for mixed Arabic+English).
// badges are arrays of React nodes; English terms wrapped in <bdi dir="ltr">.
const arProjectOverrides = {
  0: {
    title: 'نظام إدارة الصيدلية',
    description: 'نظام إدارة صيدليات يتيح إدارة المستخدمين والموردين وسجلات المرضى، ويتيح تتبع الأدوية التي يتلقاها كل مريض من خلال أرشيف مخصص. كما يُدير النظام صرف الأدوية وبيعها على دفعات، مع إعطاء الأولوية لبيع الأدوية الأقرب إلى تاريخ انتهاء صلاحيتها، بالإضافة إلى إصدار فواتير البيع والشراء.',
    badges: [
      <bdi dir="ltr" key="cs">C#</bdi>,
      <bdi dir="ltr" key="sql">SQL</bdi>,
      <bdi dir="ltr" key="net">.NET Framework</bdi>,
      <bdi dir="ltr" key="arch">3-Layer Architecture</bdi>,
    ],
    isRtl: true,
  },
  1: {
    title: 'نظام المخزون ونقاط البيع',
    description: 'نظام لإدارة المخزون ونقاط البيع يركّز على تتبع حركة المنتجات، حيث يرتبط كل عملية بيع أو شراء بفاتورتها الخاصة. يُدير النظام أيضًا بيانات الموردين والعملاء والمستخدمين ضمن هيكل متكامل واحد.',
    badges: [
      <bdi dir="ltr" key="cs">C#</bdi>,
      <bdi dir="ltr" key="sql">SQL Server</bdi>,
      <bdi dir="ltr" key="ef">Entity Framework</bdi>,
      <bdi dir="ltr" key="arch">3-Layer Architecture</bdi>,
    ],
    isRtl: true,
  },
  2: {
    title: 'نظام الإدارة المصرفية',
    description: 'نظام إدارة مصرفية يعمل بنظام صلاحيات شامل، حيث تُحدَّد العمليات المسموح بها لكل مستخدم على مستوى النظام، بما في ذلك إدارة العملاء، والتحويلات، وإدارة المستخدمين، وسجلات تسجيل الدخول. يدعم النظام عمليات السحب والإيداع والتحويلات بين حسابات العملاء، بالإضافة إلى شاشة مخصصة لأسعار صرف العملات وعمليات تحويل العملات المباشرة.',
    badges: [
      <bdi dir="ltr" key="cpp">C++</bdi>,
      <bdi dir="ltr" key="oop">OOP</bdi>,
      <bdi dir="ltr" key="sd">Software Design</bdi>,
    ],
    isRtl: true,
  },
  3: {
    title: () => <>هياكل البيانات بلغة <bdi dir="ltr">C++</bdi></>,
    description: () => <>مشروع في هياكل البيانات يتضمن بناء الهياكل الأساسية من الصفر، مثل القوائم المترابطة المزدوجة، والمصفوفات الديناميكية، وطوابير الانتظار، والمكدسات، باستخدام القوالب <bdi dir="ltr">(Templates)</bdi> لتصبح قابلة للاستخدام مع أي نوع من البيانات. وطبّقت هذه الهياكل عمليًا في نظام للتراجع والإعادة <bdi dir="ltr">(Undo/Redo)</bdi> لتحرير النصوص باستخدام المكدس، وفي نظام آخر يحاكي طابور انتظار واقعيًا يُصدر التذاكر ويتتبع العملاء الذين تمت خدمتهم.</>,
    badges: [
      <bdi dir="ltr" key="cpp">C++</bdi>,
      <bdi dir="ltr" key="ds">Data Structures</bdi>,
      <bdi dir="ltr" key="alg">Algorithms</bdi>,
      <bdi dir="ltr" key="tc">Template Classes</bdi>,
      <bdi dir="ltr" key="tf">Template Functions</bdi>,
    ],
    isRtl: true,
  },
  4: {
    title: 'جهات الاتصال - سطح المكتب',
    description: () => <>نظام لإدارة جهات الاتصال بواجهة <bdi dir="ltr">WinForms</bdi>، يعيد استخدام طبقتَي منطق الأعمال والوصول إلى البيانات من مشروع مركز جهات الاتصال بالكامل دون تكرار أي كود، بحيث يقتصر العمل في هذا المشروع على طبقة العرض فقط. ويُظهر هذا المشروع تطبيقًا عمليًا لمبدأ إعادة الاستخدام ضمن البنية ثلاثية الطبقات.</>,
    badges: [
      <bdi dir="ltr" key="cs">C#</bdi>,
      <bdi dir="ltr" key="wf">WinForms</bdi>,
      <bdi dir="ltr" key="arch">3-Layer Architecture</bdi>,
      <bdi dir="ltr" key="reuse">Code Reusability</bdi>,
    ],
    isRtl: true,
  },
  5: {
    title: 'نظام معالجة الصور',
    description: 'تطبيق لمعالجة الصور ينفّذ 15 عملية مختلفة يدويًا دون الاعتماد على مكتبات جاهزة، من خلال التعامل المباشر مع بيانات البكسلات في الصورة. وتُعرض نتيجة كل عملية في منطقة منفصلة دون تعديل الصورة الأصلية، مع إمكانية التراجع عن التغييرات عند الحاجة.',
    badges: [
      <bdi dir="ltr" key="cs">C#</bdi>,
      <bdi dir="ltr" key="wf">Windows Forms</bdi>,
      <bdi dir="ltr" key="net">.NET Framework</bdi>,
      <bdi dir="ltr" key="kt">Krypton Toolkit</bdi>,
      <bdi dir="ltr" key="plp">Pixel-Level Processing</bdi>,
    ],
    isRtl: true,
  },
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
  const cardDir = localized.isRtl ? 'rtl' : undefined
  const title = typeof localized.title === 'function' ? localized.title() : localized.title
  const description = typeof localized.description === 'function' ? localized.description() : localized.description
  return (
    <article className="featured-projects__card" style={{ '--project-index': index }} dir={cardDir}>
      <div className="featured-projects__card-head">
        <span className="site-icon-box featured-projects__card-icon" aria-hidden="true">{project.icon}</span>
        <h3>{title}</h3>
      </div>
      <div className="featured-projects__card-body">
        <ul className="site-badge-list" aria-label={`${project.title} technologies`}>
          {localized.badges.map((badge, i) => (
            <li className="site-badge" key={i}>{badge}</li>
          ))}
        </ul>
        <p>{description}</p>
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
          {items.map((project, index) => {
            const base = localizedProjects[language][index]
            const override = language === 'ar' ? arProjectOverrides[index] : language === 'tr' ? trProjectOverrides[index] : null
            const localized = override ? { ...base, ...override } : base
            return (
              <ProjectCard
                key={project.title}
                project={project}
                localized={localized}
                index={index}
                viewRepositoryLabel={t.common.viewRepository}
              />
            )
          })}
          {showMore && extraItems.map((project, index) => {
            const base = localizedMoreProjects[language][index]
            const override = language === 'ar' ? arMoreProjectOverrides[index] : language === 'tr' ? trMoreProjectOverrides[index] : null
            const localized = override ? { ...base, ...override } : base
            return (
              <ProjectCard
                key={project.title}
                project={project}
                localized={localized}
                index={items.length + index}
                viewRepositoryLabel={t.common.viewRepository}
              />
            )
          })}
        </div>

        {extraItems.length > 0 && (
          <div className="featured-projects__more">
            <button
              type="button"
              className="featured-projects__more-toggle"
              aria-expanded={showMore}
              aria-controls="featured-projects-grid"
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? t.common.showLessProjects : t.common.showMoreProjects}
              <span className={`featured-projects__more-chevron ${showMore ? 'featured-projects__more-chevron--up' : ''}`} aria-hidden="true">
                <ChevronIcon />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProjects
