import { defineStore } from 'pinia';

export const useRssStore = defineStore('rss', {
  state: () => ({
    fluxList: JSON.parse(localStorage.getItem('fluxList')) || [],
  }),
  actions: {
    addFlux(newFlux) {
      this.fluxList.push(newFlux);
      localStorage.setItem('fluxList', JSON.stringify(this.fluxList));
    },
    removeFlux(id) {
      this.fluxList = this.fluxList.filter(flux => flux.id !== id);
      localStorage.setItem('fluxList', JSON.stringify(this.fluxList));
    },
    updateFlux(updatedFlux) {
      const index = this.fluxList.findIndex(f => f.id === updatedFlux.id);
      if (index !== -1) {
        this.fluxList[index] = updatedFlux;
        localStorage.setItem('fluxList', JSON.stringify(this.fluxList));
      }
    },
    preferences: JSON.parse(localStorage.getItem('preferences')) || [],
    addToPreferences(news) {
        if (!this.preferences.some(n => n.id === news.id)) {
            this.preferences.push(news);
            localStorage.setItem('preferences', JSON.stringify(this.preferences));
        }
    },
    removeFromPreferences(id) {
        this.preferences = this.preferences.filter(n => n.id !== id);
        localStorage.setItem('preferences', JSON.stringify(this.preferences));
    }
  },
});
