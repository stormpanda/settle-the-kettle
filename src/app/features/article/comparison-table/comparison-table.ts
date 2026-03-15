import { Component, input } from '@angular/core';
import { ComparisonTable } from '../../../core/models/article';

@Component({
  selector: 'app-comparison-table',
  imports: [],
  template: `
    <div class="my-8 overflow-hidden rounded-xl border border-surface bg-bg-dark/50 shadow-lg shadow-black/20">
      <div class="bg-surface px-6 py-4 border-b border-surface/50">
        <h4 class="text-xl font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {{ table().title }}
        </h4>
      </div>
      
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 pb-4 border-b border-surface/50 hidden md:grid">
          <div class="font-semibold text-text-muted">Eigenschaft</div>
          <div class="font-bold text-signal flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-signal"></div> Signal
          </div>
          <div class="font-bold text-threema flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-threema"></div> Threema
          </div>
        </div>

        <div class="flex flex-col gap-6">
          @for (row of table().rows; track row.label) {
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start rounded-lg p-4 md:p-0 bg-surface/30 md:bg-transparent">
              <div class="font-medium flex items-center gap-2">
                <span class="md:hidden text-text-muted text-sm">Eigenschaft:</span>
                {{ row.label }}
              </div>
              
              <div class="flex flex-col gap-1">
                <span class="md:hidden font-bold text-signal text-sm">Signal</span>
                <span class="text-sm leading-relaxed">{{ row.signal }}</span>
              </div>
              
              <div class="flex flex-col gap-1">
                <span class="md:hidden font-bold text-threema text-sm">Threema</span>
                <span class="text-sm leading-relaxed">{{ row.threema }}</span>
              </div>
              
              @if (row.verdict) {
                <div class="md:col-span-3 mt-2 md:mt-0 bg-surface/50 rounded flex items-center px-3 py-1.5 text-xs font-medium border border-surface">
                  <span class="text-text-muted mr-2">Fazit:</span>
                  <span class="text-gray-300">{{ row.verdict }}</span>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class ComparisonTableComponent {
  table = input.required<ComparisonTable>();
}
