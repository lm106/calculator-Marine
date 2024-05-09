import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
