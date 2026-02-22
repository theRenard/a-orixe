<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import villageIllustration from '@/assets/illustrations/village.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const illustration = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: title, direction: 'left', delay: 0 },
    { el: content, direction: 'right', delay: 0.1 },
    { el: illustration, direction: 'left', delay: 0.2 },
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
<section ref="sectionRoot" class="slow-tourisme-section">
  <div class="container">
    <div class="centered">
      <h2 ref="title" class="type__interview-title slow-tourisme-section__headline heading-spacing">
        {{ $t('slowTourisme.title') }}
      </h2>
      <div ref="content">
        <p class="type__interview-subtitle slow-tourisme-section__intro paragraph-spacing"
          v-html="$t('slowTourisme.paragraph1')"></p>
        <p class="type__interview-question slow-tourisme-section__question paragraph-spacing"
          v-html="$t('slowTourisme.question')"></p>
        <p class="type__interview-answer slow-tourisme-section__answer paragraph-spacing">
          <span class="type__interview-question" v-html="$t('slowTourisme.answerPrefix')"></span>
          <span v-html="$t('slowTourisme.answerBody')"></span>
        </p>
      </div>
      <img ref="illustration" :src="villageIllustration" :alt="$t('slowTourisme.illustrationAlt')"
        class="slow-tourisme-section__illustration paragraph-spacing" loading="lazy">
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
