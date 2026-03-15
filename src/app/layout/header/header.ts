import { Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-surface bg-bg-dark/80 backdrop-blur-md">
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
}
