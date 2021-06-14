import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/Home.vue";
import {authService} from "../@services/auth";

import { ref, defineAsyncComponent } from "vue";
const AsyncEdit = defineAsyncComponent({
  loader: () => import("../components/Edit.vue" /* webpackChunckName: "Edit"*/),
  loadingComponent: "<h1>CARGANDO...</h1>",
})
const AsyncLogin = defineAsyncComponent({
  loader: () => import("../components/Login.vue" /* webpackChunckName: "Login"*/),
  loadingComponent: "<h1>CARGANDO...</h1>",
})
const AsyncRegister = defineAsyncComponent({
  loader: () => import("../components/Regiter.vue" /* webpackChunckName: "Register"*/),
  loadingComponent: "<h1>CARGANDO...</h1>",
})
const AsyncHome = defineAsyncComponent({
  loader: () => import("../components/Home.vue" /* webpackChunckName: "Home"*/),
  loadingComponent: "<h1>CARGANDO...</h1>",
})

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: AsyncLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: AsyncRegister
  },
  {
    path: '/',
    name: 'Home',
    component: AsyncHome
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: AsyncEdit,
    props: true
  }
]

const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => {
  const currentUser = authService.currentUserValue;
  if (to.name !== 'Login' && !currentUser) {
    return next({ path: '/login' });
  }
  next();
})
export default router
