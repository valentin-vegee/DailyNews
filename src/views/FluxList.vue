<template>
    <div>
      <h1>Liste des flux RSS</h1>
      <FluxForm :fluxToEdit="selectedFlux" @flux-saved="clearSelectedFlux" />
      
      <ul>
        <li v-for="flux in store.fluxList" :key="flux.id">
          <span>{{ flux.title }}</span>
          <button @click="store.removeFlux(flux.id)">❌ Supprimer</button>
          <button @click="editFlux(flux)">✏️ Modifier</button>
          <router-link :to="'/flux/' + flux.id + '/news'">📖 Voir les news</router-link>
        </li>
      </ul>
  
      <button @click="$router.push('/')">🏠 Retour à l'accueil</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRssStore } from '@/store/rssStore';
  import FluxForm from '@/components/FluxForm.vue';
  
  const store = useRssStore();
  const selectedFlux = ref(null);
  
  const editFlux = (flux) => {
    selectedFlux.value = { ...flux }; 
  };
  
  const clearSelectedFlux = () => {
    selectedFlux.value = null;
  };
  </script>
  