import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './styles/reset.css'
import './styles/design-tokens.css'
import './styles/vars/styles.css'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
