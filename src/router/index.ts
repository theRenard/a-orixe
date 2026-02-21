import { createRouter, createWebHistory } from 'vue-router'
import DesktopView from '@/views/DesktopView.vue'
import StylesPage from '@/views/StylesPage.vue'
import SoundPlayerTest from '@/views/SoundPlayerTest.vue'
import MobileView from '@/views/mobile/MobileView.vue'
import { shouldUseMobileVersion } from '@/composables/useMobileDetection'
import { getPreferredLocale } from '@/composables/usePreferredLocale'
import { i18n } from '@/i18n'

type LocaleMeta = 'fr' | 'es'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    {
      path: '/fr/mobile',
      name: 'MobileFr',
      component: MobileView,
      meta: { locale: 'fr' as LocaleMeta },
    },
    {
      path: '/es/mobile',
      name: 'MobileEs',
      component: MobileView,
      meta: { locale: 'es' as LocaleMeta },
    },
    {
      path: '/mobile',
      name: 'Mobile',
      redirect: (to) => ({ path: `/${getPreferredLocale()}/mobile`, query: to.query }),
    },
    { path: '/styles', name: 'Styles', component: StylesPage },
    { path: '/sound-player-test', name: 'SoundPlayerTest', component: SoundPlayerTest },
  ],
})

function localeFromPath(path: string): LocaleMeta | null {
  if (path.startsWith('/es')) return 'es'
  if (path.startsWith('/fr')) return 'fr'
  return null
}

router.beforeEach((to, _from, next) => {
  const forceDesktop = to.query.desktop === '1'
  const forceMobile = to.query.mobile === '1'
  const locale = to.meta.locale as LocaleMeta | undefined
  const preferredLocale = getPreferredLocale()

  // Sync i18n locale when entering a locale route
  if (locale) {
    i18n.global.locale.value = locale
  }

  const useMobile = shouldUseMobileVersion()

  // Force desktop: leave mobile path for same locale
  if (forceDesktop && (to.path === '/fr/mobile' || to.path === '/es/mobile')) {
    const loc = localeFromPath(to.path) ?? preferredLocale
    const { desktop: _d, ...rest } = to.query
    next({ path: `/${loc}`, query: rest })
    return
  }

  // Force mobile: leave desktop path for same locale
  if (forceMobile && (to.path === '/fr' || to.path === '/es')) {
    const loc = localeFromPath(to.path) ?? preferredLocale
    const { mobile: _m, ...rest } = to.query
    next({ path: `/${loc}/mobile`, query: rest })
    return
  }

  // Desktop locale path but device is mobile → redirect to locale/mobile
  if ((to.path === '/fr' || to.path === '/es') && useMobile && !forceDesktop) {
    next({ path: `${to.path}/mobile`, query: to.query })
    return
  }

  // Mobile locale path but device is desktop → redirect to locale
  if ((to.path === '/fr/mobile' || to.path === '/es/mobile') && !useMobile && !forceMobile) {
    const loc = localeFromPath(to.path) ?? preferredLocale
    next({ path: `/${loc}`, query: to.query })
    return
  }

  next()
})

export default router
