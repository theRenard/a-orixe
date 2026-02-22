<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
  <section class="section--full-viewport with-background with-shadow fourth-testimonial">
    <div class="container fourth-testimonial__container">
      <img
        src="../../assets/illustrations/mouette.webp"
        :alt="$t('fourthTestimonial.quote')"
        class="fourth-testimonial__bird"
        loading="lazy"
      >
      <blockquote class="centered">
        <div>
          <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
            <span v-html="$t('fourthTestimonial.quote')"></span>
          </p>
          <footer class="type__testimonial-name" v-html="$t('fourthTestimonial.quoteAuthor')"></footer>
        </div>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.fourth-testimonial__container {
  position: relative;
}

.fourth-testimonial__bird {
  position: absolute;
  top: 0;
  right: var(--space-3);
  width: calc(var(--fluid-base) * 7.5);
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .fourth-testimonial__bird {
    width: calc(var(--fluid-base) * 5);
    right: var(--space-2);
  }
}
</style>
