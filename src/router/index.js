import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'
import store from '@/store'; // Import Vuex store-a
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Route guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //Check ako je user autenticiran
    const isAuthenticated = store.state.isAuthenticated; // Assuming your store has an "isAuthenticated" state

    if (!isAuthenticated) {
      next({ name: 'Login' }); //Redirect na login
    } else {
      next(); //User je autenticiran, nastavi na requestanu routu
    }
  } else {
    next(); //Routa ne trayi autentikaciju, nastavi normalno
  }
});

export default router
