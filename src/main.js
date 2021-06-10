import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import router from "./@helpers/router";

createApp(App)
  .use(router).mount('#app')
