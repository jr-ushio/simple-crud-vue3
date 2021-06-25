<template>
  <div class="card">
    <h3 class="card-header text-center font-weight-bold text-uppercase py-4">USUARIOS</h3>
    <div class="card-body">
      <div id="table" class="table-editable">
        <div class="row mb-2">
          <div class="col-sm-4">
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="search"
                     v-on:keyup.enter="listar"
                     placeholder="Buscar nombres/apellidos/usuario"
                     aria-describedby="button-addon2">
              <button class="btn btn-outline-secondary" id="button-addon2" @click="listar"><i class="bi bi-search"></i></button>
            </div>
          </div>
          <div class="col-sm-4"></div>
          <div class="col-sm-4">
<!--            <a class="btn btn-primary" @click="router.push('/register')">REGISTRAR</a>-->
          </div>
        </div>
        <table class="table table-bordered table-responsive-md table-striped text-center">
          <thead>
          <tr>
            <th class="text-center">Nombre</th>
            <th class="text-center">Apellidos</th>
            <th class="text-center">Usuario</th>
            <th class="text-center">Acciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(usuario) in usuarios" :key="usuario.id">
            <td>
              <span>{{ usuario.nombres }}</span>
            </td>
            <td>
              <span>{{ usuario.apellidos }}</span>
            </td>
            <td>
              <span>{{ usuario.usuario }}</span>
            </td>
            <td>
              <button class="btn btn-success m-1" type="button" @click="editar(usuario.id)">Editar</button>
              <button class="btn btn-danger m-1" type="button" @click="eliminar(usuario.id)">Eliminar</button>
            </td>
          </tr>
          </tbody>
        </table>

        <nav aria-label="pagination">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link" @click="changePage(page-1)">Anterior</a>
            </li>
            <li class="page-item active">
              <a class="page-link" >{{page}} <span class="sr-only"></span></a>
            </li>
            <li class="page-item">
              <a class="page-link" @click="changePage(page+1)">Siguiente</a>
            </li>
          </ul>
        </nav>

        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {usuarioService} from "../@services/usuario";
import router from "../@helpers/router";
import { openDB } from 'idb';

export default {
  name: 'Home',
  props: {},
  data() {
    return {
      router,
      usuarios: [],
      page: 1,
      pages: 1,
      db: null,
      search: ''
    }
  },
  mounted() {
    this.initDB()
  },
  created() {
    this.listar();
  },
  methods: {
    async initDB() {
      this.db = await openDB('SmartClicDB', 1)
      this.db.getAllFromIndex('usuarios', 'id').then(resp => {
        if (resp.length === 0) {
          this.guardarDataEnModoOffline();
        }
      })
    },
    async guardarDataEnModoOffline() {
      usuarioService.listar(1,9999)
          .then(resp => {
            if (resp.data.codigo === 200) {
              for (let item of resp.data.data.data) {
                this.db.add('usuarios', item)
              }
            }
          })
    },
    listar() {
      if(this.page>=1 && this.page<=this.pages){
        usuarioService.listar(this.page,20, this.search)
            .then(resp => {
              this.pages=resp.data.data.lastPage


              if (resp.data.codigo === 200) {
                this.usuarios = resp.data.data.data
              }
              console.log("resp",resp.data.data)
            })
      }
    },
    editar(id) {
      router.push({
        path: `/edit/${id}`,
      })
    },
    eliminar(id) {
      usuarioService.eliminar(id)
      .then(resp => {
        console.log('resp ', resp.data);
        if (resp.data.codigo === 200) {
          this.listar();
        }
      })
    },
    changePage(page){
      console.log("pageChange",page);
      if(page>=1 && page<=this.pages){
        this.page=page;
      }else{
        if(page<=0){
          this.page=1;
        }
        if(page>=this.pages){
          this.page=this.pages;
        }
      }
      this.listar();
    }
  }

}
</script>
