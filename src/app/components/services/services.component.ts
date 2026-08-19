import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
  duration: string;
  category: 'development' | 'marketing' | 'seo' | 'consulting';
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="services" class="services-section section" #servicesSection>
      <div class="container">
         <div class="section-header" [class.animate]="isVisible()">
           <h2 class="section-title">{{ languageService.translate('services.title') }}</h2>
           <p class="section-subtitle">
             {{ languageService.translate('services.subtitle') }}
           </p>
         </div>

        <div class="services-content" [class.animate]="isVisible()">
          <!-- Internal GEO Links -->
          <div class="card" style="margin-bottom: 2rem;">
            <h3 class="section-title">روابط سريعة حسب المدينة</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.5rem;">
              <a [routerLink]="['/services/seo','cairo']" class="btn btn-outline">SEO في القاهرة</a>
              <a [routerLink]="['/services/web-development','riyadh']" class="btn btn-outline">برمجة مواقع في الرياض</a>
              <a [routerLink]="['/services/seo','dubai']" class="btn btn-outline">SEO في دبي</a>
              <a [routerLink]="['/services/marketing','jeddah']" class="btn btn-outline">تسويق إلكتروني في جدة</a>
              <a [routerLink]="['/services/ads','kuwait']" class="btn btn-outline">إعلانات ممولة في الكويت</a>
              <a [routerLink]="['/courses/angular','riyadh']" class="btn btn-outline">كورس Angular في الرياض</a>
              <a [routerLink]="['/courses/full-stack','cairo']" class="btn btn-outline">كورس Full Stack في القاهرة</a>
            </div>
          </div>
          <!-- Development Services -->
          <div class="services-category">
            <div class="category-header">
              <div class="category-icon">
                <i class="fas fa-code"></i>
              </div>
               <h3 class="category-title">{{ languageService.translate('services.development.title') }}</h3>
               <p class="category-description">{{ languageService.translate('services.development.subtitle') }}</p>
            </div>

            <div class="services-grid">
              <div
                *ngFor="let service of developmentServices; trackBy: trackByService"
                class="service-card"
                [style.animation-delay]="getAnimationDelay(service) + 'ms'"
              >
                <div class="service-icon">
                  <i [class]="service.icon"></i>
                </div>
                <div class="service-content">
                  <h4 class="service-title">{{ service.title }}</h4>
                  <p class="service-description">{{ service.description }}</p>
                  
                  <ul class="service-features">
                    <li *ngFor="let feature of service.features">
                      <i class="fas fa-check"></i>
                      {{ feature }}
                    </li>
                  </ul>
                  
                  <div class="service-details">
                    <div class="service-price">
                      <span class="price-label">{{ languageService.translate('services.price') }}</span>
                      <span class="price-value">{{ service.price }}</span>
                    </div>
                    <div class="service-duration">
                       <span class="duration-label">{{ languageService.translate('services.duration') }}</span>
                      <span class="duration-value">{{ service.duration }}</span>
                    </div>
                  </div>
                  
                  <a href="#contact" class="btn btn-primary" (click)="scrollToSection('contact', $event)">
                    <i class="fas fa-envelope"></i>
                     {{ languageService.translate('services.order') }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Marketing Services -->
          <div class="services-category">
            <div class="category-header">
              <div class="category-icon">
                <i class="fas fa-bullhorn"></i>
              </div>
               <h3 class="category-title">{{ languageService.translate('services.marketing.title') }}</h3>
               <p class="category-description">{{ languageService.translate('services.marketing.subtitle') }}</p>
            </div>

            <div class="services-grid">
              <div
                *ngFor="let service of marketingServices; trackBy: trackByService"
                class="service-card"
                [style.animation-delay]="getAnimationDelay(service) + 'ms'"
              >
                <div class="service-icon">
                  <i [class]="service.icon"></i>
                </div>
                <div class="service-content">
                  <h4 class="service-title">{{ service.title }}</h4>
                  <p class="service-description">{{ service.description }}</p>
                  
                  <ul class="service-features">
                    <li *ngFor="let feature of service.features">
                      <i class="fas fa-check"></i>
                      {{ feature }}
                    </li>
                  </ul>
                  
                  <div class="service-details">
                    <div class="service-price">
                      <span class="price-label">{{ languageService.translate('services.price') }}</span>
                      <span class="price-value">{{ service.price }}</span>
                    </div>
                    <div class="service-duration">
                       <span class="duration-label">{{ languageService.translate('services.duration') }}</span>
                      <span class="duration-value">{{ service.duration }}</span>
                    </div>
                  </div>
                  
                  <a href="#contact" class="btn btn-primary" (click)="scrollToSection('contact', $event)">
                    <i class="fas fa-envelope"></i>
                     {{ languageService.translate('services.order') }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- SEO Services -->
          <div class="services-category">
            <div class="category-header">
              <div class="category-icon">
                <i class="fas fa-search"></i>
              </div>
               <h3 class="category-title">{{ languageService.translate('services.seo.title') }}</h3>
               <p class="category-description">{{ languageService.translate('services.seo.subtitle') }}</p>
            </div>

            <div class="services-grid">
              <div
                *ngFor="let service of seoServices; trackBy: trackByService"
                class="service-card"
                [style.animation-delay]="getAnimationDelay(service) + 'ms'"
              >
                <div class="service-icon">
                  <i [class]="service.icon"></i>
                </div>
                <div class="service-content">
                  <h4 class="service-title">{{ service.title }}</h4>
                  <p class="service-description">{{ service.description }}</p>
                  
                  <ul class="service-features">
                    <li *ngFor="let feature of service.features">
                      <i class="fas fa-check"></i>
                      {{ feature }}
                    </li>
                  </ul>
                  
                  <div class="service-details">
                    <div class="service-price">
                      <span class="price-label">{{ languageService.translate('services.price') }}</span>
                      <span class="price-value">{{ service.price }}</span>
                    </div>
                    <div class="service-duration">
                       <span class="duration-label">{{ languageService.translate('services.duration') }}</span>
                      <span class="duration-value">{{ service.duration }}</span>
                    </div>
                  </div>
                  
                  <a href="#contact" class="btn btn-primary" (click)="scrollToSection('contact', $event)">
                    <i class="fas fa-envelope"></i>
                     {{ languageService.translate('services.order') }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Consulting Services -->
          <div class="services-category">
            <div class="category-header">
              <div class="category-icon">
                <i class="fas fa-lightbulb"></i>
              </div>
               <h3 class="category-title">{{ languageService.translate('services.consulting.title') }}</h3>
               <p class="category-description">{{ languageService.translate('services.consulting.subtitle') }}</p>
            </div>

            <div class="services-grid">
              <div
                *ngFor="let service of consultingServices; trackBy: trackByService"
                class="service-card"
                [style.animation-delay]="getAnimationDelay(service) + 'ms'"
              >
                <div class="service-icon">
                  <i [class]="service.icon"></i>
                </div>
                <div class="service-content">
                  <h4 class="service-title">{{ service.title }}</h4>
                  <p class="service-description">{{ service.description }}</p>
                  
                  <ul class="service-features">
                    <li *ngFor="let feature of service.features">
                      <i class="fas fa-check"></i>
                      {{ feature }}
                    </li>
                  </ul>
                  
                  <div class="service-details">
                    <div class="service-price">
                      <span class="price-label">{{ languageService.translate('services.price') }}</span>
                      <span class="price-value">{{ service.price }}</span>
                    </div>
                    <div class="service-duration">
                       <span class="duration-label">{{ languageService.translate('services.duration') }}</span>
                      <span class="duration-value">{{ service.duration }}</span>
                    </div>
                  </div>
                  
                  <a href="#contact" class="btn btn-primary" (click)="scrollToSection('contact', $event)">
                    <i class="fas fa-envelope"></i>
                     {{ languageService.translate('services.order') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
         <div class="services-cta">
           <div class="cta-content">
             <h3>{{ languageService.translate('services.cta.title') }}</h3>
             <p>{{ languageService.translate('services.cta.subtitle') }}</p>
             <a href="#contact" class="btn btn-primary btn-large" (click)="scrollToSection('contact', $event)">
               <i class="fas fa-phone"></i>
               {{ languageService.translate('services.cta.button') }}
             </a>
           </div>
         </div>
      </div>
    </section>
  `,
  styleUrls: ['services.component.scss']
})
export class ServicesComponent implements OnInit {
  @ViewChild('servicesSection', { static: true }) servicesSection!: ElementRef;

  protected readonly languageService = inject(LanguageService);
  protected readonly isVisible = signal(false);
  private observer!: IntersectionObserver;

  protected readonly developmentServices: Service[] = [
    {
      id: 'website-development',
      title: 'تطوير المواقع الإلكترونية',
      description: 'تطوير مواقع إلكترونية احترافية ومتجاوبة باستخدام أحدث التقنيات',
      icon: 'fas fa-laptop-code',
      features: [
        'تصميم متجاوب لجميع الأجهزة',
        'واجهة مستخدم عربية سهلة الاستخدام',
        'تحسين الأداء والسرعة',
        'أمان عالي وحماية البيانات',
        'دعم فني مستمر'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '2-4 أسابيع',
      category: 'development'
    },
    {
      id: 'ecommerce-development',
      title: 'تطوير المتاجر الإلكترونية',
      description: 'إنشاء متاجر إلكترونية متكاملة مع أنظمة الدفع وإدارة المخزون',
      icon: 'fas fa-shopping-cart',
      features: [
        'نظام دفع آمن ومتعدد الطرق',
        'إدارة المخزون والمنتجات',
        'لوحة تحكم متقدمة',
        'تقارير مبيعات شاملة',
        'تكامل مع شركات الشحن'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '4-6 أسابيع',
      category: 'development'
    },
    {
      id: 'web-applications',
      title: 'تطوير التطبيقات الويب',
      description: 'تطوير تطبيقات ويب متقدمة ومخصصة لاحتياجات عملك',
      icon: 'fas fa-cogs',
      features: [
        'تطبيقات مخصصة لاحتياجاتك',
        'قواعد بيانات متطورة',
        'واجهات برمجة API',
        'نظام إدارة المستخدمين',
        'تقارير وتحليلات متقدمة'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '6-8 أسابيع',
      category: 'development'
    }
  ];

  protected readonly marketingServices: Service[] = [
    {
      id: 'digital-marketing',
      title: 'التسويق الرقمي الشامل',
      description: 'استراتيجيات تسويقية متكاملة لزيادة مبيعاتك ووصولك للعملاء المستهدفين',
      icon: 'fas fa-bullhorn',
      features: [
        'إدارة وسائل التواصل الاجتماعي',
        'حملات إعلانية مستهدفة',
        'إنتاج محتوى تسويقي',
        'تحليل الأداء والنتائج',
        'زيادة المبيعات والتحويلات'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '3-6 أشهر',
      category: 'marketing'
    },
    {
      id: 'social-media-marketing',
      title: 'التسويق عبر وسائل التواصل الاجتماعي',
      description: 'إدارة محترفة لحساباتك على فيسبوك وإنستجرام وتويتر',
      icon: 'fab fa-facebook',
      features: [
        'إدارة يومية للحسابات',
        'إنشاء محتوى جذاب',
        'حملات إعلانية مستهدفة',
        'تفاعل مع المتابعين',
        'تقارير أداء مفصلة'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '3-12 شهر',
      category: 'marketing'
    },
    {
      id: 'content-marketing',
      title: 'التسويق بالمحتوى',
      description: 'إنشاء محتوى تسويقي جذاب ومفيد لجذب العملاء المحتملين',
      icon: 'fas fa-pen-fancy',
      features: [
        'كتابة مقالات تسويقية',
        'إنشاء فيديوهات تعليمية',
        'تصميم إنفوجرافيك',
        'إدارة المدونات',
        'تحسين المحتوى للبحث'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '3-12 شهر',
      category: 'marketing'
    }
  ];

  protected readonly seoServices: Service[] = [
    {
      id: 'seo-optimization',
      title: 'تحسين محركات البحث (SEO)',
      description: 'تحسين موقعك ليظهر في المقدمة في نتائج البحث على جوجل',
      icon: 'fas fa-search',
      features: [
        'تحليل الكلمات المفتاحية',
        'تحسين المحتوى والصفحات',
        'بناء الروابط الخلفية',
        'تحسين السرعة والأداء',
        'مراقبة النتائج والتقارير'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '6-12 شهر',
      category: 'seo'
    },
    {
      id: 'local-seo',
      title: 'SEO المحلي',
      description: 'تحسين موقعك للظهور في البحث المحلي في مدينتك أو منطقتك',
      icon: 'fas fa-map-marker-alt',
      features: [
        'تحسين Google My Business',
        'الكلمات المفتاحية المحلية',
        'المراجعات والتقييمات',
        'البيانات المنظمة المحلية',
        'تحسين الموقع للبحث المحلي'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '3-6 أشهر',
      category: 'seo'
    },
    {
      id: 'technical-seo',
      title: 'SEO التقني',
      description: 'تحسين الجوانب التقنية لموقعك لتحسين أدائه في محركات البحث',
      icon: 'fas fa-tools',
      features: [
        'تحسين سرعة الموقع',
        'إصلاح الأخطاء التقنية',
        'تحسين الروابط الداخلية',
        'تحسين الصور والوسائط',
        'تحسين الأمان والموثوقية'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '2-4 أسابيع',
      category: 'seo'
    }
  ];

  protected readonly consultingServices: Service[] = [
    {
      id: 'tech-consulting',
      title: 'الاستشارات التقنية',
      description: 'استشارات متخصصة لاختيار الحلول التقنية المناسبة لمشروعك',
      icon: 'fas fa-lightbulb',
      features: [
        'تحليل متطلبات المشروع',
        'اختيار التقنيات المناسبة',
        'تخطيط البنية التقنية',
        'تقدير التكاليف والوقت',
        'متابعة التنفيذ'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '1-3 أيام',
      category: 'consulting'
    },
    {
      id: 'digital-strategy',
      title: 'استراتيجية التحول الرقمي',
      description: 'وضع استراتيجية شاملة لتحويل عملك إلى العالم الرقمي',
      icon: 'fas fa-route',
      features: [
        'تحليل الوضع الحالي',
        'وضع خطة التحول الرقمي',
        'اختيار الحلول المناسبة',
        'تدريب الفريق',
        'متابعة التنفيذ'
      ],
      price: '  تواصل معي للحصول على عرض',
      duration: '2-4 أسابيع',
      category: 'consulting'
    },
    {
      id: 'performance-audit',
      title: 'مراجعة الأداء التقني',
      description: 'مراجعة شاملة لأداء موقعك أو تطبيقك وتقديم توصيات التحسين',
      icon: 'fas fa-chart-line',
      features: [
        'تحليل الأداء الحالي',
        'تحديد نقاط الضعف',
        'توصيات التحسين',
        'خطة التنفيذ',
        'متابعة النتائج'
      ],
        price: '  تواصل معي للحصول على عرض',
      duration: '1-2 أسبوع',
      category: 'consulting'
    }
  ];

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.isVisible.set(true);
            }
          });
        },
        { threshold: 0.3 }
      );

      this.observer.observe(this.servicesSection.nativeElement);
    }
  }

  protected trackByService(index: number, service: Service): string {
    return service.id;
  }

  protected getAnimationDelay(service: Service): number {
    const allServices = [...this.developmentServices, ...this.marketingServices, ...this.seoServices, ...this.consultingServices];
    const index = allServices.findIndex(s => s.id === service.id);
    return index * 100;
  }

  protected scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
