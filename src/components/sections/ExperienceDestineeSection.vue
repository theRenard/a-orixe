<template>
  <section class="experience-destinee-section">
    <div class="container">
      <div class="centered">
        <p class="type__interview-question experience-destinee-section__block mt-5">
          {{ $t('experienceDestinee.question1') }}
        </p>
        <p class="type__interview-answer experience-destinee-section__block">
          {{ $t('experienceDestinee.answer1') }}
        </p>
        <p class="type__interview-question experience-destinee-section__block">
          {{ $t('experienceDestinee.question2') }}
        </p>
        <p class="type__interview-answer experience-destinee-section__block mb-5">
          {{ $t('experienceDestinee.answer2') }}
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
