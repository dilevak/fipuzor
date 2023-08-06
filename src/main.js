import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import SignupView from './components/SignupView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Definiranje ruta
    { path: '/SignupView', component: SignupView }, //Ruta za Signup page
  ],
});

const app = createApp(App);
app.use(router);
app.mount('#app');