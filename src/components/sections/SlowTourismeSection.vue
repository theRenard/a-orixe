<template>
  <section class="slow-tourisme-section">
    <div class="container">
      <div class="centered">
        <h2 class="type__interview-title slow-tourisme-section__headline mt-5">
          {{ $t('slowTourisme.title') }}
        </h2>
        <p class="type__interview-subtitle slow-tourisme-section__intro">
          {{ $t('slowTourisme.paragraph1') }}
        </p>
        <p class="type__interview-question slow-tourisme-section__question">
          {{ $t('slowTourisme.question') }}
        </p>
        <p class="type__interview-answer slow-tourisme-section__answer mb-5">
          <span class="type__interview-question">{{ $t('slowTourisme.answerPrefix') }}</span>
          {{ $t('slowTourisme.answerBody') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slow-tourisme-section__headline {
  text-align: center;
  margin-bottom: 2.5rem;
}

.slow-tourisme-section__intro {
  margin-top: 0;
  margin-bottom: 0;
}

.slow-tourisme-section__question {
  margin-top: 2rem;
  margin-bottom: 0;
}

.slow-tourisme-section__answer {
  margin-top: 1.5rem;
  margin-bottom: 0;
}
</style>
