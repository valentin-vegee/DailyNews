<template>
  <h1>Mes News Sauvegardées</h1>
  <input v-model="search" placeholder="Rechercher une news..." />
  
  <ul v-if="store.preferences.length > 0">
    <li v-for="news in filteredPreferences" :key="news.id">
      <router-link :to="'/news-details/' + news.id">{{ news.title }}</router-link>
      <button @click="store.removeFromPreferences(news.id)">❌ Supprimer</button>
    </li>
  </ul>
  
  <p v-else>Aucune news sauvegardée.</p>

  <button @click="$router.push('/')">🏠 Retour à l'accueil</button>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRssStore } from '@/store/rssStore';

const store = useRssStore();
const search = ref('');

const filteredPreferences = computed(() => 
  Array.isArray(store.preferences)
    ? store.preferences.filter(news => 
        news.title.includes(search.value) || news.content.includes(search.value)
      )
    : []
);
</script>
