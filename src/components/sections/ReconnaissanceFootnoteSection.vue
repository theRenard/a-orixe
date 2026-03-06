<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: image, direction: 'right', delay: 0, rotation: 12 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'reconnaissance-footnote-section', 'section--full-viewport']" data-block data-component="ReconnaissanceFootnoteSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
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
    </div>
  </div>
</section>
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
