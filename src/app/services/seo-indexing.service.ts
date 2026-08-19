import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SeoIndexingService {
  private readonly router = inject(Router);

  // IndexNow key and keyLocation (already present on site root)
  private readonly indexNowKey = '20cee54e173141ccb6f3452f69ca2942';
  private readonly keyLocation = 'https://abdullahelanouz.netlify.app/20cee54e173141ccb6f3452f69ca2942.txt';

  private readonly storageKey = 'indexnow:lastPing';
  private readonly throttleMs = 12 * 60 * 60 * 1000; // 12 hours

  init() {
    // Ping on app start (homepage)
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      this.tryPing([currentUrl, this.absoluteUrl('/sitemap.xml')]);
    }

    // Ping on route changes (landing pages etc.)
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        // Only ping for real navigations, throttle
        if (typeof window !== 'undefined') {
          const url = window.location.origin + ev.urlAfterRedirects;
          this.tryPing([url]);
        }
      }
    });
  }

  private tryPing(urls: string[]) {
    const now = Date.now();
    const last = Number(localStorage.getItem(this.storageKey) || 0);
    if (now - last < this.throttleMs) return;

    // Update last ping time immediately to avoid duplicates
    localStorage.setItem(this.storageKey, String(now));

    this.pingIndexNow(urls).catch(() => {
      // If fails, relax throttle to allow next attempt in 1 hour
      localStorage.setItem(this.storageKey, String(now - (this.throttleMs - 60 * 60 * 1000)));
    });
  }

  private async pingIndexNow(urls: string[]): Promise<void> {
    const body = {
      host: 'abdullahelanouz.netlify.app',
      key: this.indexNowKey,
      keyLocation: this.keyLocation,
      urlList: urls
    };

    const headers = { 'Content-Type': 'application/json' };

    // Submit to both Bing and the shared IndexNow endpoint
    const endpoints = [
      'https://www.bing.com/indexnow',
      'https://api.indexnow.org/indexnow'
    ];

    await Promise.allSettled(
      endpoints.map(ep => fetch(ep, { method: 'POST', headers, body: JSON.stringify(body) }))
    );
  }

  private absoluteUrl(path: string) {
    if (typeof window === 'undefined') return `https://abdullahelanouz.netlify.app${path}`;
    return window.location.origin + path;
  }
}
