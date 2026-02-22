<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: title, direction: 'left', delay: 0 },
    { el: content, direction: 'right', delay: 0.1 },
  ],
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
<div data-block data-component="FlechageSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="flechage-section">
    <div class="container">
      <div class="centered">
        <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
          {{ $t('flechage.title') }}
        </h2>
        <div ref="content">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('flechage.paragraph1')"></p>
          <p class="type__question paragraph-spacing" v-html="$t('flechage.highlight')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('flechage.paragraph2')"></p>
        </div>
      </div>
    </div>
  </section>
  </div>
</div>
</template>

<style scoped>
.flechage-section {
  overflow-x: hidden;
}
</style>

