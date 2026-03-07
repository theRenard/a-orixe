<script setup lang="ts">
import { ref, onMounted } from 'vue'
import bateauIllustration from '@/assets/illustrations/bateau.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const illustration = ref<HTMLImageElement | null>(null)
const content = ref<HTMLElement | null>(null)
const question1 = ref<HTMLElement | null>(null)
const answer1Intro = ref<HTMLElement | null>(null)
const question1b = ref<HTMLElement | null>(null)
const answer1b = ref<HTMLElement | null>(null)
const answer1 = ref<HTMLElement | null>(null)
const question2 = ref<HTMLElement | null>(null)
const answer2 = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: illustration, from: { x: 80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
      { el: content, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.1, ease: 'power3.out' } },
      { el: question1, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
      { el: answer1Intro, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
      { el: question1b, from: { x: 80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
      { el: answer1b, from: { x: 80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
      { el: answer1, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
      { el: question2, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
      { el: answer2, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'experience-destinee-section', 'section--full-viewport']" data-block data-component="ExperienceDestineeSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <img ref="illustration" :src="bateauIllustration" :alt="$t('experienceDestinee.illustrationAlt')"
            class="experience-destinee-section__illustration" :class="{ 'paragraph-spacing': isMobile }" loading="lazy">
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
    </div>
</section>
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
