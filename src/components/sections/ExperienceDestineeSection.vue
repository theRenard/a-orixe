<script setup lang="ts">
import bateauIllustration from '@/assets/illustrations/bateau.webp'
</script>

<template>
  <section class="experience-destinee-section">
    <div class="container">
      <div class="centered">
        <img
          :src="bateauIllustration"
          :alt="$t('experienceDestinee.illustrationAlt')"
          class="experience-destinee-section__illustration paragraph-spacing"
          loading="lazy"
        >
        <p class="type__interview-question experience-destinee-section__block paragraph-spacing" v-html="$t('experienceDestinee.question1')"></p>
        <p class="type__interview-answer experience-destinee-section__block paragraph-spacing" v-html="$t('experienceDestinee.answer1')"></p>
        <p class="type__interview-question experience-destinee-section__block paragraph-spacing" v-html="$t('experienceDestinee.question2')"></p>
        <p class="type__interview-answer experience-destinee-section__block paragraph-spacing" v-html="$t('experienceDestinee.answer2')"></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-destinee-section__illustration {
  display: block;
  max-width: 100%;
  width: auto;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>

