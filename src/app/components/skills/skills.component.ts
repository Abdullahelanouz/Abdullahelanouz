import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Skill {
  name: string;
  icon: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="skills-section section" #skillsSection>
      <div class="container">
        <div class="section-header" [class.animate]="isVisible()">
          <h2 class="section-title">{{ languageService.translate('skills.title') }}</h2>
          <p class="section-subtitle">
            {{ languageService.translate('skills.subtitle') || 'Technologies and tools I work with' }}
          </p>
        </div>

        <div class="skills-content" [class.animate]="isVisible()">
          <!-- Frontend Skills -->
          <div class="skills-category">
            <div class="category-header">
              <div class="category-icon">
                <i class="fas fa-laptop-code"></i>
              </div>
              <h3 class="category-title">{{ languageService.translate('skills.frontend') }}</h3>
            </div>

            <div class="skills-grid">
              <div
                *ngFor="let skill of frontendSkills; trackBy: trackBySkill"
                class="skill-item"
                [style.animation-delay]="getAnimationDelay(skill) + 'ms'"
              >
                <div class="skill-icon">
                  <i [class]="skill.icon"></i>
                </div>
                <div class="skill-info">
                  <h4 class="skill-name">{{ skill.name }}</h4>
                  <div class="skill-progress">
                    <div class="progress-bar">
                      <div
                        class="progress-fill"
                        [style.width]="isVisible() ? skill.level + '%' : '0%'"
                      ></div>
                    </div>
                    <span class="skill-percentage">{{ skill.level }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Backend Skills -->
          <div class="skills-category">
            <div class="category-header">
              <div class="category-icon">
                <i class="fas fa-server"></i>
              </div>
              <h3 class="category-title">{{ languageService.translate('skills.backend') }}</h3>
            </div>

            <div class="skills-grid">
              <div
                *ngFor="let skill of backendSkills; trackBy: trackBySkill"
                class="skill-item"
                [style.animation-delay]="getAnimationDelay(skill) + 'ms'"
              >
                <div class="skill-icon">
                  <i [class]="skill.icon"></i>
                </div>
                <div class="skill-info">
                  <h4 class="skill-name">{{ skill.name }}</h4>
                  <div class="skill-progress">
                    <div class="progress-bar">
                      <div
                        class="progress-fill"
                        [style.width]="isVisible() ? skill.level + '%' : '0%'"
                      ></div>
                    </div>
                    <span class="skill-percentage">{{ skill.level }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tools & Methodologies -->
          <div class="skills-category">
            <div class="category-header">
              <div class="category-icon">
                <i class="fas fa-tools"></i>
              </div>
              <h3 class="category-title">{{ languageService.translate('skills.tools') }}</h3>
            </div>

            <div class="skills-grid">
              <div
                *ngFor="let skill of toolsSkills; trackBy: trackBySkill"
                class="skill-item"
                [style.animation-delay]="getAnimationDelay(skill) + 'ms'"
              >
                <div class="skill-icon">
                  <i [class]="skill.icon"></i>
                </div>
                <div class="skill-info">
                  <h4 class="skill-name">{{ skill.name }}</h4>
                  <div class="skill-progress">
                    <div class="progress-bar">
                      <div
                        class="progress-fill"
                        [style.width]="isVisible() ? skill.level + '%' : '0%'"
                      ></div>
                    </div>
                    <span class="skill-percentage">{{ skill.level }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @ViewChild('skillsSection', { static: true }) skillsSection!: ElementRef;

  protected readonly languageService = inject(LanguageService);
  protected readonly isVisible = signal(false);
  private observer!: IntersectionObserver;

  protected readonly frontendSkills: Skill[] = [
    { name: 'HTML5', icon: 'fab fa-html5', level: 95, category: 'frontend' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', level: 90, category: 'frontend' },
    { name: 'SASS', icon: 'fab fa-sass', level: 85, category: 'frontend' },
    { name: 'JavaScript', icon: 'fab fa-js-square', level: 90, category: 'frontend' },
    { name: 'TypeScript', icon: 'fas fa-code', level: 85, category: 'frontend' },
    { name: 'Angular', icon: 'fab fa-angular', level: 90, category: 'frontend' },
    { name: 'Redux', icon: 'fas fa-layer-group', level: 80, category: 'frontend' },
    { name: 'Bootstrap', icon: 'fab fa-bootstrap', level: 85, category: 'frontend' },
    { name: 'jQuery', icon: 'fas fa-dollar-sign', level: 80, category: 'frontend' }
  ];

  protected readonly backendSkills: Skill[] = [
    { name: 'Node.js', icon: 'fab fa-node-js', level: 85, category: 'backend' },
    { name: 'Express.js', icon: 'fas fa-server', level: 80, category: 'backend' },
    { name: 'PHP', icon: 'fab fa-php', level: 85, category: 'backend' },
    { name: 'MongoDB', icon: 'fas fa-database', level: 80, category: 'backend' },
    { name: 'MySQL', icon: 'fas fa-database', level: 85, category: 'backend' },
    { name: 'REST API', icon: 'fas fa-exchange-alt', level: 90, category: 'backend' }
  ];

  protected readonly toolsSkills: Skill[] = [
    { name: 'Git & GitHub', icon: 'fab fa-git-alt', level: 90, category: 'tools' },
    { name: 'Webpack', icon: 'fas fa-cube', level: 75, category: 'tools' },
    { name: 'Karma & Jasmine', icon: 'fas fa-vial', level: 80, category: 'tools' },
    { name: 'Agile & Jira', icon: 'fas fa-tasks', level: 85, category: 'tools' },
    { name: 'SEO', icon: 'fas fa-search', level: 80, category: 'tools' },
    { name: 'Google Maps API', icon: 'fas fa-map-location-dot', level: 75, category: 'tools' }
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
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      );

      this.observer.observe(this.skillsSection.nativeElement);

      // Mobile/tablet fallback: ensure visibility shortly after load
      const isSmallScreen = window.innerWidth <= 992;
      if (isSmallScreen) {
        setTimeout(() => {
          if (!this.isVisible()) {
            this.isVisible.set(true);
          }
        }, 300);
      }
    }
  }

  protected trackBySkill(index: number, skill: Skill): string {
    return skill.name;
  }

  protected getAnimationDelay(skill: Skill): number {
    const allSkills = [...this.frontendSkills, ...this.backendSkills, ...this.toolsSkills];
    const index = allSkills.findIndex(s => s.name === skill.name);
    return index * 100;
  }
}
