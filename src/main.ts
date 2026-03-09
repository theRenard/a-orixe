import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import { installViewportHeightVar } from './composables/useViewportHeight'
import './styles/reset.css'
import './styles/design-tokens.css'
import './styles/responsive.css'
import './styles/mobile.css'
import './styles/desktop.css'
import './styles/vars/typography.css'

const app = createApp(App)
installViewportHeightVar()

app.use(createHead())
app.use(router)
app.use(i18n)

app.mount('#app')
