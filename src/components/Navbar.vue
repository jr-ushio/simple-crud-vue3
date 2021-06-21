<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand">Vue 3</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item active">
              <a class="nav-link btn btn-link" @click="router.push('/')">Home</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link btn btn-link" @click="router.push('/login')">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link btn btn-link" @click="router.push('/register')">Register</a>
            </li>
          </ul>
        </div>
    </div>
  </nav>
</template>

<script>
import router from "../@helpers/router";

export default {
  name: 'Navbar',
  props: {},
  data() {
    return {
      router
    }
  },
  methods: {
  }
}
</script>
