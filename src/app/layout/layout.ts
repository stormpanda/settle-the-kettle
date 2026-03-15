import { Component } from '@angular/core';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [Header, Sidebar],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header></app-header>
      
      <div class="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row relative">
        <app-sidebar class="hidden md:block w-64 shrink-0 border-r border-surface sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto"></app-sidebar>
        
        <main class="flex-1 px-4 py-8 md:px-8 xl:px-12 w-full max-w-3xl lg:max-w-4xl">
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `,
  styles: ``
})
export class Layout {}
