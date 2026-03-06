import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/** Prevents doc custom blocks in Vue SFCs from being parsed as JS (they are documentation only). */
function vueDocBlockNoop() {
  return {
    name: 'vue-doc-block-noop',
    enforce: 'pre' as const,
    load(id: string) {
      if (id.includes('?vue&type=doc')) return 'export default function () {}'
      return null
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/a-orixe/',
  plugins: [vue(), vueDocBlockNoop()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true,
    allowedHosts: true
  }
})
