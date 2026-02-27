<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'

const { locale } = useI18n()
const sectionRoot = ref<HTMLElement | null>(null)
const blockquoteInner = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run } = useRevealAnimation({
  elements: [{ el: blockquoteInner, direction: 'down', delay: 1 }],
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
<div data-block data-component="ThirdTestimonial" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="section--half-viewport with-shadow">
      <div class="container">
        <div class="centered">
          <div>
            <p class="type__section-paragraph travail-fourmi-paragraph paragraph-spacing"
              v-html="$t('travailFourmi.paragraph')"></p>
          </div>
        </div>
      </div>
    </section>
    <section ref="sectionRoot" class="testimonial section--half-viewport with-background with-shadow third-testimonial">
      <div class="container">
        <blockquote class="centered">
          <div ref="blockquoteInner">
            <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
              <span v-html="$t('thirdTestimonial.quote')"></span>
            </p>
            <footer class="type__testimonial-name" v-html="$t('thirdTestimonial.quoteAuthor')"></footer>
          </div>
        </blockquote>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.third-testimonial {
  overflow-x: hidden;
}
</style>
