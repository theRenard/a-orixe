<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isMobile } = useMobileDetection()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: image, direction: 'right', delay: 0, rotation: 12 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="ReconnaissanceFootnoteSection" class="block">
  <div data-block-inner class="block-inner">
    <section class="reconnaissance-footnote-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <p class="type__section-paragraph paragraph-spacing">{{ $t('reconnaissance.insertBetween') }}</p>
        </div>
        <div class="centered paragraph-spacing">
          <div class="image-crop-container">
            <ImageCrop :width="isMobile ? '100%' : '35rem'" :height="isMobile ? '100%' : 'auto'" position="center 50%"
              :caption="$t('reconnaissance.documentCaption')" caption-position="bottom">
              <img src="@/assets/photos/lettrereconnaissancechemin.webp" :alt="$t('reconnaissance.documentCaption')"
                loading="lazy">
            </ImageCrop>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.image-crop-container {
  width: calc(35rem * var(--scale-large));
  height: auto;
  margin: 0 auto;
}

.reconnaissance-footnote-section {
  overflow-x: hidden;
}

.reconnaissance-footnote-section .paragraph-spacing {
  margin-top: 0.75rem;
}

.reconnaissance-footnote-section img {
  width: calc(35rem * var(--scale-xlarge));
  height: auto;
  margin: 0 auto;
}
</style>
