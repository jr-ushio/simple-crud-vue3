<template>
  <div class="card">
    <h3 class="card-header text-center font-weight-bold text-uppercase py-4">USUARIOS</h3>
    <div class="card-body">
      <div id="table" class="table-editable">
        <div class="row mb-2">
          <div class="col-sm-9"></div>
          <div class="col-sm-3">
            <a class="btn btn-primary" @click="router.push('/register')">REGISTRAR</a>
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
          <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
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
              <button class="btn btn-danger m-1" type="button" @click="eliminar">Eliminar</button>
            </td>
          </tr>
          </tbody>
        </table>
        <!--        <Pagination-->
        <!--            totalResults={50} // falta modificar para muchos resultados-->
        <!--        currentPage={currentPage}-->
        <!--        pageSize={pageSize}-->
        <!--        paginate={paginate}-->
        <!--        />-->
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {usuarioService} from "../@services/usuario";
import router from "../@helpers/router";

export default {
  name: 'Home',
  props: {},
  data() {
    return {
      router,
      usuarios: [],
    }
  },
  created() {
    this.listar();
  },
  methods: {
    listar() {
      usuarioService.listar()
          .then(resp => {
            if (resp.data.codigo === 200) {
              this.usuarios = resp.data.data.data
            }
          })
    },
    editar(id) {
      router.push({
        path: `/edit/${id}`,
      })
    },
    eliminar() {

    }
  }
}
</script>
