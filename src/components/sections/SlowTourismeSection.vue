<template>
  <section class="slow-tourisme-section">
    <div class="container">
      <div class="centered">
        <h2 class="type__interview-title slow-tourisme-section__headline heading-spacing">
          {{ $t('slowTourisme.title') }}
        </h2>
        <p class="type__interview-subtitle slow-tourisme-section__intro paragraph-spacing">
          {{ $t('slowTourisme.paragraph1') }}
        </p>
        <p class="type__interview-question slow-tourisme-section__question paragraph-spacing">
          {{ $t('slowTourisme.question') }}
        </p>
        <p class="type__interview-answer slow-tourisme-section__answer paragraph-spacing">
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
}

</style>
