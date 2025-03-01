<template>
  <div>
    <h1>News du flux</h1>
    <select v-model="limit">
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="All">Tout</option>
    </select>
    <ul>
      <li v-for="news in limitedNews" :key="news.id">
        <router-link :to="'/news/' + news.id">{{ news.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { fetchRSS } from '@/utils/fetchRSS';

const newsList = ref([]);
const limit = ref(10);

const fetchNews = async (url) => {
  const xml = await fetchRSS(url);
  newsList.value = [...xml.querySelectorAll('item')].map(item => ({
    id: item.querySelector('guid').textContent,
    title: item.querySelector('title').textContent,
  }));
};

const limitedNews = computed(() =>
  limit.value === 'All' ? newsList.value : newsList.value.slice(0, limit.value)
);
</script>
