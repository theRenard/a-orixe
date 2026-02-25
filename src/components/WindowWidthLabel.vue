<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const widthPx = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

function updateWidth() {
  widthPx.value = window.innerWidth
}

const isDev = import.meta.env.DEV

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<template>
  <div v-if="isDev" class="window-width-label" aria-live="polite">
    {{ widthPx }}px
  </div>
</template>

<style scoped>
/* Same look as component labels (body.show-component-labels [data-component]::before) */
.window-width-label {
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 9999;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-family: ui-monospace, monospace;
  color: var(--color-black, #000000);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--color-amber-4d, #b45309);
  border-radius: 0.25rem;
  pointer-events: none;
}
</style>
