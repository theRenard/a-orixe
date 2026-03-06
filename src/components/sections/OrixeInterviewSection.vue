<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()

const sectionRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: block1, direction: 'left', delay: 0 }, { el: block2, direction: 'right', delay: 0.1 }, { el: block3, direction: 'left', delay: 0.2 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'orixe-interview-section', 'section--full-viewport']" data-block data-component="OrixeInterviewSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <div>
            <p class="type__interview-question mb-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.title')"></p>
            <p class="type__interview-answer mt-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.paragraph1')"></p>
          </div>
          <div>
            <p class="type__interview-question mb-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.question1')"></p>
            <p class="type__interview-answer mt-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.answer1')"></p>
          </div>
          <div>
            <p class="type__interview-question mb-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.question2')"></p>
            <p class="type__interview-answer mt-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.answer2')"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.orixe-interview-section {
  overflow-x: hidden;
}
</style>
