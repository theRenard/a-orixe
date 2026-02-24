<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: title, direction: 'left', delay: 0 },
    { el: image, direction: 'down', delay: 0.08, scale: 0.7 },
  ],
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
<div data-block data-component="EtapesClesSection" class="block">
  <div data-block-inner class="block-inner">
    <section id="etapes-cles" ref="sectionRoot" class="etapes-cles-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('etapesCles.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('etapesCles.paragraph')"></p>
        </div>
        <img ref="image" class="ma mb-2" src="../../assets/illustrations/saint_jacques_ok.webp"
          :alt="$t('etapesCles.title')" loading="lazy" style="width: 60vw;">
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.etapes-cles-section {
  overflow-x: hidden;
}
</style>
