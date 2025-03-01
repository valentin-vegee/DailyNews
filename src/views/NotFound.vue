<template>
    <div class="not-found">
      <h1>404 - Page non trouvée</h1>
      <p>Oups ! La page que vous cherchez n'existe pas.</p>
      <router-link to="/">Retour à l'accueil</router-link>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding: 20px;
  }
  h1 {
    color: red;
  }
  </style>
  