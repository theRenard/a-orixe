<script setup lang="ts">
import LanguageSelector from '@/components/LanguageSelector.vue'
import { RouterView } from 'vue-router'
import { useLenis } from '@/composables/useLenis'
import { useShowComponentLabels } from '@/composables/useShowComponentLabels'

// useLenis({
//   // smoothWheel: false,
//   lerp: 0.1,
//   duration: 2,
// })
useShowComponentLabels()
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
</style>
