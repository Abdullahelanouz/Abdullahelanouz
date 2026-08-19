import { Injectable, signal } from '@angular/core';

export interface Language {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly languages: Language[] = [
    { code: 'en', name: 'English', direction: 'ltr' },
    { code: 'ar', name: 'العربية', direction: 'rtl' }
  ];

  private readonly currentLanguage = signal<Language>(this.languages[0]);

  constructor() {
    // Load saved language from localStorage or default to English
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('portfolio-language');
      if (savedLang) {
        const lang = this.languages.find(l => l.code === savedLang);
        if (lang) {
          this.currentLanguage.set(lang);
        }
      }
    }
    this.updateDocumentDirection();
  }

  get language() {
    return this.currentLanguage.asReadonly();
  }

  get availableLanguages() {
    return this.languages;
  }

  switchLanguage(languageCode: string) {
    const language = this.languages.find(l => l.code === languageCode);
    if (language) {
      this.currentLanguage.set(language);
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('portfolio-language', languageCode);
      }
      this.updateDocumentDirection();
    }
  }

  private updateDocumentDirection() {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      html.dir = this.currentLanguage().direction;
      html.lang = this.currentLanguage().code;
    }
  }

  // Translation method - for now we'll use a simple object-based approach
  translate(key: string): string {
    const translations = this.getTranslations();
    return translations[key] || key;
  }

  private getTranslations(): Record<string, string> {
    const currentLang = this.currentLanguage().code;

    if (currentLang === 'ar') {
      return {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.about': 'نبذة عني',
        'nav.skills': 'مهاراتي',
        'nav.projects': 'المشاريع',
        'nav.services': 'الخدمات',
        'nav.teaching': 'التدريس',
        'nav.blog': 'المدونة',
        'nav.contact': 'تواصل معي',

        // Hero Section
        'hero.title': 'عبدالله العنوز',
        'hero.subtitle': 'مطور ويب متكامل',
        'hero.description': 'أقوم ببناء حلول ويب متكاملة وقوية، بخبرة تزيد عن 5 سنوات في تحويل الأفكار إلى واقع رقمي.',
        'hero.viewWork': 'مشاهدة أعمالي',
        'hero.contact': 'تواصل معي',

        // About Section
        'about.title': 'نبذة عني',
        'about.subtitle': 'تعرف علي أكثر',
        'about.description': 'مطور ويب متكامل شغوف بإنشاء تطبيقات ويب فعالة وقابلة للتطوير. أمتلك خبرة واسعة في تطوير الواجهات الأمامية (Frontend) باستخدام Angular والواجهات الخلفية (Backend) باستخدام Node.js و PHP. خبرتي تمتد لتشمل التسويق الإلكتروني واستراتيجيات تحسين محركات البحث (SEO) لتحقق أفضل ظهور لمواقع العملاء في السوق الرقمي المصري والخليجي، مع شغف دائم لتعلم الجديد وتطبيق أفضل الممارسات لضمان نتائج عملية ممتازة.',
        'about.experience': '5+ سنوات خبرة',
        'about.experienceDesc': 'بناء تطبيقات الويب بالتقنيات الحديثة',
        'about.projects': '50+ مشروع مكتمل',
        'about.projectsDesc': 'من المواقع الصغيرة إلى التطبيقات واسعة النطاق',
        'about.clients': 'عملاء راضون',
        'about.clientsDesc': 'تقديم حلول عالية الجودة تفوق التوقعات',
        'about.yearsExp': 'سنوات خبرة',
        'about.projectsCount': 'مشروع مكتمل',
        'about.satisfaction': '% رضا العملاء',
        'about.technologies': 'تقنية متقنة',
        'about.getInTouch': 'تواصل معي',
        'about.downloadCV': 'تحميل السيرة الذاتية',
        'about.watchVideo': 'شاهد قصتي',

        // Skills Section
        'skills.title': 'مهاراتي',
        'skills.subtitle': 'التقنيات والأدوات التي أعمل بها',
        'skills.frontend': 'تطوير الواجهات الأمامية',
        'skills.backend': 'تطوير الواجهات الخلفية',
        'skills.tools': 'الأدوات والمنهجيات',

        // Projects Section
        'projects.title': 'مشاريعي',
        'projects.subtitle': 'بعض من أعمالي الحديثة',
        'projects.liveDemo': 'معاينة مباشرة',
        'projects.github': 'GitHub',
        'projects.moreProjects': 'والمزيد من المشاريع قيد التنفيذ...',
        'projects.moreProjectsDesc': 'المزيد من المشاريع المثيرة قيد التطوير حاليًا',
        'projects.discussProject': 'ناقش مشروعك',
        'projects.ruknDescription': 'موقع إلكتروني تجاري متكامل لبيع المنتجات، مع لوحة تحكم لإدارة المحتوى والمخزون.',
        'projects.syntaxDescription': 'منصة تعليمية تقدم دورات في مجال البرمجة، مع نظام لإدارة المستخدمين والمحتوى التعليمي.',
        'projects.techDescription': 'متجر إلكتروني متخصص في بيع الأجهزة التقنية، مصمم بواجهات عصرية وسريعة الاستجابة.',

        // Teaching Section
        'teaching.title': 'التدريس',
        'teaching.subtitle': 'مشاركة المعرفة من خلال دورات البرمجة الشاملة',
        'teaching.description': 'أقدم دورات تدريبية في مجال البرمجة وتطوير الويب',
        'teaching.students': 'طالب تم تدريسهم',
        'teaching.courses': 'دورة تم إنشاؤها',
        'teaching.rating': 'متوسط التقييم',
        'teaching.hours': 'ساعة محتوى',
        'teaching.level.beginner': 'مبتدئ',
        'teaching.level.intermediate': 'متوسط',
        'teaching.level.advanced': 'متقدم',
        'teaching.preview': 'معاينة الدورة',
        'teaching.studentsCount': 'طالب',
        'teaching.enroll': 'سجل الآن',
        'teaching.philosophy': 'فلسفتي في التدريس',
        'teaching.philosophyText': 'أؤمن بالتعلم العملي من خلال المشاريع الحقيقية. دوراتي تركز على المهارات العملية التي يمكنك تطبيقها فورًا في مسيرتك المهنية.',
        'teaching.practical': 'مشاريع عملية',
        'teaching.support': 'دعم 24/7',
        'teaching.certificate': 'شهادات',
        'teaching.lifetime': 'وصول مدى الحياة',
        'teaching.ctaTitle': 'مستعد لبدء التعلم؟',
        'teaching.ctaText': 'انضم إلى آلاف الطلاب الذين غيروا مسيرتهم المهنية مع دوراتي.',
        'teaching.visitPlatform': 'زيارة منصة التعلم',
        'teaching.customCourse': 'طلب دورة مخصصة',
        'teaching.courses.angular': 'تطوير Angular الشامل',
        'teaching.courses.angularDesc': 'إتقان Angular من الأساسيات إلى المفاهيم المتقدمة مع مشاريع حقيقية.',
        'teaching.courses.nodejs': 'تطوير الخادم بـ Node.js',
        'teaching.courses.nodejsDesc': 'بناء تطبيقات خادم قابلة للتطوير باستخدام Node.js و Express.',
        'teaching.courses.fullstack': 'تطوير الويب الشامل',
        'teaching.courses.fullstackDesc': 'دورة تطوير الويب الشاملة تغطي الواجهة الأمامية والخلفية.',

        // Blog Section
        'blog.title': 'المدونة',
        'blog.subtitle': 'رؤى ودروس وأفكار حول تطوير الويب',
        'blog.description': 'مقالات ونصائح في عالم البرمجة وتطوير الويب',
        'blog.featured': 'مميز',
        'blog.minRead': 'دقيقة قراءة',
        'blog.readMore': 'اقرأ المزيد',
        'blog.read': 'اقرأ',
        'blog.category.all': 'الكل',
        'blog.category.angular': 'Angular',
        'blog.category.nodejs': 'Node.js',
        'blog.category.javascript': 'JavaScript',
        'blog.category.tutorials': 'دروس',
        'blog.category.tips': 'نصائح',
        'blog.ctaTitle': 'تريد البقاء محدثًا؟',
        'blog.ctaText': 'اشترك للحصول على أحدث المقالات والدروس في صندوق الوارد الخاص بك.',
        'blog.emailPlaceholder': 'أدخل بريدك الإلكتروني',
        'blog.subscribe': 'اشترك',
        'blog.subscribeSuccess': 'تم الاشتراك بنجاح!',
        'blog.invalidEmail': 'يرجى إدخال عنوان بريد إلكتروني صحيح.',
        'blog.posts.angular.title': 'أفضل ممارسات Angular لعام 2024',
        'blog.posts.angular.excerpt': 'تعلم أحدث أفضل الممارسات والأنماط في Angular لبناء تطبيقات قابلة للتطوير.',
        'blog.posts.nodejs.title': 'تحسين أداء Node.js',
        'blog.posts.nodejs.excerpt': 'نصائح وتقنيات لتحسين أداء تطبيقات Node.js الخاصة بك.',
        'blog.posts.javascript.title': 'ميزات JavaScript ES2024 الجديدة',
        'blog.posts.javascript.excerpt': 'استكشف أحدث ميزات JavaScript وكيفية استخدامها في مشاريعك.',
        'blog.posts.trends.title': 'اتجاهات تطوير الويب 2024',
        'blog.posts.trends.excerpt': 'أحدث الاتجاهات والتقنيات التي تشكل تطوير الويب في 2024.',

        // Contact Section
        'contact.title': 'تواصل معي',
        'contact.subtitle': 'أنا متاح حاليًا لفرص عمل جديدة. لا تتردد في التواصل معي.',
        'contact.introTitle': 'دعنا نعمل معًا',
        'contact.introText': 'أنا مهتم دائمًا بالفرص الجديدة والمشاريع المثيرة. سواء كان لديك سؤال أو تريد فقط أن تقول مرحبًا، سأبذل قصارى جهدي للرد عليك!',
        'contact.name': 'الاسم',
        'contact.email': 'البريد الإلكتروني',
        'contact.phone': 'الهاتف',
        'contact.location': 'الموقع',
        'contact.locationText': 'مصر',
        'contact.followMe': 'تابعني',
        'contact.message': 'الرسالة',
        'contact.send': 'إرسال',
        'contact.sending': 'جاري الإرسال...',
        'contact.namePlaceholder': 'اسمك الكامل',
        'contact.emailPlaceholder': 'your.email@example.com',
        'contact.messagePlaceholder': 'أخبرني عن مشروعك أو قل مرحبًا فقط...',
        'contact.nameRequired': 'الاسم مطلوب',
        'contact.emailRequired': 'البريد الإلكتروني مطلوب',
        'contact.emailInvalid': 'يرجى إدخال بريد إلكتروني صحيح',
        'contact.messageRequired': 'الرسالة مطلوبة',
        'contact.successTitle': 'تم إرسال الرسالة!',
        'contact.successMessage': 'شكرًا لك على رسالتك. سأعود إليك قريبًا!',

        // Footer
        'footer.copyright': '© 2025 عبدالله العنوز. تم البناء باستخدام Angular.',
        'footer.navigation': 'التنقل',
        'footer.services': 'الخدمات',
        'footer.connect': 'تواصل',
        'footer.madeWith': 'صُنع بـ',
        'footer.in': 'في',

        // Theme
        'theme.light': 'الوضع المضيء',
        'theme.dark': 'الوضع المظلم',

        // Floating Buttons
        'floating.whatsapp': 'تواصل عبر واتساب',
        'floating.whatsappTooltip': 'دردشة على واتساب',
        'floating.scrollTop': 'العودة للأعلى',
        'floating.scrollTopTooltip': 'العودة للأعلى',

        // Services Section
        'services.title': 'خدماتي المتخصصة',
        'services.subtitle': 'حلول تقنية شاملة لتطوير أعمالك الرقمية في مصر والخليج العربي',
        'services.development.title': 'خدمات التطوير',
        'services.development.subtitle': 'تطوير مواقع وتطبيقات ويب متطورة باستخدام أحدث التقنيات',
        'services.marketing.title': 'خدمات التسويق الإلكتروني',
        'services.marketing.subtitle': 'استراتيجيات تسويقية متطورة لزيادة مبيعاتك ووصولك للعملاء المستهدفين',
        'services.seo.title': 'خدمات تحسين محركات البحث (SEO)',
        'services.seo.subtitle': 'تحسين موقعك ليظهر في المقدمة في نتائج البحث على جوجل',
        'services.consulting.title': 'خدمات الاستشارات التقنية',
        'services.consulting.subtitle': 'استشارات متخصصة لاختيار الحلول التقنية المناسبة لمشروعك',
        'services.cta.title': 'هل تبحث عن حل تقني مخصص لمشروعك؟',
        'services.cta.subtitle': 'تواصل معي الآن للحصول على استشارة مجانية وتحديد الحل المناسب لاحتياجاتك',
        'services.cta.button': 'تواصل معي الآن',
        'services.price': 'السعر:',
        'services.duration': 'المدة:',
        'services.order': 'اطلب الخدمة'
      };
    }

    // Default English translations
    return {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.services': 'Services',
      'nav.teaching': 'Teaching',
      'nav.blog': 'Blog',
      'nav.contact': 'Contact',

      // Hero Section
      'hero.title': 'Abdullah Elanouz',
      'hero.subtitle': 'Full Stack Developer',
      'hero.description': 'I build robust and integrated web solutions, with over 5 years of experience turning ideas into digital reality.',
      'hero.viewWork': 'View My Work',
      'hero.contact': 'Contact Me',

      // About Section
      'about.title': 'About Me',
      'about.subtitle': 'Get to know me better',
      'about.description': 'A passionate full-stack web developer focused on creating efficient and scalable web applications. I have extensive experience in frontend development with Angular and backend development with Node.js and PHP. My expertise also covers digital marketing and advanced search engine optimization (SEO) strategies, helping clients achieve superior online visibility and growth in Egyptian and Gulf markets. Constantly learning and applying top industry practices for proven, impactful results.',
      'about.experience': '5+ Years Experience',
      'about.experienceDesc': 'Building web applications with modern technologies',
      'about.projects': '50+ Projects Completed',
      'about.projectsDesc': 'From small websites to large-scale applications',
      'about.clients': 'Happy Clients',
      'about.clientsDesc': 'Delivering quality solutions that exceed expectations',
      'about.yearsExp': 'Years Experience',
      'about.projectsCount': 'Projects Completed',
      'about.satisfaction': '% Client Satisfaction',
      'about.technologies': 'Technologies Mastered',
      'about.getInTouch': 'Get In Touch',
      'about.downloadCV': 'Download CV',
      'about.watchVideo': 'Watch My Story',

      // Skills Section
      'skills.title': 'My Skills',
      'skills.subtitle': 'Technologies and tools I work with',
      'skills.frontend': 'Frontend Development',
      'skills.backend': 'Backend Development',
      'skills.tools': 'Tools & Methodologies',

      // Projects Section
      'projects.title': 'My Projects',
      'projects.subtitle': 'Some of my recent work',
      'projects.liveDemo': 'Live Demo',
      'projects.github': 'GitHub',
      'projects.moreProjects': 'And more projects in the works...',
      'projects.moreProjectsDesc': 'More exciting projects are currently in development',
      'projects.discussProject': 'Discuss Your Project',
      'projects.ruknDescription': 'A complete e-commerce website for selling products, with a dashboard for content and inventory management.',
      'projects.syntaxDescription': 'An educational platform offering programming courses, with a system for managing users and educational content.',
      'projects.techDescription': 'An e-commerce store specializing in tech gadgets, designed with modern and responsive interfaces.',

      // Teaching Section
      'teaching.title': 'Teaching',
      'teaching.subtitle': 'Sharing knowledge through comprehensive programming courses',
      'teaching.description': 'I offer training courses in programming and web development',
      'teaching.students': 'Students Taught',
      'teaching.courses': 'Courses Created',
      'teaching.rating': 'Average Rating',
      'teaching.hours': 'Hours of Content',
      'teaching.level.beginner': 'Beginner',
      'teaching.level.intermediate': 'Intermediate',
      'teaching.level.advanced': 'Advanced',
      'teaching.preview': 'Preview Course',
      'teaching.studentsCount': 'students',
      'teaching.enroll': 'Enroll Now',
      'teaching.philosophy': 'My Teaching Philosophy',
      'teaching.philosophyText': 'I believe in hands-on learning with real-world projects. My courses focus on practical skills that you can immediately apply in your career.',
      'teaching.practical': 'Practical Projects',
      'teaching.support': '24/7 Support',
      'teaching.certificate': 'Certificates',
      'teaching.lifetime': 'Lifetime Access',
      'teaching.ctaTitle': 'Ready to Start Learning?',
      'teaching.ctaText': 'Join thousands of students who have transformed their careers with my courses.',
      'teaching.visitPlatform': 'Visit Learning Platform',
      'teaching.customCourse': 'Request Custom Course',
      'teaching.courses.angular': 'Complete Angular Development',
      'teaching.courses.angularDesc': 'Master Angular from basics to advanced concepts with real-world projects.',
      'teaching.courses.nodejs': 'Node.js Backend Development',
      'teaching.courses.nodejsDesc': 'Build scalable backend applications with Node.js and Express.',
      'teaching.courses.fullstack': 'Full Stack Web Development',
      'teaching.courses.fullstackDesc': 'Complete full stack development course covering frontend and backend.',

      // Blog Section
      'blog.title': 'Blog',
      'blog.subtitle': 'Insights, tutorials, and thoughts on web development',
      'blog.description': 'Articles and tips in the world of programming and web development',
      'blog.featured': 'Featured',
      'blog.minRead': 'min read',
      'blog.readMore': 'Read More',
      'blog.read': 'Read',
      'blog.category.all': 'All',
      'blog.category.angular': 'Angular',
      'blog.category.nodejs': 'Node.js',
      'blog.category.javascript': 'JavaScript',
      'blog.category.tutorials': 'Tutorials',
      'blog.category.tips': 'Tips',
      'blog.ctaTitle': 'Want to stay updated?',
      'blog.ctaText': 'Subscribe to get the latest articles and tutorials delivered to your inbox.',
      'blog.emailPlaceholder': 'Enter your email',
      'blog.subscribe': 'Subscribe',
      'blog.subscribeSuccess': 'Successfully subscribed!',
      'blog.invalidEmail': 'Please enter a valid email address.',
      'blog.posts.angular.title': 'Angular Best Practices for 2024',
      'blog.posts.angular.excerpt': 'Learn the latest Angular best practices and patterns for building scalable applications.',
      'blog.posts.nodejs.title': 'Optimizing Node.js Performance',
      'blog.posts.nodejs.excerpt': 'Tips and techniques to improve your Node.js application performance.',
      'blog.posts.javascript.title': 'JavaScript ES2024 New Features',
      'blog.posts.javascript.excerpt': 'Explore the latest JavaScript features and how to use them in your projects.',
      'blog.posts.trends.title': 'Web Development Trends 2024',
      'blog.posts.trends.excerpt': 'The latest trends and technologies shaping web development in 2024.',

      // Contact Section
      'contact.title': 'Get In Touch',
      'contact.subtitle': 'I am currently available for new opportunities. Feel free to contact me.',
      'contact.introTitle': "Let's work together",
      'contact.introText': "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
      'contact.name': 'Your Name',
      'contact.email': 'Email',
      'contact.phone': 'Phone',
      'contact.location': 'Location',
      'contact.locationText': 'Egypt',
      'contact.followMe': 'Follow Me',
      'contact.message': 'Message',
      'contact.send': 'Send',
      'contact.sending': 'Sending...',
      'contact.namePlaceholder': 'Your full name',
      'contact.emailPlaceholder': 'your.email@example.com',
      'contact.messagePlaceholder': 'Tell me about your project or just say hello...',
      'contact.nameRequired': 'Name is required',
      'contact.emailRequired': 'Email is required',
      'contact.emailInvalid': 'Please enter a valid email',
      'contact.messageRequired': 'Message is required',
      'contact.successTitle': 'Message Sent!',
      'contact.successMessage': 'Thank you for your message. I will get back to you soon!',

      // Footer
      'footer.copyright': '© 2025 Abdullah Elanouz. Built with Angular.',
      'footer.navigation': 'Navigation',
      'footer.services': 'Services',
      'footer.connect': 'Connect',
      'footer.madeWith': 'Made with',
      'footer.in': 'in',

      // Theme
      'theme.light': 'Light Mode',
      'theme.dark': 'Dark Mode',

      // Floating Buttons
      'floating.whatsapp': 'Contact via WhatsApp',
      'floating.whatsappTooltip': 'Chat on WhatsApp',
      'floating.scrollTop': 'Scroll to top',
      'floating.scrollTopTooltip': 'Back to top',

      // Services Section
      'services.title': 'My Specialized Services',
      'services.subtitle': 'Comprehensive technical solutions to develop your digital business in Egypt and the Gulf',
      'services.development.title': 'Development Services',
      'services.development.subtitle': 'Developing modern websites and web applications using the latest technologies',
      'services.marketing.title': 'Digital Marketing Services',
      'services.marketing.subtitle': 'Advanced marketing strategies to increase your sales and reach your target customers',
      'services.seo.title': 'Search Engine Optimization (SEO) Services',
      'services.seo.subtitle': 'Optimize your website to appear at the top of Google search results',
      'services.consulting.title': 'Technical Consulting Services',
      'services.consulting.subtitle': 'Specialized consultations to choose the right technical solutions for your project',
      'services.cta.title': 'Looking for a custom technical solution for your project?',
      'services.cta.subtitle': 'Contact me now for a free consultation and to determine the right solution for your needs',
      'services.cta.button': 'Contact Me Now',
      'services.price': 'Price:',
      'services.duration': 'Duration:',
      'services.order': 'Order Service'
    };
  }
}
