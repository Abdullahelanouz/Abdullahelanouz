import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="projects-section section" #projectsSection>
      <div class="container">
        <div class="section-header" [class.animate]="isVisible()">
          <h2 class="section-title">{{ languageService.translate('projects.title') }}</h2>
          <p class="section-subtitle">
            {{ languageService.translate('projects.subtitle') || 'Some of my recent work' }}
          </p>
        </div>

        <div class="projects-content" [class.animate]="isVisible()">
          <!-- Featured Projects -->
          <div class="projects-grid">
            <div
              *ngFor="let project of projects; trackBy: trackByProject; let i = index"
              class="project-card"
              [style.animation-delay]="i * 200 + 'ms'"
            >
              <div class="project-image">
                <img
                  [src]="project.image"
                  [alt]="'صورة مشروع ' + project.title + ' - ' + project.description"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="200"
                  (load)="onImageLoad(project.id)"
                  (error)="onImageError(project.id)"
                >
                <div class="project-overlay">
                  <div class="overlay-content">
                    <a
                      [href]="project.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="overlay-btn btn-primary"
                      [attr.aria-label]="'View ' + project.title + ' live demo'"
                    >
                      <i class="fas fa-external-link-alt"></i>
                      {{ languageService.translate('projects.liveDemo') }}
                    </a>

                    <a
                      [href]="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="overlay-btn btn-secondary"
                      [attr.aria-label]="'View ' + project.title + ' source code'"
                    >
                      <i class="fab fa-github"></i>
                      {{ languageService.translate('projects.github') }}
                    </a>
                  </div>
                </div>
              </div>

              <div class="project-content">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>

                <div class="project-technologies">
                  <span
                    *ngFor="let tech of project.technologies"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div class="project-actions">
                  <a
                    [href]="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-primary"
                  >
                    <i class="fas fa-external-link-alt"></i>
                    {{ languageService.translate('projects.liveDemo') }}
                  </a>

                  <a
                    [href]="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-outline"
                  >
                    <i class="fab fa-github"></i>
                    {{ languageService.translate('projects.github') }}
                  </a>
                </div>
              </div>
            </div>

            <!-- More Projects Coming Soon Card -->
            <div class="project-card coming-soon-card">
              <div class="coming-soon-content">
                <div class="coming-soon-icon">
                  <i class="fas fa-plus"></i>
                </div>
                <h3 class="coming-soon-title">
                  {{ languageService.translate('projects.moreProjects') }}
                </h3>
                <p class="coming-soon-description">
                  {{ languageService.translate('projects.moreProjectsDesc') || 'More exciting projects are currently in development' }}
                </p>
                <div class="coming-soon-animation">
                  <div class="dot dot-1"></div>
                  <div class="dot dot-2"></div>
                  <div class="dot dot-3"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- View All Projects Button -->
          <div class="projects-actions">
            <a href="#contact" class="btn btn-primary" (click)="scrollToSection('contact', $event)">
              <i class="fas fa-envelope"></i>
              {{ languageService.translate('projects.discussProject') || 'Discuss Your Project' }}
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @ViewChild('projectsSection', { static: true }) projectsSection!: ElementRef;

  protected readonly languageService = inject(LanguageService);
  protected readonly isVisible = signal(true);
  private observer!: IntersectionObserver;

  protected readonly projects: Project[] = [
    {
      id: 'rukn-el-nada',
      title: 'Rukn El Nada',
      description: this.languageService.translate('projects.ruknDescription') || 'موقع إلكتروني تجاري متكامل لبيع المنتجات، مع لوحة تحكم لإدارة المحتوى والمخزون.',
      image: 'assets/images/projects/rukn-el-nada.svg',
      technologies: ['Angular', 'Bootstrap', 'Node.js', 'Express', 'MongoDB'],
      liveUrl: 'https://ruknelnada.com',
      githubUrl: 'https://github.com/Abdullahelanouz/rukn-el-nada',
      featured: true
    },
    {
      id: 'syntax-room',
      title: 'Syntax Room',
      description: this.languageService.translate('projects.syntaxDescription') || 'منصة تعليمية تقدم دورات في مجال البرمجة، مع نظام لإدارة المستخدمين والمحتوى التعليمي.',
      image: 'assets/images/projects/syntax-room.svg',
      technologies: ['Angular', 'TypeScript', 'SASS', 'PHP', 'MySQL'],
      liveUrl: 'https://www.syntaxroom.com/',
      githubUrl: 'https://github.com/Abdullahelanouz/syntax-room',
      featured: true
    },
    {
      id: 'tech-scope',
      title: 'Tech Scope',
      description: this.languageService.translate('projects.techDescription') || 'متجر إلكتروني متخصص في بيع الأجهزة التقنية، مصمم بواجهات عصرية وسريعة الاستجابة.',
      image: 'assets/images/projects/tech-scope.svg',
      technologies: ['Angular', 'Redux', 'Node.js', 'MongoDB', 'REST API'],
      liveUrl: 'https://techscope.shop/',
      githubUrl: 'https://github.com/Abdullahelanouz/tech-scope',
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
            }
          });
        },
        { threshold: 0.3 }
      );

      this.observer.observe(this.projectsSection.nativeElement);
    }
  }

  protected trackByProject(index: number, project: Project): string {
    return project.id;
  }

  protected onImageLoad(projectId: string) {
    console.log(`Project image loaded: ${projectId}`);
  }

  protected onImageError(projectId: string) {
    console.log(`Project image failed to load: ${projectId}`);
    // Set a fallback image
    const imgElement = document.querySelector(`img[alt*="${projectId}"]`) as HTMLImageElement;
    if (imgElement) {
      imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjhmOWZhIi8+CjxyZWN0IHg9IjEiIHk9IjEiIHdpZHRoPSIzOTgiIGhlaWdodD0iMjk4IiBzdHJva2U9IiNlOWVjZWYiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZjNzU3ZCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2Ij5Qcm9qZWN0IEltYWdlPC90ZXh0Pgo8L3N2Zz4=';
    }
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
