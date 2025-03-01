
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import FluxList from '@/views/FluxList.vue';
import NewsDetails from '@/views/NewsDetails.vue';
import Preferences from '@/views/Preferences.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/flux', component: FluxList },
  { path: '/news/:id', component: NewsDetails },
  { path: '/preferences', component: Preferences },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
