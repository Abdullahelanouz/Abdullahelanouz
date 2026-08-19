import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FloatingButtonsComponent } from './components/floating-buttons/floating-buttons.component';
import { SeoIndexingService } from './services/seo-indexing.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FloatingButtonsComponent
  ],
  template: `
    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-floating-buttons></app-floating-buttons>
  `,
  styleUrl: './app.scss'
})
export class App {
  private readonly seoIndexing = inject(SeoIndexingService);

  constructor() {
    // Initialize IndexNow pings (throttled, browser-only)
    if (typeof window !== 'undefined') {
      this.seoIndexing.init();
    }
  }
}
