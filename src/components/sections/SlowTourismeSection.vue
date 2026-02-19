<script setup lang="ts">
import villageIllustration from '@/assets/illustrations/village.webp'
</script>

<template>
<section class="slow-tourisme-section">
  <div class="container">
    <div class="centered">
      <h2 class="type__interview-title slow-tourisme-section__headline heading-spacing">
        {{ $t('slowTourisme.title') }}
      </h2>
      <p class="type__interview-subtitle slow-tourisme-section__intro paragraph-spacing"
        v-html="$t('slowTourisme.paragraph1')"></p>
      <p class="type__interview-question slow-tourisme-section__question paragraph-spacing"
        v-html="$t('slowTourisme.question')"></p>
      <p class="type__interview-answer slow-tourisme-section__answer paragraph-spacing">
        <span class="type__interview-question" v-html="$t('slowTourisme.answerPrefix')"></span>
        <span v-html="$t('slowTourisme.answerBody')"></span>
      </p>
      <img :src="villageIllustration" :alt="$t('slowTourisme.illustrationAlt')"
        class="slow-tourisme-section__illustration paragraph-spacing" loading="lazy">
    </div>
  </div>
</section>
</template>

<style scoped>
.slow-tourisme-section__illustration {
  display: block;
  max-width: 100%;
  width: auto;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>
