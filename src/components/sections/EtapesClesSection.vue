<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const paragraph = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: title, direction: 'left', delay: 0 },
    { el: paragraph, direction: 'right', delay: 0.08 },
    { el: image, direction: 'left', delay: 0.16 },
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
<section id="etapes-cles" ref="sectionRoot" class="etapes-cles-section">
  <div class="container">
    <div class="centered">
      <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
        {{ $t('etapesCles.title') }}
      </h2>
      <p ref="paragraph" class="type__section-paragraph paragraph-spacing" v-html="$t('etapesCles.paragraph')"></p>
    </div>
    <img ref="image" class="ma mb-2" src="../../assets/illustrations/saint_jacques_ok.webp" :alt="$t('etapesCles.title')"
      loading="lazy" style="width: 60vw;">
  </div>
</section>
</template>

<style scoped>
.etapes-cles-section {
  overflow-x: hidden;
}
</style>
