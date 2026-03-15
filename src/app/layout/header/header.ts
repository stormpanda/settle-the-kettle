import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-surface bg-bg-dark/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto flex h-16 items-center px-4 md:px-8">
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
      </div>
    </header>
  `,
  styles: ``
})
export class Header {}
