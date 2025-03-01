<template>
    <div>
      <h1>Liste des flux RSS</h1>
      <FluxForm />
      <ul>
        <li v-for="flux in store.fluxList" :key="flux.id">
          <span>{{ flux.title }}</span>
          <button @click="store.removeFlux(flux.id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useRssStore } from '@/store/rssStore';
  import FluxForm from '@/components/FluxForm.vue';
  
  const store = useRssStore();
  </script>
  