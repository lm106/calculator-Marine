import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
const app = createApp(App)
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

import VueApexCharts from "vue3-apexcharts";
import {createPinia} from "pinia";

const vuetify = createVuetify({
    components:{ VNumberInput,}
})

app.use(VueApexCharts);
app.use(router)
app.use(vuetify)
app.use(createPinia())
app.mount('#app')
