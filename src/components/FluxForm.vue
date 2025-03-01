<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="title" placeholder="Nom du flux" required />
    <input v-model="url" placeholder="URL du flux" required />
    <button type="submit">{{ isEdit ? 'Modifier' : 'Ajouter' }}</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRssStore } from '@/store/rssStore';

const store = useRssStore();
const title = ref('');
const url = ref('');
const isEdit = ref(false);

const handleSubmit = () => {
  if (!title.value || !url.value) {
    alert('Tous les champs sont obligatoires !');
    return;
  }
  if (isEdit.value) {
    store.updateFlux({ title: title.value, url: url.value });
  } else {
    store.addFlux({ id: Date.now(), title: title.value, url: url.value });
  }
};
</script>
