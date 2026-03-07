<script setup lang="ts">
import { ref, onMounted } from 'vue'
import villageIllustration from '@/assets/illustrations/village.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)
const answer = ref<HTMLElement | null>(null)
const illustration = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
      { el: question, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.1, ease: 'power3.out' } },
      { el: answer, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.1, ease: 'power3.out' } },
      { el: illustration, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'slow-tourisme-section', 'section--full-viewport']" data-block data-component="SlowTourismeSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__interview-title slow-tourisme-section__headline heading-spacing">
            {{ $t('slowTourisme.title') }}
          </h2>
          <div>
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
            class="slow-tourisme-section__illustration" :class="{ 'paragraph-spacing': isMobile }" loading="lazy">
        </div>
      </div>
    </div>
</section>
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
