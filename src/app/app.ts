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
        <p class="text-text-muted text-xl md:text-2xl font-light border-l-4 border-surface pl-4 mb-8">
          Die Evolution der digitalen Privatsphäre und asynchronen Verschlüsselung im Jahr 2026.
        </p>

        <a href="/sicherheitsanalyse_signal_threema.md" target="_blank"
           class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface hover:bg-surface-light border border-surface-light transition-colors text-text-main font-medium group w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-text-muted group-hover:text-signal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Original-Dokument (.md)
        </a>
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
