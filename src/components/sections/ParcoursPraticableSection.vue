<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'

const sectionRoot = ref<HTMLElement | null>(null)
const firstBlock = ref<HTMLElement | null>(null)
const leftCol = ref<HTMLElement | null>(null)
const rightCol = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: firstBlock, direction: 'left', delay: 0 },
    { el: leftCol, direction: 'left', delay: 0.1 },
    { el: rightCol, direction: 'right', delay: 0.1, rotation: 15, transformOrigin: 'left bottom' },
    { el: question, direction: 'down', delay: 0.2 },
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
<div data-block data-component="ParcoursPraticableSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="parcours-praticable-section section--full-viewport">
      <div class="container">
        <div ref="firstBlock" class="centered parcours-praticable-section__first">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('parcoursPraticable.paragraph1')"></p>
        </div>
        <div class="centered--large">
          <div class="row-two-col">
            <div ref="leftCol" class="col-left">
              <p ref="question" class="type__question" v-html="$t('parcoursPraticable.paragraph2')"></p>
            </div>
            <div ref="rightCol" class="col-right">
              <ImageCrop width="30rem" height="40rem" position="center 40%"
                :caption="$t('parcoursPraticable.photoCredit')" caption-position="bottom">
                <img src="../../assets/photos/03_florence_antunes.webp" :alt="$t('parcoursPraticable.imageCaption')"
                  loading="lazy">
              </ImageCrop>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.parcours-praticable-section {
  overflow-x: hidden;
}

.parcours-praticable-section__first {
  margin-top: 1rem;
}

.parcours-praticable-section__first :deep(.paragraph-spacing) {
  margin-top: 1rem !important;
}
</style>
