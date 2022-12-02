import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as apolloProvider from '../apollo.provider'

const movieApp = createApp(App)
 
movieApp.use(apolloProvider.provider).mount('#app')
