<script setup lang="ts">
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isMobile } = useMobileDetection()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: image, direction: 'left', delay: 0, steps: [{ to: { scale: 2 }, duration: 0, opacity: 0 }, { to: { scale: 1 }, duration: 2, opacity: 1 }] }, { el: title, direction: 'left', delay: 0.7 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="ElementsJacquaireSection" class="block">
  <div data-block-inner class="block-inner">
    <section class="elements-jacquaire-section section--full-viewport">
      <div class="container">
        <img src="../../assets/illustrations/benevoles_ok.webp" :alt="$t('elementsJacquaire.title')"
          class="elements-jacquaire-section__image ma" :class="{ 'paragraph-spacing': isMobile }" loading="lazy"
          height="auto" style="width: calc(50% * var(--scale-small));">
        <div class="centered">
          <h2
            class="type__section-title type__section-title--with-line elements-jacquaire-section__title heading-spacing">
            {{ $t('elementsJacquaire.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('elementsJacquaire.paragraph')"></p>
        </div>
      </div>
    </section>
  </div>
</div>
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
