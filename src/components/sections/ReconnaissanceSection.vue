<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'

const sectionRoot = ref<HTMLElement | null>(null)
const leftCol = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: leftCol, direction: 'left', delay: 0 },
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
<div data-block data-component="ReconnaissanceSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="reconnaissance-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <div class="paragraph-spacing reconnaissance-section__row">
            <h2 ref="leftCol" class="type__section-title type__section-title--with-line heading-spacing">
              {{ $t('reconnaissance.title') }}
            </h2>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconnaissance.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconnaissance.paragraph2')"></p>
          </div>
        </div>
        <div class="centered">
          <p class="type__footnote paragraph-spacing" v-html="$t('reconnaissance.footnote')"></p>
        </div>

      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.reconnaissance-section {
  overflow-x: hidden;
}
</style>
