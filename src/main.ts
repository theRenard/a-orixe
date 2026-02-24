import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import { setRevealAnimationOnceDefault } from '@/composables/useRevealAnimation'
import './styles/reset.css'
import './styles/design-tokens.css'
import './styles/vars/styles.css'
import './styles/vars/typography.css'

// When false, reveal animations reset when a block is scrolled past and play again when the user returns.
setRevealAnimationOnceDefault(false)

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
