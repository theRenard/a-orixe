<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimation } from '@/composables/useAnimation'


const sectionRoot = ref<HTMLElement | null>(null)
const block1 = ref<HTMLElement | null>(null)
const block2 = ref<HTMLElement | null>(null)
const block3 = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: block1, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
      { el: block2, from: { x: 80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.1, ease: 'power3.out' } },
      { el: block3, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
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
<section ref="sectionRoot" :class="['section', 'orixe-interview-section', 'section--full-viewport']" data-block data-component="OrixeInterviewSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <div ref="block1">
            <p class="type__interview-question mb-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.title')"></p>
            <p class="type__interview-answer mt-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.paragraph1')"></p>
          </div>
          <div ref="block2">
            <p class="type__interview-question mb-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.question1')"></p>
            <p class="type__interview-answer mt-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.answer1')"></p>
          </div>
          <div ref="block3">
            <p class="type__interview-question mb-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.question2')"></p>
            <p class="type__interview-answer mt-0 orixe-interview-section__block paragraph-spacing"
              v-html="$t('orixeInterview.answer2')"></p>
          </div>
        </div>
      </div>
    </div>
</section>
</template>

