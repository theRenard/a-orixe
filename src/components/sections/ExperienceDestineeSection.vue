<script setup lang="ts">
import bateauIllustration from '@/assets/illustrations/bateau.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isMobile } = useMobileDetection()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: illustration, direction: 'right', delay: 0 }, { el: content, direction: 'left', delay: 0.1 }, { el: question1, direction: 'left', delay: 0.2 }, { el: answer1Intro, direction: 'left', delay: 0.2 }, { el: question1b, direction: 'right', delay: 0.2 }, { el: answer1b, direction: 'right', delay: 0.2 }, { el: answer1, direction: 'left', delay: 0.2 }, { el: question2, direction: 'left', delay: 0.2 }, { el: answer2, direction: 'left', delay: 0.2 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="ExperienceDestineeSection" class="block">
  <div data-block-inner class="block-inner">
    <section class="experience-destinee-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <img :src="bateauIllustration" :alt="$t('experienceDestinee.illustrationAlt')"
            class="experience-destinee-section__illustration" :class="{ 'paragraph-spacing': isMobile }" loading="lazy">
          <div>
            <p class="type__interview-question mb-0 experience-destinee-section__block paragraph-spacing"
              v-html="$t('experienceDestinee.question1')"></p>
            <template v-if="$te('experienceDestinee.answer1Intro')">
              <p class="type__interview-answer mt-0 experience-destinee-section__block paragraph-spacing"
                v-html="$t('experienceDestinee.answer1Intro')"></p>
              <p class="type__interview-question mb-0 experience-destinee-section__block paragraph-spacing"
                v-html="$t('experienceDestinee.question1b')"></p>
              <p class="type__interview-answer mt-0 experience-destinee-section__block paragraph-spacing"
                v-html="$t('experienceDestinee.answer1b')"></p>
            </template>
            <p v-else class="type__interview-answer mt-0 experience-destinee-section__block paragraph-spacing"
              v-html="$t('experienceDestinee.answer1')"></p>
            <p class="type__interview-question mb-0 experience-destinee-section__block paragraph-spacing"
              v-html="$t('experienceDestinee.question2')"></p>
            <p class="type__interview-answer mt-0 experience-destinee-section__block paragraph-spacing"
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
