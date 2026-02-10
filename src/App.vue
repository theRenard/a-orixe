<script setup lang="ts">
import LanguageSelector from '@/components/LanguageSelector.vue'
import { RouterView } from 'vue-router'
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
  min-height: 100vh !important;
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

.app-root :deep(a) {
  color: var(--color-orange);
}
</style>

