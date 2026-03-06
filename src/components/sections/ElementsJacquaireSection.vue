<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'elements-jacquaire-section', 'section--full-viewport']" data-block data-component="ElementsJacquaireSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <img src="../../assets/illustrations/benevoles_ok.webp" :alt="$t('elementsJacquaire.title')"
          class="elements-jacquaire-section__image ma" :class="{ 'paragraph-spacing': isMobile }" loading="lazy"
          height="auto" style="width: calc(50% * var(--scale-small));">
        <div class="centered">
          <h2 ref="title"
            class="type__section-title type__section-title--with-line elements-jacquaire-section__title heading-spacing">
            {{ $t('elementsJacquaire.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('elementsJacquaire.paragraph')"></p>
        </div>
      </div>
    </div>
</section>
</template>

<style scoped>
.elements-jacquaire-section {
  overflow-x: hidden;
}

/* .elements-jacquaire-section__image {
  display: block;
  max-width: 100%;
  height: auto;
  opacity: 0;
} */
</style>
