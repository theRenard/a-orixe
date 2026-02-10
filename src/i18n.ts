import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import es from './locales/es.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'es',
  messages: {
    fr,
    es,
  },
})
