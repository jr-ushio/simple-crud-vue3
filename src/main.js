import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import router from "./@helpers/router";
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

createApp(App)
  .use(router)
  .mount('#app')
