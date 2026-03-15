import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {
  private activeSection = signal<string>('');
  private observer: IntersectionObserver | null = null;

  // Expose als readonly signal
  public readonly activeSectionId = this.activeSection.asReadonly();

  initScrollSpy(elementIds: string[]) {
    // Falls wir serverseitig rendern, überspringen wir IntersectionObserver
    if (typeof window === 'undefined') return;

    // Optionen: Root ist Viewport, -100px bis Mitte, damit IDs genauer beim Scrollen matchen
    const options = {
      root: null,
      rootMargin: '-10% 0px -60% 0px',
      threshold: 0
    };

    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver((entries) => {
      // Filtern nach einsehbaren Elementen
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Nimm das oberste sichtbare Element als aktiven Anker
        this.activeSection.set(visibleEntries[0].target.id);
      }
    }, options);

    // Initialisiere die Beobachtung im nächsten Tick (damit DOM gezeichnet ist)
    setTimeout(() => {
      elementIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          this.observer!.observe(el);
        }
      });
    }, 100);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
