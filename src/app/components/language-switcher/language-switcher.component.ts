import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-switcher">
      <button 
        *ngFor="let lang of languageService.availableLanguages"
        class="language-btn"
        [class.active]="languageService.language().code === lang.code"
        (click)="switchLanguage(lang.code)"
        [attr.aria-label]="'Switch to ' + lang.name"
        [attr.title]="'Switch to ' + lang.name"
      >
        <span class="language-flag">{{ getFlag(lang.code) }}</span>
        <span class="language-name">{{ lang.name }}</span>
      </button>
    </div>
  `,
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  protected readonly languageService = inject(LanguageService);

  protected switchLanguage(languageCode: string) {
    this.languageService.switchLanguage(languageCode);
  }

  protected getFlag(code: string): string {
    const flags: Record<string, string> = {
      'en': '🇺🇸',
      'ar': '🇪🇬'
    };
    return flags[code] || '🌐';
  }
}
