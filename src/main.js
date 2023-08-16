import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import your Vuex store

createApp(App)
  .use(router)
  .use(store) // Use your Vuex store
  .mount('#app');