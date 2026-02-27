<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'

const sectionRoot = ref<HTMLElement | null>(null)
const caption = ref<HTMLElement | null>(null)
const cell1 = ref<HTMLElement | null>(null)
const cell2 = ref<HTMLElement | null>(null)
const cell3 = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: caption, direction: 'right', delay: 0 },
    { el: cell1, direction: 'left', delay: 0.06, rotation: -12 },
    { el: cell2, direction: 'down', delay: 0.12 },
    { el: cell3, direction: 'right', delay: 0.18, rotation: 12 },
  ],
  offset: 40,
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
<div data-block data-component="JoyauSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="joyau-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('joyau.paragraph1')"></p>
          <p class="type__section-paragraph joyau-section__quote paragraph-spacing" v-html="$t('joyau.paragraph2')"></p>
        </div>
        <p ref="caption" class="joyau-section__caption type__image-caption type__image-caption--with-line"
          v-html="$t('joyau.caption')">
        </p>
        <div class="joyau-section__grid">
          <div ref="cell1" class="joyau-section__cell">
            <ImageCrop width="100%" height="37.5rem" position="center 50%">
              <img src="../../assets/photos/10_florence_antunes.webp" :alt="$t('joyau.caption')" loading="lazy">
            </ImageCrop>
          </div>
          <div ref="cell2" class="joyau-section__cell">
            <ImageCrop width="100%" height="37.5rem" position="center 50%">
              <img src="../../assets/photos/11_florence_antunes.webp" :alt="$t('joyau.caption')" loading="lazy">
            </ImageCrop>
          </div>
          <div ref="cell3" class="joyau-section__cell">
            <ImageCrop width="100%" height="37.5rem" position="center 50%">
              <img src="../../assets/photos/12_florence_antunes.webp" :alt="$t('joyau.caption')" loading="lazy">
            </ImageCrop>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.joyau-section {
  overflow-x: hidden;
}

.joyau-section__quote {
  margin: 0;
}

.joyau-section__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  max-width: 100%;
}

.joyau-section__cell {
  overflow: hidden;
  border-radius: 2px;
}

.joyau-section__cell :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.joyau-section__caption {
  margin: 0;
  text-align: center;
}
</style>
