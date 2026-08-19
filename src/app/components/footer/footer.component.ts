import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-main">
            <div class="footer-brand">
              <h3 class="brand-name">{{ languageService.translate('hero.title') }}</h3>
              <p class="brand-tagline">{{ languageService.translate('hero.subtitle') }}</p>
            </div>

            <div class="footer-links">
              <div class="link-group">
                <h4 class="link-title">{{ languageService.translate('footer.navigation') || 'Navigation' }}</h4>
                <ul class="link-list">
                  <li><a href="#home" (click)="scrollToSection('home', $event)">{{ languageService.translate('nav.home') }}</a></li>
                  <li><a href="#about" (click)="scrollToSection('about', $event)">{{ languageService.translate('nav.about') }}</a></li>
                  <li><a href="#skills" (click)="scrollToSection('skills', $event)">{{ languageService.translate('nav.skills') }}</a></li>
                  <li><a href="#projects" (click)="scrollToSection('projects', $event)">{{ languageService.translate('nav.projects') }}</a></li>
                </ul>
              </div>

              <div class="link-group">
                <h4 class="link-title">{{ languageService.translate('footer.services') || 'Services' }}</h4>
                <ul class="link-list">
                  <li><a href="#teaching" (click)="scrollToSection('teaching', $event)">{{ languageService.translate('nav.teaching') }}</a></li>
                  <li><a href="#blog" (click)="scrollToSection('blog', $event)">{{ languageService.translate('nav.blog') }}</a></li>
                  <li><a href="#contact" (click)="scrollToSection('contact', $event)">{{ languageService.translate('nav.contact') }}</a></li>
                </ul>
              </div>

              <div class="link-group">
                <h4 class="link-title">{{ languageService.translate('footer.connect') || 'Connect' }}</h4>
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

                <div class="contact-info">
                  <p class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:abdullahelanouz@gmail.com">abdullahelanouz&#64;gmail.com</a>
                  </p>
                  <p class="contact-item">
                    <i class="fas fa-phone"></i>
                    <a href="tel:+201200240708">+20 120 024 0708</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="footer-divider"></div>
            <div class="footer-bottom-content">
              <p class="copyright">
                {{ languageService.translate('footer.copyright') }}
              </p>

              <div class="footer-meta">
                <span class="made-with">
                  {{ languageService.translate('footer.madeWith') || 'Made with' }}
                  <i class="fas fa-heart"></i>
                  {{ languageService.translate('footer.in') || 'in' }}
                  {{ languageService.translate('contact.locationText') || 'Egypt' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected readonly languageService = inject(LanguageService);

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
