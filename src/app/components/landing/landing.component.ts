import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';

// Types matching the geo-keywords-ar.json structure (simplified)
interface KeywordBuckets {
  programming_services?: string[];
  programming_courses?: string[];
  digital_marketing?: string[];
  paid_ads?: string[];
}
interface Area {
  name: string;
  type: 'city' | 'region' | 'state';
  keywords: KeywordBuckets;
}
interface Region {
  name: string;
  type: 'country';
  areas: Area[];
}
interface GeoKeywords {
  regions: Region[];
  templates?: {
    long_tail?: string[];
    ad_headlines?: string[];
    ad_descriptions?: string[];
  }
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="landing section" *ngIf="ready()">
      <div class="container">
        <header class="landing-header">
          <h1 class="landing-title">{{ pageTitle() }}</h1>
          <p class="landing-subtitle">{{ pageSubtitle() }}</p>
        </header>

        <div class="landing-content">
          <div class="card" *ngIf="selectedKeywords() as kw">
            <h2 class="section-title">الكلمات المستهدفة في {{ cityArabic() }}</h2>

            <div class="grid">
              <div *ngIf="mode() === 'service' && kw.programming_services?.length">
                <h3>خدمات البرمجة</h3>
                <ul>
                  <li *ngFor="let k of kw.programming_services">{{ k }}</li>
                </ul>
              </div>

              <div *ngIf="mode() === 'service' && kw.digital_marketing?.length">
                <h3>التسويق الإلكتروني وSEO</h3>
                <ul>
                  <li *ngFor="let k of kw.digital_marketing">{{ k }}</li>
                </ul>
              </div>

              <div *ngIf="mode() === 'service' && kw.paid_ads?.length">
                <h3>الإعلانات الممولة</h3>
                <ul>
                  <li *ngFor="let k of kw.paid_ads">{{ k }}</li>
                </ul>
              </div>

              <div *ngIf="mode() === 'course' && kw.programming_courses?.length">
                <h3>كورسات البرمجة</h3>
                <ul>
                  <li *ngFor="let k of kw.programming_courses">{{ k }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="cta">
            <a class="btn btn-primary" href="#contact">تواصل الآن</a>
            <a class="btn btn-outline" href="/">عودة للرئيسية</a>
          </div>
        </div>

        <footer class="landing-footer">
          <p>هذه الصفحة مُولدة ديناميكياً لاستهداف {{ cityArabic() }} لكلمة: {{ focusTerm() }}</p>
        </footer>
      </div>
    </section>

    <section class="section" *ngIf="!ready()">
      <div class="container">
        <p>...جاري التحضير</p>
      </div>
    </section>
  `,
  styles: [`
    .landing-header { text-align: center; margin-bottom: 2rem; }
    .landing-title { font-weight: 800; margin: 0 0 0.5rem; }
    .landing-subtitle { color: var(--text-secondary); }
    .grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
    @media (min-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }
    ul { padding-inline-start: 1rem; }
    .cta { margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; }
    .landing-footer { text-align: center; margin-top: 2rem; color: var(--text-secondary); }
  `]
})
export class LandingComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  // Route params
  private readonly params = signal<{ service?: string; course?: string; city?: string }>({});

  // Data store
  private readonly geo = signal<GeoKeywords | null>(null);
  protected readonly ready = computed(() => !!this.geo());

  protected readonly mode = computed<'service' | 'course'>(() => {
    const p = this.params();
    return p.service ? 'service' : 'course';
  });

  protected readonly cityArabic = computed(() => this.toArabicCity(this.params().city || ''));
  protected readonly focusTerm = computed(() => (this.params().service || this.params().course || '').toLowerCase());

  protected readonly pageTitle = computed(() => {
    const mode = this.mode();
    const city = this.cityArabic();
    const term = this.focusTerm();
    if (mode === 'service') {
      // Map common service slugs to Arabic labels
      const label = this.mapService(term);
      return `${label} في ${city}`;
    }
    // course
    const courseLabel = this.mapCourse(term);
    return `كورس ${courseLabel} في ${city}`;
  });

  protected readonly pageSubtitle = computed(() => {
    const mode = this.mode();
    const city = this.cityArabic();
    if (mode === 'service') {
      return `خدمات احترافية مع نتائج ملموسة في ${city}. برمجة، SEO، وتسويق رقمي.`;
    }
    return `تعلم بطرق عملية ومشاريع حقيقية في ${city}. محتوى مُحدّث ودعم مستمر.`;
  });

  protected readonly selectedKeywords = computed<KeywordBuckets | null>(() => {
    const data = this.geo();
    const city = this.cityArabic();
    if (!data || !city) return null;

    // Try to match by exact area name first, otherwise by country fallback
    for (const region of data.regions) {
      const found = region.areas.find(a => this.normalize(a.name) === this.normalize(city));
      if (found) return found.keywords;
    }
    return null;
  });

  ngOnInit(): void {
    // read route params
    this.route.params.subscribe((p: Params) => {
      this.params.set({ service: p['service'], course: p['course'], city: p['city'] });
      this.updateMeta();
    });

    // load geo keywords JSON
    this.http.get<GeoKeywords>('assets/seo/geo-keywords-ar.json').subscribe({
      next: (data) => this.geo.set(data),
      error: () => this.geo.set({ regions: [] })
    });
  }

  ngOnDestroy(): void {}

  private normalize(v: string): string { return (v || '').trim().toLowerCase(); }

  private toArabicCity(slug: string): string {
    // Map well-known slugs to Arabic display names; fallback to capitalized slug
    const map: Record<string, string> = {
      cairo: 'القاهرة', giza: 'الجيزة', alexandria: 'الإسكندرية',
      alex: 'الإسكندرية',
      sharqia: 'الشرقية', ashsharqia: 'الشرقية',
      dakahlia: 'الدقهلية', eddakahliyah: 'الدقهلية',
      minya: 'المنيا', elminya: 'المنيا',
      riyadh: 'الرياض', jeddah: 'جدة', makkah: 'مكة', mecca: 'مكة',
      madinah: 'المدينة المنورة', medina: 'المدينة المنورة',
      dammam: 'الدمام',
      dubai: 'دبي', abudhabi: 'أبوظبي', abu_dhabi: 'أبوظبي',
      sharjah: 'الشارقة',
      alain: 'العين', 'al-ain': 'العين',
      kuwait: 'الكويت', doha: 'الدوحة', manama: 'المنامة', muscat: 'مسقط'
    };
    return map[this.normalize(slug)] || slug;
  }

  private mapService(slug: string): string {
    const map: Record<string, string> = {
      seo: 'تحسين محركات البحث (SEO)',
      'web-development': 'برمجة وتطوير مواقع',
      marketing: 'تسويق إلكتروني',
      ads: 'إعلانات ممولة'
    };
    return map[this.normalize(slug)] || slug;
  }

  private mapCourse(slug: string): string {
    const map: Record<string, string> = {
      angular: 'Angular',
      'node.js': 'Node.js', node: 'Node.js',
      'full-stack': 'Full Stack', fullstack: 'Full Stack',
      typescript: 'TypeScript', javascript: 'JavaScript'
    };
    return map[this.normalize(slug)] || slug;
  }

  private updateMeta() {
    const currentMode = this.mode();
    const city = this.cityArabic();
    const term = this.focusTerm();
    const serviceLabel = currentMode === 'service' ? this.mapService(term) : '';
    const courseLabel = currentMode === 'course' ? this.mapCourse(term) : '';

    const titleText = currentMode === 'service'
      ? `${serviceLabel} في ${city} | عبدالله العنوز`
      : `كورس ${courseLabel} في ${city} | عبدالله العنوز`;

    const descText = currentMode === 'service'
      ? `خدمات ${serviceLabel} باحتراف في ${city}. برمجة مواقع، SEO، تسويق وإعلانات لزيادة الظهور والتحويلات.`
      : `تعلم ${courseLabel} في ${city} بمحتوى عملي ومشاريع حقيقية ودعم مستمر لتحسين فرصك المهنية.`;

    const url = typeof window !== 'undefined' ? window.location.href : 'https://abdullahelanouz.netlify.app';
    const image = 'https://abdullahelanouz.netlify.app/assets/images/profile.jpg';

    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: descText });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: titleText });
    this.meta.updateTag({ property: 'og:description', content: descText });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: titleText });
    this.meta.updateTag({ name: 'twitter:description', content: descText });
    this.meta.updateTag({ name: 'twitter:url', content: url });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }
}
