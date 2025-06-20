import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)


app.config.errorHandler = (err, instance, info) => {
  console.error('Erreur globale Vue:', err)
  console.error('Composant:', instance)
  console.error('Info:', info)
}

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesse rejetée non gérée:', event.reason)
  event.preventDefault()
})

app.use(createPinia())
app.use(router)

app.mount('#app')
