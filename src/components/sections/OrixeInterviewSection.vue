<script setup lang="ts">
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: block1, direction: 'left', delay: 0 }, { el: block2, direction: 'right', delay: 0.1 }, { el: block3, direction: 'left', delay: 0.2 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="OrixeInterviewSection" class="block">
  <div data-block-inner class="block-inner">
    <section class="orixe-interview-section section--full-viewport">
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
    </section>
  </div>
</div>
</template>

<style scoped>
.orixe-interview-section {
  overflow-x: hidden;
}
</style>
