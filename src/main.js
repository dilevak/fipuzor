import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
//import { createRouter, createWebHistory } from 'vue-router';

//import SignupView from './views/SignupView.vue';
//import LoginView from './views/LoginView.vue';

/*
const router = createRouter({
    history: createWebHistory(),
    routes: [
      // Definiranje ruta
      { path: '/SignupView', component: SignupView }, //Ruta za Signup page
      { path: '/LoginView', component: LoginView }, //Ruta za Login page
    ],
  });
*/  

const app = createApp(App);
app.use(router);
app.mount('#app');