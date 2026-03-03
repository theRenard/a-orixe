<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { locale } = useI18n()
const { isMobile } = useMobileDetection()
const sectionRoot = ref<HTMLElement | null>(null)
const blockquoteInner = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run, setInitialState } = useRevealAnimation({
  elements: [
    { el: blockquoteInner, direction: 'down', delay: 0.5 },
    { el: imageRef, direction: 'right', delay: 1.1 },
  ],
  offset: 40,
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
<div data-block data-component="SecondTestimonial" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="testimonial section--full-viewport with-background with-shadow second-testimonial"
      style="position: relative;">
      <div class="container">
        <blockquote class="centered">
          <div ref="blockquoteInner">
            <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
              <span v-html="$t('secondTestimonial.quote')"></span>
            </p>
            <footer class="type__testimonial-name" v-html="$t('secondTestimonial.quoteAuthor')"></footer>
          </div>
        </blockquote>
        <img ref="imageRef" src="@/assets/illustrations/phare.webp" :alt="$t('secondTestimonial.quote')"
          class="second-testimonial__image ml-auto" loading="lazy">
      </div>
      <div class="container mb-2" :class="{ 'absolute-bottom': !isMobile }">
        <div class="centered">
          <p class="type__footnote paragraph-spacing" :class="{ 'mb-0': isMobile }"
            v-html="$t('secondTestimonial.footnote')"></p>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.second-testimonial {
  overflow-x: hidden;
}

.second-testimonial__image {
  display: block;
  max-width: 100%;
  height: auto;
  align-self: flex-end;
}

@media (max-width: 47.99rem) {
  .second-testimonial__image {
    margin-top: 10rem;
  }
}

.absolute-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
