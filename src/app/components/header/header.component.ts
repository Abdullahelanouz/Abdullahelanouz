import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <nav class="navbar">
        <div class="nav-container">
          <!-- Logo -->
          <div class="nav-logo">
            <a href="#home" class="logo-link">
              <span class="logo-text">{{ languageService.translate('hero.title') }}</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <ul class="nav-menu" [class.active]="isMobileMenuOpen()">
            <li class="nav-item">
              <a href="#home" class="nav-link" (click)="closeMobileMenu()">
                {{ languageService.translate('nav.home') }}
              </a>
            </li>
            <li class="nav-item">
              <a href="#about" class="nav-link" (click)="closeMobileMenu()">
                {{ languageService.translate('nav.about') }}
              </a>
            </li>
            <li class="nav-item">
              <a href="#skills" class="nav-link" (click)="closeMobileMenu()">
                {{ languageService.translate('nav.skills') }}
              </a>
            </li>
            <li class="nav-item">
              <a href="#projects" class="nav-link" (click)="closeMobileMenu()">
                {{ languageService.translate('nav.projects') }}
              </a>
            </li>
            <li class="nav-item">
              <a href="#services" class="nav-link" (click)="closeMobileMenu()">
                {{ languageService.translate('nav.services') }}
              </a>
            </li>
            <li class="nav-item">
              <a href="#teaching" class="nav-link" (click)="closeMobileMenu()">
                {{ languageService.translate('nav.teaching') }}
              </a>
            </li>
            <li class="nav-item">
              <a href="#blog" class="nav-link" (click)="closeMobileMenu()">
                {{ languageService.translate('nav.blog') }}
              </a>
            </li>
            <li class="nav-item">
              <a href="#contact" class="nav-link" (click)="closeMobileMenu()">
                {{ languageService.translate('nav.contact') }}
              </a>
            </li>
          </ul>

          <!-- Controls -->
          <div class="nav-controls">
            <!-- Theme Toggle -->
            <button 
              class="theme-toggle" 
              (click)="themeService.toggleTheme()"
              [attr.aria-label]="themeService.isDark() ? languageService.translate('theme.light') : languageService.translate('theme.dark')"
            >
              <i class="theme-icon" [class]="themeService.isDark() ? 'fas fa-sun' : 'fas fa-moon'"></i>
            </button>

            <!-- Language Toggle -->
            <button 
              class="language-toggle" 
              (click)="toggleLanguage()"
              [attr.aria-label]="'Switch to ' + getOtherLanguage().name"
            >
              <span class="language-text">{{ getOtherLanguage().code.toUpperCase() }}</span>
            </button>

            <!-- Mobile Menu Toggle -->
            <button 
              class="mobile-menu-toggle" 
              (click)="toggleMobileMenu()"
              [attr.aria-label]="'Toggle navigation menu'"
              [class.active]="isMobileMenuOpen()"
            >
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  protected readonly languageService = inject(LanguageService);
  protected readonly themeService = inject(ThemeService);
  
  protected readonly isScrolled = signal(false);
  protected readonly isMobileMenuOpen = signal(false);

  constructor() {
    // Listen for scroll events
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });
    }
  }

  protected toggleLanguage() {
    const currentLang = this.languageService.language().code;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.languageService.switchLanguage(newLang);
  }

  protected getOtherLanguage() {
    const currentLang = this.languageService.language().code;
    return this.languageService.availableLanguages.find(lang => lang.code !== currentLang)!;
  }

  protected toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
  }

  protected closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
