<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: blockquoteInner, direction: 'down', delay: 0.5 }]
  - offset: 40
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="ThirdTestimonial" class="block">
  <div data-block-inner class="block-inner">
    <section class="section--half-viewport with-shadow">
      <div class="container">
        <div class="centered">
          <div>
            <p class="type__section-paragraph travail-fourmi-paragraph paragraph-spacing"
              v-html="$t('travailFourmi.paragraph')"></p>
          </div>
        </div>
      </div>
    </section>
    <section class="testimonial section--half-viewport with-background with-shadow third-testimonial">
      <div class="container">
        <blockquote class="centered">
          <div>
            <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
              <span v-html="$t('thirdTestimonial.quote')"></span>
            </p>
            <footer class="type__testimonial-name" v-html="$t('thirdTestimonial.quoteAuthor')"></footer>
          </div>
        </blockquote>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.third-testimonial {
  overflow-x: hidden;
}
</style>
