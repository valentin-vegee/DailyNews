<template>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.title" placeholder="Nom du flux" required />
      <input v-model="formData.url" placeholder="URL du flux" required />
      <button type="submit">{{ formData.id ? 'Modifier' : 'Ajouter' }}</button>
    </form>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRssStore } from '@/store/rssStore';
  
  const store = useRssStore();
  const props = defineProps(['fluxToEdit']);
  const emit = defineEmits(['flux-saved']);
  
  const formData = ref({ title: '', url: '', id: null });
  
  watch(() => props.fluxToEdit, (newVal) => {
    if (newVal) formData.value = { ...newVal };
  }, { deep: true });
  
  const isValidURL = (url) => {
  const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return regex.test(url);
};

const handleSubmit = () => {
  if (!formData.value.title || !formData.value.url) {
    alert("Tous les champs sont obligatoires !");
    return;
  }
  if (!isValidURL(formData.value.url)) {
    alert("Le format de l'URL est invalide !");
    return;
  }
  if (formData.value.id) {
    store.updateFlux(formData.value);
  } else {
    store.addFlux({ id: Date.now(), title: formData.value.title, url: formData.value.url });
  }
  emit('flux-saved');
  formData.value = { title: '', url: '', id: null };
};



  </script>
  