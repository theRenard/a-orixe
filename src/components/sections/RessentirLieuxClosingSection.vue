<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const paragraph = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [{ el: paragraph, direction: 'left' }],
  duration: 0.65,
  offset: 40,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="RessentirLieuxClosingSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="ressentir-lieux-closing-section section--full-viewport">
    <div class="container">
      <div class="centered">
        <p ref="paragraph" class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.paragraph2')"></p>
      </div>
    </div>
  </section>
  </div>
</div>
</template>

<style scoped>
.ressentir-lieux-closing-section {
  overflow-x: hidden;
}
</style>
