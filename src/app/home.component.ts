import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeachingComponent } from './components/teaching/teaching.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    TeachingComponent,
    BlogComponent,
    ContactComponent
  ],
  template: `
    <app-hero></app-hero>

   

    <app-about></app-about>
    <app-skills></app-skills>
    <app-projects></app-projects>
    <app-teaching></app-teaching>
    <app-blog></app-blog>
    <app-contact></app-contact>
     <!-- Internal GEO Links Block -->
     <section class="section">
      <div class="container">
        <div class="card" style="margin-bottom: 2rem;">
          <h3 class="section-title">روابط سريعة: الخدمات والكورسات حسب المدينة</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.5rem;">
            <a [routerLink]="['/services/seo','cairo']" class="btn btn-outline">SEO في القاهرة</a>
            <a [routerLink]="['/services/web-development','riyadh']" class="btn btn-outline">برمجة مواقع في الرياض</a>
            <a [routerLink]="['/services/seo','dubai']" class="btn btn-outline">SEO في دبي</a>
            <a [routerLink]="['/services/marketing','jeddah']" class="btn btn-outline">تسويق إلكتروني في جدة</a>
            <a [routerLink]="['/services/ads','kuwait']" class="btn btn-outline">إعلانات ممولة في الكويت</a>
            <a [routerLink]="['/courses/angular','riyadh']" class="btn btn-outline">كورس Angular في الرياض</a>
            <a [routerLink]="['/courses/full-stack','cairo']" class="btn btn-outline">كورس Full Stack في القاهرة</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {}
