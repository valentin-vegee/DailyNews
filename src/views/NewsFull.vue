
<template>
    <div v-if="news">
      <button @click="store.addToPreferences(news)">⭐ Sauvegarder</button>
      <h1>{{ news.title }}</h1>
      <div v-if="news.content">
        <p v-html="news.content"></p>
      </div>
      <div v-if="news.image">
        <img :src="news.image" alt="Image de la news" />
      </div>
      <router-link to="/flux">🔙 Retour aux flux</router-link>
    </div>
    <div v-else>
      <h1>News non trouvée</h1>
      <router-link to="/flux">Retour aux flux</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useRssStore } from '@/store/rssStore';
  
  const route = useRoute();
  const store = useRssStore();
  const news = ref(null);
  
  onMounted(() => {
    const id = route.params.id;
    if (store.currentNews && store.currentNews.id == id) {
      news.value = store.currentNews;
    } else {
      news.value = store.preferences.find(n => n.id == id) || null;
    }
  });
  </script>
  

