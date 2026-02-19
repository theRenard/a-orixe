<template>
<section class="orixe-interview-section">
  <div class="container">
    <div class="centered">
      <p class="type__interview-question mb-0 orixe-interview-section__block paragraph-spacing"
        v-html="$t('orixeInterview.title')"></p>
      <p class="type__interview-answer mt-0 orixe-interview-section__block paragraph-spacing"
        v-html="$t('orixeInterview.paragraph1')"></p>
      <p class="type__interview-question mb-0 orixe-interview-section__block paragraph-spacing"
        v-html="$t('orixeInterview.question1')"></p>
      <p class="type__interview-answer mt-0 orixe-interview-section__block paragraph-spacing"
        v-html="$t('orixeInterview.answer1')"></p>
      <p class="type__interview-question mb-0 orixe-interview-section__block paragraph-spacing"
        v-html="$t('orixeInterview.question2')"></p>
      <p class="type__interview-answer mt-0 orixe-interview-section__block paragraph-spacing"
        v-html="$t('orixeInterview.answer2')"></p>
    </div>
  </div>
</section>
</template>
