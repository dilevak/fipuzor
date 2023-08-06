import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/home-page.vue';
import Login from '../components/LoginVieww.vue';
import Register from '../components/register.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
