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
<div data-block data-component="FifthTestimonial" class="block">
  <div data-block-inner class="block-inner">
    <section class="fifth-testimonial section--half-viewport">
      <div class="container">
        <div class="centered">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.paragraph2')"></p>
        </div>
      </div>
    </section>
    <section class="testimonial fifth-testimonial section--half-viewport with-background with-shadow">
      <div class="container">
        <blockquote class="centered">
          <div>
            <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
              <span v-html="$t('fifthTestimonial.quote')"></span>
            </p>
            <footer class="type__testimonial-name" v-html="$t('fifthTestimonial.quoteAuthor')"></footer>
          </div>
        </blockquote>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.fifth-testimonial {
  overflow-x: hidden;
}
</style>
