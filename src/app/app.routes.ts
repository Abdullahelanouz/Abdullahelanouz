import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home.component').then(m => m.HomeComponent) },
  { 
    path: 'blog/:slug', 
    loadComponent: () => import('./components/blog/blog-details.component').then(m => m.BlogDetailsComponent),
    data: { preload: true }
  },
  {
    path: 'services/:service/:city',
    loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'courses/:course/:city',
    loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent)
  },
];
