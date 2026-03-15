import { Component, inject, output } from '@angular/core';
import { ALL_CHAPTERS } from '../../core/data/article-final.data';
import { ScrollSpyService } from '../../core/services/scroll-spy';

@Component({
  selector: 'app-sidebar',
  imports: [],
  template: `
    <nav class="p-6 h-full text-sm">
      <h3 class="font-bold text-text-muted uppercase tracking-wider mb-6">Inhaltsverzeichnis</h3>
      <ul class="flex flex-col gap-3">
        @for (chapter of chapters; track chapter.id) {
          <li>
            <a [href]="'#' + chapter.id" 
               (click)="linkClicked.emit()"
               class="block transition-colors font-medium leading-tight hover:text-signal"
               [class.text-signal]="isActive(chapter.id)"
               [class.text-text-main]="!isActive(chapter.id)">
              {{ chapter.title }}
            </a>
            
            @if (chapter.sections.length > 0) {
              <ul class="mt-2 ml-4 flex flex-col gap-2 border-l border-surface/50 pl-3">
                @for (section of chapter.sections; track section.id) {
                  <li>
                    <a [href]="'#' + section.id" 
                       (click)="linkClicked.emit()"
                       class="block transition-colors line-clamp-2 hover:text-threema"
                       [class.text-threema]="isActive(section.id)"
                       [class.font-semibold]="isActive(section.id)"
                       [class.text-text-muted]="!isActive(section.id)">
                      {{ section.title }}
                    </a>
                  </li>
                }
              </ul>
            }
          </li>
        }
      </ul>
    </nav>
  `,
  styles: ``
})
export class Sidebar {
  chapters = ALL_CHAPTERS;
  linkClicked = output<void>();
  private scrollSpy = inject(ScrollSpyService);

  isActive(id: string): boolean {
    return this.scrollSpy.activeSectionId() === id;
  }
}
