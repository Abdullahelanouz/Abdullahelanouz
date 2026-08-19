import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const slugs = [
        'why-choose-me-for-web-development',
        'digital-marketing-strategies-egypt',
        'seo-best-practices-arabic-websites',
        'ecommerce-development-middle-east',
        'angular-vs-react-which-to-choose',
        'nodejs-performance-optimization',
        'learn-programming-basics-arabic',
        'advance-programming-paths-ar',
        'seo-for-programmers-ar',
        'digital-marketing-coders-ar',
        'geo-targeting-ar'
      ];
      return slugs.map(slug => ({ slug }));
    }
  },
  {
    path: 'services/:service/:city',
    renderMode: RenderMode.Server
  },
  {
    path: 'courses/:course/:city',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
