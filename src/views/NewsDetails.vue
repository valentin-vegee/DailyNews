<template>
    <div v-if="news">
      <h1>{{ news.title }}</h1>
      <img v-if="news.image" :src="news.image" alt="Image de l'actualité" />
      <p>{{ news.content }}</p>
      <button @click="addToPreferences">Sauvegarder</button>
      <router-link to="/flux">Retour aux flux</router-link>
    </div>
    <div v-else>
      <h1>News introuvable</h1>
      <router-link to="/">Retour à l'accueil</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useRssStore } from '@/store/rssStore';
  
  const route = useRoute();
  const router = useRouter();
  const store = useRssStore();
  const news = ref(null);
  
  onMounted(() => {
    const newsId = route.params.id;
    news.value = store.newsList.find(n => n.id == newsId) || null;
  
    if (!news.value) {
      setTimeout(() => {
        router.push('/not-found');
      }, 2000);
    }
  });
  
  const addToPreferences = () => {
    store.addToPreferences(news.value);
    alert("News ajoutée aux préférences !");
  };
  </script>
  
  <style scoped>
  img {
    max-width: 100%;
    height: auto;
    margin: 10px 0;
  }
  </style>
  