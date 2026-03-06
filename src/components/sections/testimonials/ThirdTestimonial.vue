<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ sectionIndex: number }>()
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
<section :class="['section', `section-${sectionIndex}`]" data-block data-component="ThirdTestimonial">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
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
</section>
</template>

<style scoped>
.third-testimonial {
  overflow-x: hidden;
}
</style>
