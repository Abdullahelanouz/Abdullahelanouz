import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  price: string;
  students: number;
  rating: number;
  featured: boolean;
}

@Component({
  selector: 'app-teaching',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="teaching" class="teaching-section section" #teachingSection>
      <div class="container">
        <div class="section-header" [class.animate]="isVisible()">
          <h2 class="section-title">{{ languageService.translate('teaching.title') }}</h2>
          <p class="section-subtitle">
            {{ languageService.translate('teaching.subtitle') || 'Sharing knowledge through comprehensive programming courses' }}
          </p>
        </div>

        <div class="teaching-content" [class.animate]="isVisible()">
          <!-- Teaching Stats -->
          <div class="teaching-stats">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number" data-target="500">0</div>
                <div class="stat-label">{{ languageService.translate('teaching.students') || 'Students Taught' }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-book"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number" data-target="10">0</div>
                <div class="stat-label">{{ languageService.translate('teaching.courses') || 'Courses Created' }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-star"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number" data-target="4.9">0</div>
                <div class="stat-label">{{ languageService.translate('teaching.rating') || 'Average Rating' }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number" data-target="100">0</div>
                <div class="stat-label">{{ languageService.translate('teaching.hours') || 'Hours of Content' }}</div>
              </div>
            </div>
          </div>

          <!-- Featured Courses -->
          <div class="courses-grid">
            <div
              *ngFor="let course of courses; trackBy: trackByCourse; let i = index"
              class="course-card"
              [style.animation-delay]="i * 200 + 'ms'"
            >
              <div class="course-image">
                <img
                  [src]="course.image"
                  [alt]="course.title"
                  (load)="onImageLoad(course.id)"
                  (error)="onImageError(course.id)"
                >
                <div class="course-badge" [class]="'badge-' + course.level">
                  {{ languageService.translate('teaching.level.' + course.level) || course.level }}
                </div>
                <div class="course-overlay">
                  <div class="overlay-content">
                    <button class="btn btn-primary">
                      <i class="fas fa-play"></i>
                      {{ languageService.translate('teaching.preview') || 'Preview Course' }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="course-content">
                <div class="course-header">
                  <h3 class="course-title">{{ course.title }}</h3>
                  <div class="course-rating">
                    <div class="stars">
                      <i *ngFor="let star of getStars(course.rating)" class="fas fa-star"></i>
                    </div>
                    <span class="rating-text">({{ course.rating }})</span>
                  </div>
                </div>

                <p class="course-description">{{ course.description }}</p>

                <div class="course-meta">
                  <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ course.duration }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-users"></i>
                    <span>{{ course.students }} {{ languageService.translate('teaching.studentsCount') || 'students' }}</span>
                  </div>
                </div>

                <div class="course-technologies">
                  <span
                    *ngFor="let tech of course.technologies"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div class="course-footer">
                  <div class="course-price">
                    <span class="price">{{ course.price }}</span>
                  </div>
                  <button class="btn btn-primary">


                  <a
                      class="btn btn-primary"
                      [href]="'https://wa.me/201200240708?text=' + encodeURIComponent('Check out this course: ' + course.title + ' - ' + course.id)"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                    <i class="fas fa-shopping-cart"></i>
                    {{ languageService.translate('teaching.enroll') || 'Enroll Now' }}
                  </a>
                  </button>

                </div>
              </div>
            </div>
          </div>

          <!-- Teaching Philosophy -->
          <div class="teaching-philosophy">
            <div class="philosophy-content">
              <h3 class="philosophy-title">
                {{ languageService.translate('teaching.philosophy') || 'My Teaching Philosophy' }}
              </h3>
              <p class="philosophy-text">
                {{ languageService.translate('teaching.philosophyText') || 'I believe in hands-on learning with real-world projects. My courses focus on practical skills that you can immediately apply in your career.' }}
              </p>
              <div class="philosophy-features">
                <div class="feature-item">
                  <i class="fas fa-code"></i>
                  <span>{{ languageService.translate('teaching.practical') || 'Practical Projects' }}</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-support"></i>
                  <span>{{ languageService.translate('teaching.support') || '24/7 Support' }}</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-certificate"></i>
                  <span>{{ languageService.translate('teaching.certificate') || 'Certificates' }}</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-infinity"></i>
                  <span>{{ languageService.translate('teaching.lifetime') || 'Lifetime Access' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="teaching-cta">
            <h3 class="cta-title">
              {{ languageService.translate('teaching.ctaTitle') || 'Ready to Start Learning?' }}
            </h3>
            <p class="cta-text">
              {{ languageService.translate('teaching.ctaText') || 'Join thousands of students who have transformed their careers with my courses.' }}
            </p>
            <div class="cta-actions">
              <a href="https://www.syntaxroom.com/" target="_blank" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i>
                {{ languageService.translate('teaching.visitPlatform') || 'Visit Learning Platform' }}
              </a>
              <a href="#contact" class="btn btn-outline" (click)="scrollToSection('contact', $event)">
                <i class="fas fa-envelope"></i>
                {{ languageService.translate('teaching.customCourse') || 'Request Custom Course' }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./teaching.component.scss']
})
export class TeachingComponent implements OnInit {
  @ViewChild('teachingSection', { static: true }) teachingSection!: ElementRef;

  protected readonly languageService = inject(LanguageService);
  protected readonly isVisible = signal(false);
  private observer!: IntersectionObserver;
  protected readonly encodeURIComponent = encodeURIComponent;

  protected readonly courses: Course[] = [
    {
      id: 'angular-complete',
      title: this.languageService.translate('teaching.courses.angular') || 'Complete Angular Development',
      description: this.languageService.translate('teaching.courses.angularDesc') || 'Master Angular from basics to advanced concepts with real-world projects.',
      image: 'assets/images/placeholder.svg',
      duration: '40 hours',
      level: 'intermediate',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx'],
      price: 'contact me',
      students: 250,
      rating: 4.9,
      featured: true
    },
    {
      id: 'nodejs-backend',
      title: this.languageService.translate('teaching.courses.nodejs') || 'Node.js Backend Development',
      description: this.languageService.translate('teaching.courses.nodejsDesc') || 'Build scalable backend applications with Node.js and Express.',
      image: 'assets/images/placeholder.svg',
      duration: '35 hours',
      level: 'intermediate',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      price: 'contact me',
      students: 180,
      rating: 4.8,
      featured: true
    },
    {
      id: 'fullstack-web',
      title: this.languageService.translate('teaching.courses.fullstack') || 'Full Stack Web Development',
      description: this.languageService.translate('teaching.courses.fullstackDesc') || 'Complete full stack development course covering frontend and backend.',
      image: 'assets/images/placeholder.svg',
      duration: '60 hours',
      level: 'advanced',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'REST API'],
      price: 'contact me',
      students: 120,
      rating: 5.0,
      featured: true
    }
  ];

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

      this.observer.observe(this.teachingSection.nativeElement);

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
      const statNumbers = this.teachingSection.nativeElement.querySelectorAll('.stat-number');
      statNumbers.forEach((stat: HTMLElement) => {
        const targetAttr = stat.getAttribute('data-target') || '0';
        const target = parseFloat(targetAttr);
        const isFloat = target % 1 !== 0;
        const duration = 2000; // 2 seconds
        const frameRate = 60; // 60fps
        const totalFrames = Math.round((duration / 1000) * frameRate);
        const increment = target / totalFrames;
        let current = 0;
        let frame = 0;

        const timer = setInterval(() => {
          frame++;
          current += increment;

          if (frame === totalFrames) {
            current = target;
            clearInterval(timer);
          }

          const displayText = isFloat ? current.toFixed(1) : Math.floor(current).toString();
          stat.textContent = displayText;
        }, duration / totalFrames);
      });
    }
  }

  protected trackByCourse(index: number, course: Course): string {
    return course.id;
  }

  protected getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  protected onImageLoad(courseId: string) {
    console.log(`Course image loaded: ${courseId}`);
  }

  protected onImageError(courseId: string) {
    console.log(`Course image failed to load: ${courseId}`);
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
