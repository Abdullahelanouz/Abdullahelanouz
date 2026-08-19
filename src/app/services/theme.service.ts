import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly currentTheme = signal<Theme>('dark'); // Default to dark theme

  constructor() {
    // Load saved theme from localStorage or default to dark
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        this.currentTheme.set(savedTheme);
      }
    }
    this.applyTheme();
  }

  get theme() {
    return this.currentTheme.asReadonly();
  }

  toggleTheme() {
    const newTheme: Theme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('portfolio-theme', theme);
    }
    this.applyTheme();
  }

  private applyTheme() {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      html.setAttribute('data-theme', this.currentTheme());

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content',
          this.currentTheme() === 'dark' ? '#1a1a1a' : '#ffffff'
        );
      }
    }
  }

  isDark() {
    return this.currentTheme() === 'dark';
  }

  isLight() {
    return this.currentTheme() === 'light';
  }
}
