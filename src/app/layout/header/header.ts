import { Component, output, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    'class': 'block sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out',
    '[class.-translate-y-full]': 'isHidden()'
  },
  template: `
    <header class="w-full border-b border-surface bg-bg-dark/90 backdrop-blur-md">
      <div class="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <a href="#" class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-signal to-threema text-white font-bold">
            S
          </div>
          <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-signal to-threema hidden sm:inline-block">
            Security Analysis 2026
          </span>
          <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-signal to-threema sm:hidden">
            Analysis 2026
          </span>
        </a>

        <button (click)="toggleMenu.emit()" class="md:hidden p-2 text-text-muted hover:text-signal transition-colors" aria-label="Menu öffnen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  `,
  styles: ``
})
export class Header {
  toggleMenu = output<void>();
  isHidden = signal(false);
  private lastScrollY = 0;

  onScroll() {
    if (typeof window === 'undefined') return;
    
    const currentScrollY = window.scrollY;
    
    // Header only hides if scrolled decently past its own height
    if (currentScrollY > 64) {
      if (currentScrollY > this.lastScrollY && !this.isHidden()) {
        // Scrolling down
        this.isHidden.set(true);
      } else if (currentScrollY < this.lastScrollY && this.isHidden()) {
        // Scrolling up
        this.isHidden.set(false);
      }
    } else {
      // Always show at the absolute top
      this.isHidden.set(false);
    }
    
    this.lastScrollY = currentScrollY;
  }
}
