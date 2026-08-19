import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-floating-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- WhatsApp Floating Button -->
    <div class="floating-buttons">
      <a 
        href="https://wa.me/201200240708?text={{ getWhatsAppMessage() }}"
        target="_blank"
        rel="noopener noreferrer"
        class="floating-btn whatsapp-btn"
        [attr.aria-label]="languageService.translate('floating.whatsapp') || 'Contact via WhatsApp'"
        [class.visible]="showButtons()"
      >
        <i class="fab fa-whatsapp"></i>
        <span class="btn-tooltip">
          {{ languageService.translate('floating.whatsappTooltip') || 'Chat on WhatsApp' }}
        </span>
      </a>

      <!-- Scroll to Top Button -->
      <button 
        class="floating-btn scroll-top-btn"
        [class.visible]="showScrollTop()"
        (click)="scrollToTop()"
        [attr.aria-label]="languageService.translate('floating.scrollTop') || 'Scroll to top'"
      >
        <i class="fas fa-chevron-up"></i>
        <span class="btn-tooltip">
          {{ languageService.translate('floating.scrollTopTooltip') || 'Back to top' }}
        </span>
      </button>
    </div>
  `,
  styleUrls: ['./floating-buttons.component.scss']
})
export class FloatingButtonsComponent implements OnInit {
  protected readonly languageService = inject(LanguageService);
  protected readonly showButtons = signal(false);
  protected readonly showScrollTop = signal(false);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      // Show buttons after a delay
      setTimeout(() => {
        this.showButtons.set(true);
      }, 2000);

      // Listen for scroll events to show/hide scroll-to-top button
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.showScrollTop.set(scrollTop > 300);
      });
    }
  }

  protected scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  protected getWhatsAppMessage(): string {
    const currentLang = this.languageService.language().code;
    if (currentLang === 'ar') {
      return encodeURIComponent('مرحبًا عبدالله! أود التحدث معك حول مشروع.');
    }
    return encodeURIComponent('Hello Abdullah! I would like to discuss a project with you.');
  }
}
