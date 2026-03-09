<script setup lang="ts">
import LanguageSelector from '@/components/LanguageSelector.vue'
import ReadProgressBar from '@/components/ReadProgressBar.vue'
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

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
  <ReadProgressBar />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <RouterView />
    </div>
  </div>
</div>
</template>

<style scoped>
.app-root {
  position: relative;
  min-height: 100dvh;
}

#smooth-wrapper {
  overflow: hidden;
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
