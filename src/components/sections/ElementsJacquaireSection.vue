<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const paragraph = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: image, direction: 'left', delay: 0 },
    { el: title, direction: 'right', delay: 0.1 },
    { el: paragraph, direction: 'left', delay: 0.18 },
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
<section ref="sectionRoot" class="elements-jacquaire-section">
  <div class="container">
    <img ref="image" src="../../assets/illustrations/benevoles_ok.webp" :alt="$t('elementsJacquaire.title')"
      class="elements-jacquaire-section__image ma" loading="lazy" width="50%" height="auto">
    <div class="centered">
      <h2 ref="title" class="type__section-title elements-jacquaire-section__title heading-spacing">
        {{ $t('elementsJacquaire.title') }}
      </h2>
      <p ref="paragraph" class="type__section-paragraph paragraph-spacing" v-html="$t('elementsJacquaire.paragraph')"></p>
    </div>
  </div>
</section>
</template>

<style scoped>
.elements-jacquaire-section {
  overflow-x: hidden;
}

.elements-jacquaire-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
