import { Component, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { Layout } from './layout/layout';
import { ALL_CHAPTERS } from './core/data/article-final.data';
import { ChapterComponent } from './features/article/chapter/chapter';
import { ScrollSpyService } from './core/services/scroll-spy';

@Component({
  selector: 'app-root',
  imports: [Layout, ChapterComponent],
  template: `
    <app-layout>
      <header class="mb-16">
        <div class="text-signal font-mono text-sm tracking-widest uppercase mb-4">Threat Analysis Report</div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-signal to-threema mb-6 leading-tight">
          Sicherheitsanalyse:<br/>Signal vs. Threema
        </h1>
        <p class="text-text-muted text-xl md:text-2xl font-light border-l-4 border-surface pl-4">
          Die Evolution der digitalen Privatsphäre und asynchronen Verschlüsselung im Jahr 2026.
        </p>
      </header>

      <div class="flex flex-col gap-8">
        @for (chapter of chapters; track chapter.id) {
          <app-chapter [chapter]="chapter"></app-chapter>
        }
      </div>
    </app-layout>
  `,
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  title = 'settle-the-kettle';
  chapters = ALL_CHAPTERS;
  private scrollSpy = inject(ScrollSpyService);

  ngAfterViewInit() {
    // Sammle alle IDs, um sie zu überwachen
    const idsToWatch: string[] = [];
    
    this.chapters.forEach(chapter => {
      idsToWatch.push(chapter.id);
      chapter.sections.forEach(section => {
        idsToWatch.push(section.id);
      });
    });

    this.scrollSpy.initScrollSpy(idsToWatch);
  }

  ngOnDestroy() {
    this.scrollSpy.destroy();
  }
}
