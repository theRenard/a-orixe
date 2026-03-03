<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isMobile } = useMobileDetection()
const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run, setInitialState } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: title, direction: 'left', delay: 0 },
    { el: image, direction: 'down', delay: 0.08, scale: 0.7 },
  ],
  offset: 44,
  ease: 'power3.out',
  runOnMount: false,
})
let myBlockIndex = -1
onMounted(() => {
  setInitialState()
  myBlockIndex = getBlockIndexFromElement(sectionRoot.value)
  registerBlockEnter?.(myBlockIndex, () => run())
})
onUnmounted(() => {
  unregisterBlockEnter?.(myBlockIndex)
})
</script>

<template>
<div data-block data-component="EtapesClesSection" class="block">
  <div data-block-inner class="block-inner">
    <section id="etapes-cles" ref="sectionRoot" class="etapes-cles-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('etapesCles.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('etapesCles.paragraph')"></p>
        </div>
        <img ref="image" class="ma mb-2" src="../../assets/illustrations/saint_jacques_ok.webp"
          :alt="$t('etapesCles.title')" :class="{ 'paragraph-spacing': isMobile }" loading="lazy"
          style="width: calc(50vw * var(--scale-xlarge));">
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.etapes-cles-section {
  overflow-x: hidden;
}
</style>
