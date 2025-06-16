// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// app.mount('#app')
import { createApp } from 'vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'

// const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

// app.use(router)
createApp(App).use(vuetify).use(router).mount('#app')

export default createVuetify({
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    }
});
