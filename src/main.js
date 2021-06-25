import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import router from "./@helpers/router";

createApp(App)
  .use(router)
  .mount('#app')
