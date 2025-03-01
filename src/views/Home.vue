<template>
  <div class="home">
    <h1>Bienvenue sur DailyNews</h1>
    <p>Gérez vos flux RSS et lisez vos actualités en un seul endroit.</p>

    <nav>
      <router-link to="/flux">📌 Voir mes flux RSS</router-link>
      <router-link to="/preferences">⭐ Mes préférences</router-link>
    </nav>
  </div>
</template>

<script setup></script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}
nav {
  margin-top: 20px;
}
router-link {
  display: block;
  margin: 10px 0;
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
