<template>
  <nav class="navbar navbar-expand-lg navbar-dark" :class="{ 'bg-primary': !modoOffline, 'bg-success': modoOffline }">
    <div class="container-fluid">
      <!--<a class="navbar-brand" @click="router.push('/')">Vue 3</a>-->
      <a class="navbar-brand" href="/">Vue 3</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
              aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <!--<a class="nav-link btn btn-link" @click="router.push('/')">Home</a>-->
            <a class="nav-link btn btn-link" href="/">Home</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <!--<a class="nav-link btn btn-link" @click="router.push('/login')">Login</a>-->
            <a class="nav-link btn btn-link" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <!--<a class="nav-link btn btn-link" @click="router.push('/register')">Register</a>-->
            <a class="nav-link btn btn-link" href="/register">Register</a>
          </li>
          <li class="nav-item" v-if="modoOffline">
            <a class="nav-link btn btn-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
               aria-controls="offcanvasRight">Sincronización</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div>
    <a class="nav-link btn btn-link" v-if="modoOffline" @click="cambiarModoOnline(false)"> Offline</a>
    <a class="nav-link btn btn-link" v-if="!modoOffline" @click="cambiarModoOnline(true)">Online</a>
  </div>

  <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="modoOffline && sincronizacionesTotales > 0">
    <strong>Alerta!</strong> Tiene {{ sincronizacionesTotales }} registros que requieren sincronización.
<!--    <button type="button" class="btn btn-danger" data-bs-dismiss="alert" aria-label="Close">Sincronizar ahora</button>-->
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Sincronización</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="card">
        <button class="btn btn-danger" @click="sincronizarManual()">Sincronizar</button>

        <div v-if="operacionesTotales > 0" class="mt-2">
          <p class="text-danger"><i class="bi bi-cloud-upload"></i>{{ operacionesFallidas.length }} registros sin sincronizar</p>
          <p class="text-success"><i class="bi bi-house-door-fill"></i>{{ operacionesExitosas.length }} registros sincronizados</p>
          <p class="text-primary"><i class="bi bi-display"></i>{{ operacionesTotales }} registros en total</p>
          <hr>
        </div>
        <p class="text-danger" v-if="registrosRecuperados.length > 0"><i class="bi bi-cloud-upload"></i>{{ registrosRecuperados.length }} registros recuperados</p>
        <div class="card-body respF" v-if="operacionesFallidas.length > 0">
          <table class="table table-bordered table-responsive-md table-striped text-center">
            <thead>
            <tr>
              <th class="text-center">N°</th>
              <th class="text-center">Tipo</th>
              <th class="text-center">Estado</th>
              <th class="text-center">Fecha de creación</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="operacion in operacionesFallidas" :key="operacion.id">
              <td>
                <span>{{ operacion.id }}</span>
              </td>
              <td>
                <span>{{ operacion.request_method }}</span>
              </td>
              <td>
                <span>{{ operacion.status }}</span>
              </td>
              <td>
                <span>{{ operacion.date_time }}</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import router from "../@helpers/router";
import {openDB} from 'idb';
import {offlineService} from "../@services/offline";

export default {
  name: 'Navbar',
  props: {},
  data() {
    return {
      router,
      db: null,
      modoOffline: false,

      sincronizaciones: [],
      sincronizacionesTotales: 0,

      registrosRecuperados: [],
      operacionesExitosas: [],
      operacionesFallidas: [],
      operacionesTotales: 0
    }
  },
  mounted() {
    this.initDB()
    this.listarOperacionesSincronizar()
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
      await this.db.put('offline', {id: 1, status: estado})
      this.obtenerModoOnline()
    },
    async obtenerModoOnline() {
      const value = await this.db.get('offline', 1);
      if (value) {
        this.modoOffline = value.status
      }
    },
    listarOperacionesSincronizar() {
      offlineService.listarOperacionesSincronizar()
          .then(resp => {
            if (resp.data.codigo === 200) {
              this.sincronizaciones = resp.data.data.operaciones
              this.sincronizacionesTotales = resp.data.data.registros
            }
          })
    },
    sincronizarManual() {
      offlineService.sincronizarManual()
          .then(resp => {
            console.log('resp.data ', resp.data);
            if (resp.data.codigo === 200) {
              this.registrosRecuperados = resp.data.data.registros_recuperados
              this.operacionesExitosas = resp.data.data.operaciones_exitosas
              this.operacionesFallidas = resp.data.data.operaciones_fallidas
              this.operacionesTotales = resp.data.data.operaciones_totales
            }
            this.listarOperacionesSincronizar()
          })
    }

  }
}
</script>
<style>
.respA {
  display: flex;
  text-align: center;
}

.respF {
  overflow: auto;
  width: auto;
  /*word-break: break-all;*/
}
</style>
