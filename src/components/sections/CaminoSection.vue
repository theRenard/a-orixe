<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'
import { isMobileViewport } from '@/composables/useMobileDetection'

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run, setInitialState } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: title, direction: 'left', delay: 0 },
  ],
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
<div data-block data-component="CaminoSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="camino-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <p class="type__hero-synopsis paragraph-spacing" v-html="$t('camino.paragraph')"></p>
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('camino.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('camino.paragraph1')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('camino.paragraph2')"></p>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.camino-section {
  overflow-x: hidden;
}
</style>
