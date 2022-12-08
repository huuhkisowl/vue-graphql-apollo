import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// APollo provider config
import * as apolloProvider from '../apollo.provider'

//Vue Router
import * as routerConfig from './appRouter'

const vuetify = createVuetify({
    components,
    directives,
    theme: false,  
})

const movieApp = createApp(App)
 
movieApp
    .use(apolloProvider.provider)
    .use(routerConfig.router)
    .use(vuetify)
    .mount('#app')
