<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'
import { isMobileViewport } from '@/composables/useMobileDetection'

const leftCol = ref<HTMLElement | null>(null)
const rightCol = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run, setInitialState } = useRevealAnimation({
  elements: [
    { el: leftCol, direction: 'left', delay: 0 },
    { el: rightCol, direction: 'right', delay: 0.1, rotation: 12 },
    { el: question, direction: 'down', delay: 0.2 },
  ],
  offset: 44,
  ease: 'power3.out',
  runOnMount: false,
})
let myBlockIndex = -1
let mobileRevealCleanup: (() => void) | void
onMounted(() => {
  setInitialState()
  myBlockIndex = getBlockIndexFromElement(leftCol.value)
  registerBlockEnter?.(myBlockIndex, () => run())
  if (isMobileViewport()) mobileRevealCleanup = run()
})
onUnmounted(() => {
  unregisterBlockEnter?.(myBlockIndex)
  mobileRevealCleanup?.()
})
</script>

<template>
<div data-block data-component="ConcentreGaliceSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="concentre-galice-section section--full-viewport">
      <div class="container">
        <div class="centered--large">
          <h2 class="type__section-title type__section-title--with-line heading-spacing mb-0">
            {{ $t('concentreGalice.title') }}
          </h2>
          <div class="row-two-col paragraph-spacing">
            <div ref="leftCol" class="col-left">
              <p class="type__section-paragraph paragraph-spacing" v-html="$t('concentreGalice.paragraph1')"></p>
              <p ref="question" class="type__question paragraph-spacing" v-html="$t('concentreGalice.paragraph2')"></p>
            </div>
            <div ref="rightCol" class="col-right">
              <ImageCrop width="100%" height="600px" position="center 30%" :caption="$t('concentreGalice.imageCaption')"
                caption-position="bottom">
                <img class="paragraph-spacing" src="@/assets/photos/04_florence_antunes.webp"
                  :alt="$t('concentreGalice.imageCaption')" loading="lazy">
              </ImageCrop>
            </div>
          </div>
        </div>
        <div class="centered">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('concentreGalice.paragraph3')"></p>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.concentre-galice-section {
  overflow-x: hidden;
}

.concentre-galice-section .centered--large+.centered :deep(.paragraph-spacing) {
  margin-top: 0.75rem !important;
}
</style>
