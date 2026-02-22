<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const synopsis = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const block1 = ref<HTMLElement | null>(null)
const block2 = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: synopsis, direction: 'left', delay: 0 },
    { el: title, direction: 'right', delay: 0.08 },
    { el: block1, direction: 'left', delay: 0.16 },
    { el: block2, direction: 'right', delay: 0.24 },
  ],
  duration: 0.6,
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot, start: 'top 88%', once: true },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<section ref="sectionRoot" class="camino-section">
  <div class="container">
    <div class="centered">
      <p ref="synopsis" class="type__hero-synopsis paragraph-spacing" v-html="$t('camino.paragraph')"></p>
      <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
        {{ $t('camino.title') }}
      </h2>
      <p ref="block1" class="type__section-paragraph paragraph-spacing" v-html="$t('camino.paragraph1')"></p>
      <p ref="block2" class="type__section-paragraph paragraph-spacing" v-html="$t('camino.paragraph2')"></p>
    </div>
  </div>
</section>
</template>

<style scoped>
.camino-section {
  overflow-x: hidden;
}
</style>
