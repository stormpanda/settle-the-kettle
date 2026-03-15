import { Component, input } from '@angular/core';
import { Chapter } from '../../../core/models/article';
import { SectionComponent } from '../section/section';

@Component({
  selector: 'app-chapter',
  imports: [SectionComponent],
  template: `
    <article [id]="chapter().id" class="mb-20 pt-8 border-t border-surface scroll-mt-24">
      <h2 class="text-3xl font-extrabold mb-8">{{ chapter().title }}</h2>
      
      @for (section of chapter().sections; track section.id) {
        <app-section [section]="section"></app-section>
      }
    </article>
  `,
  styles: ``
})
export class ChapterComponent {
  chapter = input.required<Chapter>();
}
