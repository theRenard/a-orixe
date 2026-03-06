<script setup lang="ts">
import { useMobileDetection } from '@/composables/useMobileDetection'

defineProps<{ sectionIndex: number }>()
const { isMobile } = useMobileDetection()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }, { el: image, direction: 'down', delay: 0.08, scale: 0.7 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section :class="['section', `section-${sectionIndex}`, 'etapes-cles-section', 'section--full-viewport']" id="etapes-cles" data-block data-component="EtapesClesSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('etapesCles.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('etapesCles.paragraph')"></p>
        </div>
        <img class="ma mb-2" src="../../assets/illustrations/saint_jacques_ok.webp"
          :alt="$t('etapesCles.title')" :class="{ 'paragraph-spacing': isMobile }" loading="lazy"
          style="width: calc(50vw * var(--scale-xlarge));">
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.etapes-cles-section {
  overflow-x: hidden;
}
</style>
