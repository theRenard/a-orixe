<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import bateauIllustration from '@/assets/illustrations/bateau.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'

const sectionRoot = ref<HTMLElement | null>(null)
const illustration = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const question1 = ref<HTMLElement | null>(null)
const answer1Intro = ref<HTMLElement | null>(null)
const question1b = ref<HTMLElement | null>(null)
const answer1b = ref<HTMLElement | null>(null)
const answer1 = ref<HTMLElement | null>(null)
const question2 = ref<HTMLElement | null>(null)
const answer2 = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: illustration, direction: 'right', delay: 0 },
    { el: content, direction: 'left', delay: 0.1 },
    { el: question1, direction: 'left', delay: 0.2 },
    { el: answer1Intro, direction: 'left', delay: 0.2 },
    { el: question1b, direction: 'right', delay: 0.2 },
    { el: answer1b, direction: 'right', delay: 0.2 },
    { el: answer1, direction: 'left', delay: 0.2 },
    { el: question2, direction: 'left', delay: 0.2 },
    { el: answer2, direction: 'left', delay: 0.2 },
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
<div data-block data-component="ExperienceDestineeSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="experience-destinee-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <img ref="illustration" :src="bateauIllustration" :alt="$t('experienceDestinee.illustrationAlt')"
            class="experience-destinee-section__illustration paragraph-spacing" loading="lazy">
          <div ref="content">
            <p ref="question1" class="type__interview-question mb-0 experience-destinee-section__block paragraph-spacing"
              v-html="$t('experienceDestinee.question1')"></p>
            <template v-if="$te('experienceDestinee.answer1Intro')">
              <p ref="answer1Intro" class="type__interview-answer mt-0 experience-destinee-section__block paragraph-spacing"
                v-html="$t('experienceDestinee.answer1Intro')"></p>
              <p ref="question1b" class="type__interview-question mb-0 experience-destinee-section__block paragraph-spacing"
                v-html="$t('experienceDestinee.question1b')"></p>
              <p ref="answer1b" class="type__interview-answer mt-0 experience-destinee-section__block paragraph-spacing"
                v-html="$t('experienceDestinee.answer1b')"></p>
            </template>
            <p v-else ref="answer1" class="type__interview-answer mt-0 experience-destinee-section__block paragraph-spacing"
              v-html="$t('experienceDestinee.answer1')"></p>
            <p ref="question2" class="type__interview-question mb-0 experience-destinee-section__block paragraph-spacing"
              v-html="$t('experienceDestinee.question2')"></p>
            <p ref="answer2" class="type__interview-answer mt-0 experience-destinee-section__block paragraph-spacing"
              v-html="$t('experienceDestinee.answer2')"></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.experience-destinee-section {
  overflow-x: hidden;
}

.experience-destinee-section__illustration {
  display: block;
  max-width: 100%;
  width: auto;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>
