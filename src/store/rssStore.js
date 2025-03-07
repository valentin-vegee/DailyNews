import { defineStore } from 'pinia';

export const useRssStore = defineStore('rss', {
  state: () => ({
    fluxList: JSON.parse(localStorage.getItem('fluxList')) || [],
    preferences: JSON.parse(localStorage.getItem('preferences')) || [],
    currentFlux: null,
  }),
  actions: {
   
    addFlux(newFlux) {
      const duplicate = this.fluxList.find(flux =>
        flux.url.toLowerCase() === newFlux.url.toLowerCase() ||
        flux.title.toLowerCase() === newFlux.title.toLowerCase()
      );
    
      if (duplicate) {
        alert("Ce flux existe déjà !");
        return;
      }
    
      this.fluxList.push(newFlux);
      localStorage.setItem('fluxList', JSON.stringify(this.fluxList));
    },
    
    removeFlux(id) {
      this.fluxList = this.fluxList.filter(flux => flux.id !== id);
      localStorage.setItem('fluxList', JSON.stringify(this.fluxList));
      
      if (Array.isArray(this.preferences)) {
        this.preferences = this.preferences.filter(news => news.fluxId !== id);
        localStorage.setItem('preferences', JSON.stringify(this.preferences));
      }
    },
    updateFlux(updatedFlux) {
      const index = this.fluxList.findIndex(f => f.id === updatedFlux.id);
      if (index !== -1) {
        this.fluxList[index] = updatedFlux;
        localStorage.setItem('fluxList', JSON.stringify(this.fluxList));
      }
    },
    addToPreferences(news) {
      if (!news.fluxId && this.currentFlux) {
        news.fluxId = this.currentFlux.id;
      }
      if (!this.preferences.some(n => n.id === news.id)) {
        this.preferences.push(news);
        localStorage.setItem('preferences', JSON.stringify(this.preferences));
      }
    },
    removeFromPreferences(id) {
      this.preferences = this.preferences.filter(n => n.id !== id);
      localStorage.setItem('preferences', JSON.stringify(this.preferences));
    },
    setCurrentNews(news) {  
      this.currentNews = news;
    },
  },
});


