<template>
    <div v-if="flux">
      <h1>{{ flux.title }}</h1>
      <div v-if="feedItems.length">
        <ul>
          <li v-for="item in feedItems" :key="item.guid">
            <h2>{{ item.title }}</h2>
            <p v-html="item.description"></p>
            <small>{{ item.pubDate }}</small>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun article trouvé dans ce flux.</p>
      </div>
      <button @click="store.addToPreferences(flux)">⭐ Sauvegarder ce flux</button>
      <router-link to="/flux">🔙 Retour aux flux</router-link>
    </div>
    <div v-else>
      <h1>Flux introuvable</h1>
      <p>Impossible de trouver ce flux. Vérifiez que vous avez bien sélectionné un flux RSS.</p>
      <router-link to="/">Retour à l'accueil</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useRssStore } from '@/store/rssStore';
  import { fetchRSS } from '@/utils/fetchRSS';
  
  const route = useRoute();
  const router = useRouter();
  const store = useRssStore();
  
  const flux = ref(null);
  const feedItems = ref([]);
  
  onMounted(async () => {
    flux.value = store.fluxList.find(f => f.id == route.params.id) || null;
    
    if (!flux.value) {
      setTimeout(() => {
        router.push('/not-found');
      }, 2000);
      return;
    }
    
    try {
      const xmlDoc = await fetchRSS(flux.value.url);
      feedItems.value = Array.from(xmlDoc.querySelectorAll("item")).map(item => ({
        title: item.querySelector("title")?.textContent || '',
        description: item.querySelector("description")?.textContent || '',
        guid: item.querySelector("guid")?.textContent || item.querySelector("link")?.textContent || '',
        pubDate: item.querySelector("pubDate")?.textContent || ''
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération du flux RSS :", error);
    }
  });
  </script>
  