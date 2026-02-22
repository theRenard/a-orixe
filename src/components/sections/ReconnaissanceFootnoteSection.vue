<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [{ el: content, direction: 'left', delay: 0 }],
  duration: 0.6,
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="ReconnaissanceFootnoteSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="reconnaissance-footnote-section section--full-viewport">
      <div class="container">
        <div ref="content" class="centered">
          <p class="type__section-paragraph paragraph-spacing">{{ $t('reconnaissance.insertBetween') }}</p>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.reconnaissance-footnote-section {
  overflow-x: hidden;
}

.reconnaissance-footnote-section .paragraph-spacing {
  margin-top: 0.75rem;
}
</style>
