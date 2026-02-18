<template>
<section class="slow-tourisme-section">
  <div class="container">
    <div class="centered">
      <h2 class="type__interview-title slow-tourisme-section__headline heading-spacing">
        {{ $t('slowTourisme.title') }}
      </h2>
      <p class="type__interview-subtitle slow-tourisme-section__intro paragraph-spacing" v-html="$t('slowTourisme.paragraph1')"></p>
      <p class="type__interview-question slow-tourisme-section__question paragraph-spacing" v-html="$t('slowTourisme.question')"></p>
      <p class="type__interview-answer slow-tourisme-section__answer paragraph-spacing">
        <span class="type__interview-question" v-html="$t('slowTourisme.answerPrefix')"></span>
        <span v-html="$t('slowTourisme.answerBody')"></span>
      </p>
    </div>
  </div>
</section>
</template>
