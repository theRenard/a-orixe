<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
<section class="section--full-viewport with-background with-shadow" style="position: relative;">
  <div class="container">
    <blockquote class="centered">
      <div>
        <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
          <span v-html="$t('secondTestimonial.quote')"></span>
        </p>
        <footer class="type__testimonial-name" v-html="$t('secondTestimonial.quoteAuthor')"></footer>
      </div>
    </blockquote>
    <img src="../../assets/illustrations/phare.webp" :alt="$t('secondTestimonial.quote')"
      class="second-testimonial__image ml-auto" loading="lazy">
  </div>
  <!-- position absolute -->
  <div class="container mb-2" style="position: absolute; bottom: 0; left: 0; right: 0;">
    <div class="centered">
      <p class="type__footnote paragraph-spacing" v-html="$t('secondTestimonial.footnote')"></p>
    </div>
  </div>
</section>
</template>

<style scoped>
.second-testimonial__image {
  display: block;
  max-width: 100%;
  height: auto;
  align-self: flex-end;
}
</style>
