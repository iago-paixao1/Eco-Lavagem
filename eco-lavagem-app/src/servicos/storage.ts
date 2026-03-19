import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getItem<T>(key: string): T | null {
    if (!this.isBrowser) return null;

    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setItem<T>(key: string, value: T): void {
    if (!this.isBrowser) return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    if (!this.isBrowser) return;

    localStorage.removeItem(key);
  }

  clear(): void {
    if (!this.isBrowser) return;

    localStorage.clear();
  }
}