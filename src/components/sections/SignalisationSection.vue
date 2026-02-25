<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'

const sectionRoot = ref<HTMLElement | null>(null)
const cell1 = ref<HTMLElement | null>(null)
const cell2 = ref<HTMLElement | null>(null)
const caption = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: cell1, direction: 'left', delay: 0, rotation: -12, transformOrigin: 'left bottom' },
    { el: cell2, direction: 'right', delay: 0.08, rotation: 12, transformOrigin: 'right bottom' },
  ],
  offset: 44,
  ease: 'power3.out',
  runOnMount: false,
})
let myBlockIndex = -1
onMounted(() => {
  myBlockIndex = getBlockIndexFromElement(sectionRoot.value)
  registerBlockEnter?.(myBlockIndex, () => run())
})
onUnmounted(() => {
  unregisterBlockEnter?.(myBlockIndex)
})
</script>

<template>
<div data-block data-component="SignalisationSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="signalisation-section section--full-viewport">
      <div class="container">
        <div class="signalisation-section__grid">
          <div ref="cell1" class="signalisation-section__cell">
            <ImageCrop width="100%" height="40vw" position="center 50%">
              <img src="../../assets/photos/08_florence_antunes.webp" :alt="$t('signalisation.caption')" loading="lazy">
            </ImageCrop>
          </div>
          <div ref="cell2" class="signalisation-section__cell">
            <ImageCrop width="100%" height="40vw" position="center 50%">
              <img src="../../assets/photos/09_florence_antunes.webp" :alt="$t('signalisation.caption')" loading="lazy">
            </ImageCrop>
          </div>
        </div>
        <p ref="caption" class="signalisation-section__caption type__image-caption type__image-caption--with-line">
          {{ $t('signalisation.caption') }}
        </p>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.signalisation-section {
  overflow-x: hidden;
}

.signalisation-section__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-width: 100%;
}

.signalisation-section__cell {
  overflow: hidden;
}

.signalisation-section__cell :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.signalisation-section__caption {
  margin: 0;
  text-align: center;
}
</style>
