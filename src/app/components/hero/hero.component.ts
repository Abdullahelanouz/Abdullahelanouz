import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="hero-section" role="main" aria-label="الصفحة الرئيسية">
      <!-- Animated Background -->
      <div class="hero-background">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
        </div>
        <div class="gradient-overlay"></div>
      </div>

      <div class="container">
        <div class="hero-content" [class.animate]="isLoaded()">
          <!-- Profile Image -->
          <div class="profile-image-container">
            <div class="profile-image">
              <img
                src="assets/images/profile.jpg"
                alt="عبدالله العنوز - مطور ويب متكامل بخبرة 5+ سنوات في Angular، Node.js، PHP"
                loading="eager"
                decoding="async"
                width="300"
                height="300"
                (load)="onImageLoad()"
                (error)="onImageError()"
              >
              <div class="profile-ring"></div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="hero-text">
            <h1 class="hero-title">
              {{ languageService.translate('hero.title') }}
            </h1>

            <h2 class="hero-subtitle">
              {{ languageService.translate('hero.subtitle') }}
            </h2>

            <p class="hero-description">
              {{ languageService.translate('hero.description') }}
            </p>

            <!-- Call to Action Buttons -->
            <div class="hero-actions">
              <a
                href="#projects"
                class="btn btn-primary"
                (click)="scrollToSection('projects', $event)"
              >
                <i class="fas fa-briefcase"></i>
                {{ languageService.translate('hero.viewWork') }}
              </a>

              <a
                href="#contact"
                class="btn btn-secondary"
                (click)="scrollToSection('contact', $event)"
              >
                <i class="fas fa-envelope"></i>
                {{ languageService.translate('hero.contact') }}
              </a>
            </div>

            <!-- Social Media Links -->
            <div class="social-links">
              <a
                href="https://www.linkedin.com/in/abdullahelanouz/"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link linkedin"
                aria-label="LinkedIn"
              >
                <i class="fab fa-linkedin-in"></i>
              </a>

              <a
                href="https://github.com/Abdullahelanouz"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link github"
                aria-label="GitHub"
              >
                <i class="fab fa-github"></i>
              </a>

              <a
                href="https://www.facebook.com/abdullahelanouz/"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link facebook"
                aria-label="Facebook"
              >
                <i class="fab fa-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com/abdullahelanouz/"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link instagram"
                aria-label="Instagram"
              >
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="scroll-indicator">
          <div class="scroll-arrow">
            <i class="fas fa-chevron-down"></i>
          </div>
          <span class="scroll-text">{{ languageService.translate('hero.scrollDown') || 'Scroll Down' }}</span>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  protected readonly languageService = inject(LanguageService);
  protected readonly isLoaded = signal(false);

  ngOnInit() {
    // Trigger animation after component loads
    setTimeout(() => {
      this.isLoaded.set(true);
    }, 100);
  }

  protected onImageLoad() {
    console.log('Profile image loaded successfully');
  }

  protected onImageError() {
    console.log('Profile image failed to load, using fallback');
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
