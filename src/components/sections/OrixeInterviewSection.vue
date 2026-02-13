<template>
  <section class="orixe-interview-section">
    <div class="container">
      <div class="centered">
        <p class="type__interview-question orixe-interview-section__block mt-5">
          {{ $t('orixeInterview.title') }}
        </p>
        <p class="type__interview-answer orixe-interview-section__block">
          {{ $t('orixeInterview.paragraph1') }}
        </p>
        <p class="type__interview-question orixe-interview-section__block">
          {{ $t('orixeInterview.question1') }}
        </p>
        <p class="type__interview-answer orixe-interview-section__block">
          {{ $t('orixeInterview.answer1') }}
        </p>
        <p class="type__interview-question orixe-interview-section__block">
          {{ $t('orixeInterview.question2') }}
        </p>
        <p class="type__interview-answer orixe-interview-section__block mb-5">
          {{ $t('orixeInterview.answer2') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.type__interview-answer + .type__interview-question {
  margin-top: 1.5rem;
}
</style>
