import { createRouter, createWebHashHistory } from 'vue-router'
import DesktopView from '@/views/DesktopView.vue'
import StylesPage from '@/views/StylesPage.vue'
import SoundPlayerTest from '@/views/SoundPlayerTest.vue'
import { getPreferredLocale } from '@/composables/usePreferredLocale'
import { i18n } from '@/i18n'

type LocaleMeta = 'fr' | 'es'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: (to) => ({ path: `/${getPreferredLocale()}`, query: to.query }),
    },
    {
      path: '/fr',
      name: 'DesktopFr',
      component: DesktopView,
      meta: { locale: 'fr' as LocaleMeta },
    },
    {
      path: '/es',
      name: 'DesktopEs',
      component: DesktopView,
      meta: { locale: 'es' as LocaleMeta },
    },
    { path: '/styles', name: 'Styles', component: StylesPage },
    { path: '/sound-player-test', name: 'SoundPlayerTest', component: SoundPlayerTest },
  ],
})

router.beforeEach((to, _from, next) => {
  const locale = to.meta.locale as LocaleMeta | undefined
  if (locale) {
    i18n.global.locale.value = locale
  }
  next()
})

export default router
