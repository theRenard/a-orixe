<script setup lang="ts">
import villageIllustration from '@/assets/illustrations/village.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isMobile } = useMobileDetection()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }, { el: question, direction: 'left', delay: 0.1 }, { el: answer, direction: 'left', delay: 0.1 }, { el: illustration, direction: 'left', delay: 0.2 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="SlowTourismeSection" class="block">
  <div data-block-inner class="block-inner">
    <section class="slow-tourisme-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <h2 class="type__interview-title slow-tourisme-section__headline heading-spacing">
            {{ $t('slowTourisme.title') }}
          </h2>
          <div>
            <p class="type__interview-subtitle slow-tourisme-section__intro paragraph-spacing"
              v-html="$t('slowTourisme.paragraph1')"></p>
            <p class="type__interview-question slow-tourisme-section__question paragraph-spacing mb-0"
              v-html="$t('slowTourisme.question')"></p>
            <p class="type__interview-answer slow-tourisme-section__answer paragraph-spacing mt-0">
              <span class="type__interview-question" v-html="$t('slowTourisme.answerPrefix')"></span>
              <span v-html="$t('slowTourisme.answerBody')"></span>
            </p>
          </div>
          <img :src="villageIllustration" :alt="$t('slowTourisme.illustrationAlt')"
            class="slow-tourisme-section__illustration" :class="{ 'paragraph-spacing': isMobile }" loading="lazy">
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
