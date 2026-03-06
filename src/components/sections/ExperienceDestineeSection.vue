<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import bateauIllustration from '@/assets/illustrations/bateau.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
let cleanup: (() => void) | undefined

onMounted(() => {
  if (!sectionRoot.value) return
  cleanup = useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
    ],
  })
})
onUnmounted(() => cleanup?.())
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: illustration, direction: 'right', delay: 0 }, { el: content, direction: 'left', delay: 0.1 }, { el: question1, direction: 'left', delay: 0.2 }, { el: answer1Intro, direction: 'left', delay: 0.2 }, { el: question1b, direction: 'right', delay: 0.2 }, { el: answer1b, direction: 'right', delay: 0.2 }, { el: answer1, direction: 'left', delay: 0.2 }, { el: question2, direction: 'left', delay: 0.2 }, { el: answer2, direction: 'left', delay: 0.2 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'experience-destinee-section', 'section--full-viewport']" data-block data-component="ExperienceDestineeSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
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
