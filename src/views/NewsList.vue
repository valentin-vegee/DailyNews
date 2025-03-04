<template>
  <div>
    <div v-if="store.currentFlux">
      <h1>News du flux : {{ store.currentFlux.title }}</h1>
      
      <select v-model="limit">
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="All">Tout</option>
      </select>

      <ul>
        <li v-for="news in limitedNews" :key="news.id">
          <span>{{ news.title }}</span>
          <router-link 
            :to="'/news-details/' + news.id" 
            @click="selectNews(news)"
          >👁️ Voir</router-link>
          <button @click="store.addToPreferences(news)">⭐ Sauvegarder</button>
        </li>
      </ul>

      <router-link to="/flux">🔙 Retour aux flux</router-link>
    </div>
    <div v-else>
      <p>Aucun flux sélectionné ou introuvable.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRssStore } from '@/store/rssStore';
import { fetchRSS } from '@/utils/fetchRSS';

const route = useRoute();
const store = useRssStore();
const newsList = ref([]);
const limit = ref(10);

onMounted(async () => {
  const flux = store.fluxList.find(f => f.id == route.params.id);
  if (flux) {
    store.currentFlux = flux;
    try {
      const xml = await fetchRSS(flux.url);
      const items = xml.querySelectorAll('item');
      newsList.value = [...items].map(item => ({
        id: item.querySelector('guid')?.textContent || Date.now().toString(),
        title: item.querySelector('title')?.textContent || 'Titre inconnu',
        content: item.querySelector('description')?.textContent || '',
        image: item.querySelector('enclosure')?.getAttribute('url') || '',
      }));
    } catch (error) {
      console.error("Erreur de récupération du flux RSS :", error);
    }
  }
});

const limitedNews = computed(() => 
  limit.value === 'All' ? newsList.value : newsList.value.slice(0, limit.value)
);

const selectNews = (news) => {
  store.setCurrentNews(news);
};
</script>


