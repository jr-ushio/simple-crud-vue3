<template>
  <div class="row">
    <div class="col-md-6 mx-auto mt-5">
      <div class="card">
        <div class="card-body">
          <h1 class="text-center">REGISTER</h1>
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
              <label>Password</label>
              <input
                  type="password"
                  class="form-control" v-model="password"/>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block" @click="regiter">
              Register
            </button>
          </div>
          <div class="form-group mt-3">
            <p>No tienes una cuenta?<a href="/login"> Login </a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {authService} from "../@services/auth";
import router from "../@helpers/router";

export default {
  props: {},
  data() {
    return {
      mensaje: '',
      nombres: '',
      apellidos: '',
      usuario: '',
      password: ''
    }
  },
  methods: {
    regiter() {
      this.mensaje = ''
      authService.register(this.nombres, this.apellidos, this.usuario,this.password)
          .then(resp => {
            if (resp.data.codigo === 200) {
              router.push('/')
            } else {
              this.mensaje = resp.data.mensaje
            }
          })
    }
  }
}
</script>
