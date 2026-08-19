import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about-section section" #aboutSection>
      <div class="container">
        <div class="section-header" [class.animate]="isVisible()">
          <h2 class="section-title">{{ languageService.translate('about.title') }}</h2>
          <div class="section-subtitle">
            {{ languageService.translate('about.subtitle') || 'Get to know me better' }}
          </div>
        </div>

        <div class="about-content" [class.animate]="isVisible()">
          <div class="about-text">
            <div class="about-description">
              <p>{{ languageService.translate('about.description') }}</p>
            </div>

            <div class="about-highlights">
              <div class="highlight-item">
                <div class="highlight-icon">
                  <i class="fas fa-code"></i>
                </div>
                <div class="highlight-content">
                  <h4>{{ languageService.translate('about.experience') || '5+ Years Experience' }}</h4>
                  <p>{{ languageService.translate('about.experienceDesc') || 'Building web applications with modern technologies' }}</p>
                </div>
              </div>

              <div class="highlight-item">
                <div class="highlight-icon">
                  <i class="fas fa-project-diagram"></i>
                </div>
                <div class="highlight-content">
                  <h4>{{ languageService.translate('about.projects') || '50+ Projects Completed' }}</h4>
                  <p>{{ languageService.translate('about.projectsDesc') || 'From small websites to large-scale applications' }}</p>
                </div>
              </div>

              <div class="highlight-item">
                <div class="highlight-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="highlight-content">
                  <h4>{{ languageService.translate('about.clients') || 'Happy Clients' }}</h4>
                  <p>{{ languageService.translate('about.clientsDesc') || 'Delivering quality solutions that exceed expectations' }}</p>
                </div>
              </div>
            </div>

            <div class="about-stats">
              <div class="stat-item">
                <div class="stat-number" [attr.data-target]="5">0</div>
                <div class="stat-label">{{ languageService.translate('about.yearsExp') || 'Years Experience' }}</div>
              </div>

              <div class="stat-item">
                <div class="stat-number" [attr.data-target]="50">0</div>
                <div class="stat-label">{{ languageService.translate('about.projectsCount') || 'Projects Completed' }}</div>
              </div>

              <div class="stat-item">
                <div class="stat-number" [attr.data-target]="100">0</div>
                <div class="stat-label">{{ languageService.translate('about.satisfaction') || '% Client Satisfaction' }}</div>
              </div>

              <div class="stat-item">
                <div class="stat-number" [attr.data-target]="15">0</div>
                <div class="stat-label">{{ languageService.translate('about.technologies') || 'Technologies Mastered' }}</div>
              </div>
            </div>

            <div class="about-actions">
              <a href="#contact" class="btn btn-primary" (click)="scrollToSection('contact', $event)">
                <i class="fas fa-envelope"></i>
                {{ languageService.translate('about.getInTouch') || 'Get In Touch' }}
              </a>

              <a href="assets/cv/Abdullah_Elanouz_CV.pdf" target="_blank" class="btn btn-outline" download>
                <i class="fas fa-download"></i>
                {{ languageService.translate('about.downloadCV') || 'Download CV' }}
              </a>
            </div>
          </div>

          <div class="about-visual">
            <div class="about-image">
              <img
                src="assets/images/profile.svg"
                alt="عبدالله العنوز - مطور ويب متكامل، متخصص في تطوير المواقع والتسويق الإلكتروني في مصر والخليج العربي"
                loading="lazy"
                decoding="async"
                width="400"
                height="400"
                (load)="onImageLoad()"
                (error)="onImageError()"
              >
              <div class="image-overlay">
                <div class="overlay-content">
                  <i class="fas fa-play"></i>
                  <span>{{ languageService.translate('about.watchVideo') || 'Watch My Story' }}</span>
                </div>
              </div>
            </div>

            <div class="floating-elements">
              <div class="floating-tech tech-1">
                <i class="fab fa-angular"></i>
              </div>
              <div class="floating-tech tech-2">
                <i class="fab fa-node-js"></i>
              </div>
              <div class="floating-tech tech-3">
                <i class="fab fa-php"></i>
              </div>
              <div class="floating-tech tech-4">
                <i class="fab fa-js-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef;

  protected readonly languageService = inject(LanguageService);
  protected readonly isVisible = signal(false);
  private observer!: IntersectionObserver;

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
              this.animateStats();
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
      );

      this.observer.observe(this.aboutSection.nativeElement);

      // Mobile/tablet fallback: ensure visibility shortly after load
      const isSmallScreen = window.innerWidth <= 992;
      if (isSmallScreen) {
        setTimeout(() => {
          if (!this.isVisible()) {
            this.isVisible.set(true);
            this.animateStats();
          }
        }, 300);
      }
    }
  }

  private animateStats() {
    if (typeof document !== 'undefined') {
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach((stat: any) => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current);
        }, 40);
      });
    }
  }

  protected onImageLoad() {
    console.log('About image loaded successfully');
  }

  protected onImageError() {
    console.log('About image failed to load');
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
