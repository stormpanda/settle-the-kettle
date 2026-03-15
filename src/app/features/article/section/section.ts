import { Component, input } from '@angular/core';
import { Section } from '../../../core/models/article';
import { ComparisonTableComponent } from '../comparison-table/comparison-table';

@Component({
  selector: 'app-section',
  imports: [ComparisonTableComponent],
  template: `
    <section [id]="section().id" class="mb-12">
      <h3 class="text-2xl font-bold mb-4 text-signal">{{ section().title }}</h3>
      
      <div class="prose prose-invert max-w-none text-text-main prose-p:leading-relaxed prose-a:text-signal hover:prose-a:text-threema"
           [innerHTML]="section().content">
      </div>

      @if (section().table) {
        <div class="mt-8">
          <app-comparison-table [table]="section().table!"></app-comparison-table>
        </div>
      }
    </section>
  `,
  styles: ``
})
export class SectionComponent {
  section = input.required<Section>();
}
