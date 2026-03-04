<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useMobileDetection, isMobileViewport } from '@/composables/useMobileDetection'

const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run, setInitialState } = useRevealAnimation({
  elements: [
    // { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: image, direction: 'right', delay: 0, rotation: 12 },
    // { el: content, direction: 'left', delay: 0.1 },
  ],
  offset: 44,
  ease: 'power3.out',
  runOnMount: false,
})
let myBlockIndex = -1
let mobileRevealCleanup: (() => void) | void
onMounted(() => {
  setInitialState()
  myBlockIndex = getBlockIndexFromElement(sectionRoot.value)
  registerBlockEnter?.(myBlockIndex, () => run())
  if (isMobileViewport()) mobileRevealCleanup = run()
})
onUnmounted(() => {
  unregisterBlockEnter?.(myBlockIndex)
  mobileRevealCleanup?.()
})
</script>

<template>
<div data-block data-component="ReconnaissanceFootnoteSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="reconnaissance-footnote-section section--full-viewport">
      <div class="container">
        <div ref="content" class="centered">
          <p class="type__section-paragraph paragraph-spacing">{{ $t('reconnaissance.insertBetween') }}</p>
        </div>
        <div ref="image" class="centered paragraph-spacing">
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
