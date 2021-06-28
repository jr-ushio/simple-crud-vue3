<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" @click="router.push('/')">Vue 3</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
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
  <div>
    <a class="nav-link btn btn-link" v-if="modoOffline" @click="cambiarModoOnline(false)">Offline</a>
    <a class="nav-link btn btn-link" v-if="!modoOffline" @click="cambiarModoOnline(true)">Online</a>
  </div>
</template>

<script>
import router from "../@helpers/router";
import { openDB } from 'idb';

export default {
  name: 'Navbar',
  props: {},
  data() {
    return {
      router,
      db: null,
      modoOffline: false
    }
  },
  mounted() {
    this.initDB()
  },
  methods: {
    async initDB() {
      this.db = await openDB('SmartClicDB', 1, {
        upgrade(db) {
          const store = db.createObjectStore('offline', {
            keyPath: 'id',
            // autoIncrement: true,
          });
          store.createIndex('status', 'status');

          const store1 = db.createObjectStore('usuarios', {
            keyPath: 'id'
          });
          store1.createIndex('id', 'id');
          store1.createIndex('nombres', 'nombres');
          store1.createIndex('apellidos', 'apellidos');
          store1.createIndex('usuario', 'usuario');
        },
      });

      // this.db.add('offline', {id: 1, status: true})
      this.obtenerModoOnline()
    },
    async cambiarModoOnline(estado) {
      await this.db.put('offline', { id: 1, status: estado})
      this.obtenerModoOnline()
    },
    async obtenerModoOnline() {
      const value = await this.db.get('offline', 1);
      if (value) {
        this.modoOffline = value.status
      }
    }
  }
}
</script>
