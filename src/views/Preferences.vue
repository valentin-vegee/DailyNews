<template>
    <input v-model="search" placeholder="Rechercher une news..." />
    <ul>
      <li v-for="news in filteredPreferences" :key="news.id">{{ news.title }}</li>
    </ul>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRssStore } from '@/store/rssStore';
  
  const store = useRssStore();
  const search = ref('');
  
  const filteredPreferences = computed(() =>
    store.preferences.filter(news => news.title.includes(search.value))
  );
  </script>
  