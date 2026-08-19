import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from './blog.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section id="blog" class="blog-section section" #blogSection>
      
      <div class="container">
        <div class="section-header" [class.animate]="isVisible()">
          <h2 class="section-title">{{ languageService.translate('blog.title') }}</h2>
          <p class="section-subtitle">
            {{ languageService.translate('blog.subtitle') }}
          </p>
        </div>

        <div class="blog-content animate">
          <!-- Blog Posts Grid: Show all posts -->
          <div class="blog-posts">
            <div
              *ngFor="let post of blogPosts; trackBy: trackByPost"
              class="blog-post-card animate"
              [style.animation-delay]="getAnimationDelay(post) + 'ms'"
            >
              <div class="post-image">
                <img
                  [src]="post.image"
                  [alt]="post.title"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="200"
                >
                <div class="post-overlay">
                  <a [routerLink]="['/blog', post.slug]" class="read-btn">
                    <i class="fas fa-eye"></i>
                  </a>
                </div>
              </div>
              <div class="post-content">
                <div class="post-meta">
                  <span class="post-date">{{ post.date }}</span>
                  <span class="post-read-time">{{ post.readTime }} {{ languageService.translate('blog.minRead') }}</span>
                </div>
                <h4 class="post-title">
                  <a [routerLink]="['/blog', post.slug]">{{ post.title }}</a>
                </h4>
                <p class="post-excerpt">{{ post.excerpt }}</p>
                <div class="post-tags">
                  <span *ngFor="let tag of post.tags" class="tag">{{ tag }}</span>
                </div>
                <a [routerLink]="['/blog', post.slug]" class="read-more-link">
                  {{ languageService.translate('blog.readMore') }}
                  <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Newsletter Subscription -->
        <div class="newsletter-section">
          <div class="newsletter-content">
            <h3>{{ languageService.translate('blog.ctaTitle') }}</h3>
            <p>{{ languageService.translate('blog.ctaText') }}</p>
            <form class="newsletter-form" (ngSubmit)="subscribeNewsletter($event)">
              <div class="form-group">
                <input
                  type="email"
                  class="email-input"
                  [placeholder]="languageService.translate('blog.emailPlaceholder')"
                  [(ngModel)]="email"
                  name="email"
                  required
                >
                <button type="submit" class="subscribe-btn" [disabled]="isSubscribing()">
                  <i class="fas fa-paper-plane" *ngIf="!isSubscribing()"></i>
                  <i class="fas fa-spinner fa-spin" *ngIf="isSubscribing()"></i>
                  {{ languageService.translate('blog.subscribe') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./blog.component.scss', './blog-dark-theme.scss']
})
export class BlogComponent implements OnInit {
  @ViewChild('blogSection', { static: true }) blogSection!: ElementRef;

  protected readonly languageService = inject(LanguageService);
  protected readonly themeService = inject(ThemeService);
  protected readonly isVisible = signal(false);
  protected readonly isSubscribing = signal(false);
  protected readonly email = signal('');
  private observer!: IntersectionObserver;
  private blogService = inject(BlogService);

  protected get blogPosts(): BlogPost[] { return this.blogService.getAll(); }
  get featuredPost(): BlogPost | undefined {
    return this.blogPosts.find(post => post.featured);
  }
  get regularPosts(): BlogPost[] {
    return this.blogPosts.filter(post => !post.featured);
  }

  ngOnInit() {
    this.setupIntersectionObserver();
    console.log('Blog posts:', this.blogPosts);
    console.log('Featured post:', this.featuredPost);
    console.log('Regular posts:', this.regularPosts);
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
            }
          });
        },
        { threshold: 0.3 }
      );

      this.observer.observe(this.blogSection.nativeElement);
    }
  }

  protected trackByPost(index: number, post: BlogPost): string {
    return post.id;
  }

  protected getAnimationDelay(post: BlogPost): number {
    const index = this.blogPosts.findIndex(p => p.id === post.id);
    return index * 100;
  }

  protected subscribeNewsletter(event: Event) {
    event.preventDefault();
    if (this.email().trim()) {
      this.isSubscribing.set(true);
      
      // إعداد بيانات EmailJS
      const templateParams = {
        to_email: 'abdullahelanouz@gmail.com',
        from_email: this.email().trim(),
        subject: 'اشتراك جديد في النشرة الإخبارية',
        message: `تم الاشتراك في النشرة الإخبارية من: ${this.email().trim()}\n\nالتاريخ: ${new Date().toLocaleString('ar-EG')}\n\nيمكنك إضافة هذا البريد لقائمة النشرة الإخبارية.`,
        user_name: 'مشترك جديد',
        reply_to: this.email().trim()
      };

      // إرسال الإيميل عبر EmailJS
      emailjs.send(
        'service_64tyidh', // استبدل بـ Service ID الخاص بك من EmailJS
        'template_cs178tv', // استبدل بـ Template ID الخاص بك من EmailJS
        templateParams,
        'hwTB3eTwxj8KI6CU3' // استبدل بـ Public Key الخاص بك من EmailJS
      )
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        this.isSubscribing.set(false);
        this.email.set('');
        alert('تم الاشتراك بنجاح! شكراً لك على اهتمامك.');
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        this.isSubscribing.set(false);
        alert('حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.');
      });
    } else {
      alert('يرجى إدخال بريد إلكتروني صحيح');
    }
  }
}
