
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import FluxList from '@/views/FluxList.vue';
import NewsDetails from '@/views/NewsDetails.vue';
import Preferences from '@/views/Preferences.vue';
import NotFound from '@/views/NotFound.vue';
import NewsList from '@/views/NewsList.vue';
import NewsFull from '@/views/NewsFull.vue';



const routes = [
  { path: '/', component: Home },
  { path: '/flux', component: FluxList },
  { path: '/flux/:id/news', component: NewsList },
  { path: '/news-details/:id', component: NewsFull },
  { path: '/preferences', component: Preferences },
  { path: '/:pathMatch(.*)*', component: NotFound },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
