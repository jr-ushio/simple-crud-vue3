<template>
  <div class="row">
    <div class="col-md-6 mx-auto mt-5">
      <div class="card">
        <div class="card-body">
          <h1 class="text-center">LOGIN</h1>
          <h5 v-if="mensaje.length > 0" class="text-center text-danger">{{mensaje}}</h5>
          <div>
            <div class="form-group">
              <label for="usuario">Usuario</label>
              <input
                  type="text"
                  id="usuario"
                  class="form-control"
                  v-model="usuario"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                  id="password"
                  type="password"
                  class="form-control"
                  v-model="password"
              />
            </div>
            <button class="btn btn-primary btn-lg btn-block" @click="login">
              Login
            </button>
          </div>
          <div class="form-group mt-3">
            <p>
              Crear una cuenta? <a href="/register"> Register </a>
            </p>
          </div>
          <div class="form-group mt-3">
            <p>
              <a>me olvidé mi password?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from "../@services/auth";
import router from "../@helpers/router";

export default {
  name: 'login',
  props: {
    msg: String
  },
  data() {
    return {
      mensaje: '',
      usuario: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.mensaje = ''
      authService.login(this.usuario,this.password)
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
