import { createRouter, createWebHistory } from 'vue-router'
import {authService} from "../@services/auth";

import { defineAsyncComponent } from "vue";
import Home from "../components/Home.vue";
const AsyncEdit = defineAsyncComponent({
  loader: () => import("../components/Edit.vue" /* webpackChunckName: "Edit"*/)
})
const AsyncLogin = defineAsyncComponent({
  loader: () => import("../components/Login.vue" /* webpackChunckName: "Login"*/)
})
const AsyncRegister = defineAsyncComponent({
  loader: () => import("../components/Regiter.vue" /* webpackChunckName: "Register"*/)
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
    component: Home
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
