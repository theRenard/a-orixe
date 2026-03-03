<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import espagneImage from '@/assets/illustrations/espagne_ok.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isMobile } = useMobileDetection()
const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: title, direction: 'left', delay: 0 },
    { el: image, direction: 'right', delay: 0.08, rotation: 12 },
    { el: question, direction: 'down', delay: 0.16 },
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
<div data-block data-component="SantiagoStepsSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="santiago-steps-section section--full-viewport">
  <div class="container">
    <div class="centered--large">
      <div class="row-two-col" style="position: relative;">
        <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing col-left" style="flex: 0 0 50%;">
          {{ $t('santiagoSteps.title') }}
        </h2>
        <img ref="image" :src="espagneImage" alt="" class="santiago-steps-section__title-img col-right" :class="{ 'paragraph-spacing': isMobile }" aria-hidden="true">
      </div>
    </div>
    <div class="centered">
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoSteps.paragraph1')"></p>
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoSteps.paragraph2')"></p>
      <p ref="question" class="type__question paragraph-spacing" v-html="$t('santiagoSteps.highlight')"></p>
    </div>
  </div>
</section>
  </div>
</div>
</template>

<style scoped>
.santiago-steps-section {
  overflow-x: hidden;
}

.santiago-steps-section__title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
}

.santiago-steps-section__title-text {
  flex: 1;
  min-width: 0;
}

.santiago-steps-section__title-img-wrap {
  flex-shrink: 0;
  /* Double border: outer 5px dark, inner 2px light */
  border: 5px solid var(--santiago-steps-border-outer, #b25d2e);
  box-shadow: inset 0 0 0 2px var(--santiago-steps-border-inner, #e68e54);
  border-radius: 2px;
  padding: 0;
  line-height: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.santiago-steps-section__title-img {
  display: block;
  height: 370px;
  width: auto;
  object-fit: contain;
  border: 3px solid var(--color-orange);
  padding: 20px;
  position: absolute;
  right: 1rem;
  bottom: 0;
}
</style>
