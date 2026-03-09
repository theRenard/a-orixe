<script setup lang="ts">
import LanguageSelector from '@/components/LanguageSelector.vue'
import { RouterView } from 'vue-router'
import { useShowComponentLabels } from '@/composables/useShowComponentLabels'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

useShowComponentLabels()

const { t } = useI18n()
useHead({
  title: () => t('meta.title'),
  meta: [
    {
      name: 'description',
      content: () => t('meta.description'),
    },
  ],
})
</script>

<template>
<div class="app-root">
  <LanguageSelector />
  <RouterView />
</div>
</template>

<style scoped>
.app-root {
  position: relative;
  width: 100%;
  min-height: var(--app-height) !important;
}

.app-root::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: url('./assets/fond_texture.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
