<template>
  <h1>Login</h1>
  <button v-on:click="login">CLIC</button>
</template>

<script>
import { authService } from "../@services/auth";

export default {
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    login() {
      authService.login('asdsa','asdsa')
          .then(resp => {
            console.log('resp ', resp);
          })
    }
  }
}
</script>
