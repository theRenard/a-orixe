<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'
import { useMobileDetection, isMobileViewport } from '@/composables/useMobileDetection'

const { isMobile } = useMobileDetection()
const sectionRoot = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const contentBlock = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run, setInitialState } = useRevealAnimation({
  elements: [
    // { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    {
      el: image, direction: 'left', delay: 0, steps: [
        { to: { scale: 2 }, duration: 0, opacity: 0 },
        { to: { scale: 1 }, duration: 2, opacity: 1 }
      ]
    },
    // { el: contentBlock, direction: 'left', delay: 0.5 },
    { el: title, direction: 'left', delay: 0.7 },
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
<div data-block data-component="ElementsJacquaireSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="elements-jacquaire-section section--full-viewport">
      <div class="container">
        <img ref="image" src="../../assets/illustrations/benevoles_ok.webp" :alt="$t('elementsJacquaire.title')"
          class="elements-jacquaire-section__image ma" :class="{ 'paragraph-spacing': isMobile }" loading="lazy"
          height="auto" style="width: calc(50% * var(--scale-small));">
        <div ref="contentBlock" class="centered">
          <h2 ref="title"
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
