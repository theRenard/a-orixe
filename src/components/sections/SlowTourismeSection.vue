<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import villageIllustration from '@/assets/illustrations/village.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const illustration = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)
const answer = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: title, direction: 'left', delay: 0 },
    { el: question, direction: 'left', delay: 0.1 },
    { el: answer, direction: 'left', delay: 0.1 },
    { el: illustration, direction: 'left', delay: 0.2 },
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
<div data-block data-component="SlowTourismeSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="slow-tourisme-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__interview-title slow-tourisme-section__headline heading-spacing">
            {{ $t('slowTourisme.title') }}
          </h2>
          <div ref="content">
            <p class="type__interview-subtitle slow-tourisme-section__intro paragraph-spacing"
              v-html="$t('slowTourisme.paragraph1')"></p>
            <p ref="question" class="type__interview-question slow-tourisme-section__question paragraph-spacing mb-0"
              v-html="$t('slowTourisme.question')"></p>
            <p ref="answer" class="type__interview-answer slow-tourisme-section__answer paragraph-spacing mt-0">
              <span class="type__interview-question" v-html="$t('slowTourisme.answerPrefix')"></span>
              <span v-html="$t('slowTourisme.answerBody')"></span>
            </p>
          </div>
          <img ref="illustration" :src="villageIllustration" :alt="$t('slowTourisme.illustrationAlt')"
            class="slow-tourisme-section__illustration paragraph-spacing" loading="lazy">
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.slow-tourisme-section {
  overflow-x: hidden;
}

.slow-tourisme-section__illustration {
  display: block;
  max-width: 100%;
  width: auto;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>
