<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const block1 = ref<HTMLElement | null>(null)
const block2 = ref<HTMLElement | null>(null)
const block3 = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: block1, direction: 'left', delay: 0 },
    { el: block2, direction: 'right', delay: 0.1 },
    { el: block3, direction: 'left', delay: 0.2 },
  ],
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="OrixeInterviewSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="orixe-interview-section section--full-viewport">
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
    </section>
  </div>
</div>
</template>

<style scoped>
.orixe-interview-section {
  overflow-x: hidden;
}
</style>
