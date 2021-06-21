<template>
  <div class="row">
    <div class="col-md-6 mx-auto mt-5">
      <div class="card">
        <div class="card-body">
          <h1 class="text-center">ACTUALIZAR</h1>
          <h5 v-if="mensaje.length > 0" class="text-center text-danger">{{mensaje}}</h5>
          <div>
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" class="form-control" v-model="nombres">
            </div>
            <div class="form-group">
              <label>Apellidos</label>
              <input type="text" class="form-control" v-model="apellidos"/>
            </div>
            <div class="form-group">
              <label>Usuario</label>
              <input type="text" class="form-control" v-model="usuario"/>
            </div>
            <div class="form-group">
              <label>Password (Opcional)</label>
              <input
                  type="password"
                  class="form-control" v-model="password"/>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block" @click="update">
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../@helpers/router";
import {usuarioService} from "../@services/usuario";

export default {
  name: 'Edit',
  props: ['id'],
  data() {
    return {
      mensaje: '',
      nombres: '',
      apellidos: '',
      usuario: '',
      password: ''
    }
  },
  mounted() {
    usuarioService.show(this.id)
    .then(resp => {
      if (resp.data.codigo === 200) {
        this.nombres = resp.data.data.nombres
        this.apellidos = resp.data.data.apellidos
        this.usuario = resp.data.data.usuario
      }
    })
  },
  methods: {
    update() {
      usuarioService.update(this.id, this.nombres, this.apellidos, this.usuario,this.password)
          .then(resp => {
            if (resp.data.codigo === 200) {
              router.push('/')
            }
          })
    }
  }
}
</script>
