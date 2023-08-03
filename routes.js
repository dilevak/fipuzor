// Import Vue and Vue Router
import Vue from 'vue';
import VueRouter from 'vue-router';

// Import your Vue components for each route
import Home from './views/Home.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';

// Use Vue Router
Vue.use(VueRouter);

// Define your routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
];

// Create a new VueRouter instance
const router = new VueRouter({
  mode: 'history', // Use history mode for clean URLs (remove the hash # from URLs)
  routes, // Pass the defined routes to the router
});

export default router;