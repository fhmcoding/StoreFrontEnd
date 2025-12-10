import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/main.css'
import CKEditor from '@ckeditor/ckeditor5-vue';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router, axios)
app.use(CKEditor)
app.mount('#app')
