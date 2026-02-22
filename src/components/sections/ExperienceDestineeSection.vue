<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import bateauIllustration from '@/assets/illustrations/bateau.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const illustration = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: illustration, direction: 'right', delay: 0 },
    { el: content, direction: 'left', delay: 0.1 },
  ],
  duration: 0.6,
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot, start: 'top 88%', once: true },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<section ref="sectionRoot" class="experience-destinee-section">
  <div class="container">
    <div class="centered">
      <img ref="illustration" :src="bateauIllustration" :alt="$t('experienceDestinee.illustrationAlt')"
        class="experience-destinee-section__illustration paragraph-spacing" loading="lazy">
      <div ref="content">
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
