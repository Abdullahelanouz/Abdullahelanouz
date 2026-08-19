import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterLink } from '@angular/router';
import { BlogService } from './blog.service';


@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  template: `
    <section class="blog-details-section" *ngIf="post">
      <div class="container">
        <button routerLink="/" class="back-btn">
          <i class="fas fa-arrow-right"></i> رجوع للمدونة
        </button>
        <h1 class="details-title">{{ post.title }}</h1>
        <div class="details-meta">
          <span>{{ post.author }}</span> ·
          <span>{{ post.date }}</span> ·
          <span>{{ post.readTime }} دقيقة قراءة</span>
        </div>
        <img [src]="post.image" [alt]="post.title" class="details-image" />
        <div class="details-content" [innerHTML]="post.content"></div>
        <div *ngIf="faqStructuredData" >
          <script type="application/ld+json">{{ faqStructuredData }}</script>
        </div>
        <div class="details-tags">
          <span *ngFor="let tag of post.tags" class="tag">{{tag}}</span>
        </div>
      </div>
    </section>
    <section *ngIf="!post" class="blog-details-section"><div class="container"><h2>المقال غير موجود</h2></div></section>
  `,
  styleUrls: ['./blog-details.component.scss','./blog-dark-theme.scss']
})
export class BlogDetailsComponent {
  // Inject services
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  post = this.blogService.findBySlug(this.route.snapshot.params['slug']);

  get faqStructuredData(): string | null {
    // Check if we're in browser environment
    if (typeof document === 'undefined') return null;
    
    const el = document.createElement('div');
    el.innerHTML = this.post?.content ?? '';
    const faqs: { question: string; answer: string }[] = [];
    el.querySelectorAll('.faq strong').forEach(strongEl => {
      const question = strongEl.textContent?.trim() ?? '';
      const answerEl = strongEl.nextElementSibling;
      const answer = answerEl?.textContent?.trim() ?? '';
      if (question && answer) {
        faqs.push({ question, answer });
      }
    });
    if (faqs.length === 0) return null;
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer }
      }))
    }, null, 2);
  }
}
