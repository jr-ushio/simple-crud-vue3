import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from "../components/Home.vue";
import Regiter from "../components/Regiter.vue";
import Edit from "../components/Edit.vue";
import {authService} from "../@services/auth";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Regiter
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    props: true
  }
]

const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => {
  const currentUser = authService.currentUserValue;
  if (to.name !== 'login' && !currentUser) {
    return next({ path: '/login' });
  }
  next();
})
export default router
