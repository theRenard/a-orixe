import { createRouter, createWebHistory } from 'vue-router'
import DesktopView from '@/views/DesktopView.vue'
import StylesPage from '@/views/StylesPage.vue'
import MobileView from '@/views/mobile/MobileView.vue'
import { shouldUseMobileVersion } from '@/composables/useMobileDetection'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: DesktopView },
    { path: '/mobile', name: 'Mobile', component: MobileView },
    { path: '/styles', name: 'Styles', component: StylesPage },
  ],
})

router.beforeEach((to, _from, next) => {
  const forceDesktop = to.query.desktop === '1'
  const forceMobile = to.query.mobile === '1'

  if (forceDesktop && to.path === '/mobile') {
    const { desktop: _d, ...rest } = to.query
    next({ path: '/', query: rest })
    return
  }
  if (forceMobile && to.path === '/') {
    const { mobile: _m, ...rest } = to.query
    next({ path: '/mobile', query: rest })
    return
  }

  const useMobile = shouldUseMobileVersion()

  if (to.path === '/' && useMobile && !forceDesktop) {
    next({ path: '/mobile', query: to.query })
    return
  }
  if (to.path === '/mobile' && !useMobile && !forceMobile) {
    next({ path: '/', query: to.query })
    return
  }

  next()
})

export default router
