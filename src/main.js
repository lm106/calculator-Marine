import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { VNumberInput } from 'vuetify/labs/VNumberInput'

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { optionsToast } from './constants/constants';
import {createPinia} from "pinia";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

const vuetify = createVuetify({
  components: { VNumberInput, },
});

app.use(VueApexCharts);
app.use(router);
app.use(vuetify);
app.use(Toast, optionsToast);
app.use(createPinia())
app.mount('#app');
