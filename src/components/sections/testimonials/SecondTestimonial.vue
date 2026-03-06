<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { locale } = useI18n()
const { isMobile } = useMobileDetection()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: blockquoteInner, direction: 'down', delay: 0.5 }, { el: imageRef, direction: 'right', delay: 1.1 }]
  - offset: 40
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="SecondTestimonial" class="block">
  <div data-block-inner class="block-inner">
    <section class="testimonial section--full-viewport with-background with-shadow second-testimonial"
      style="position: relative;">
      <div class="container">
        <blockquote class="centered">
          <div>
            <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
              <span v-html="$t('secondTestimonial.quote')"></span>
            </p>
            <footer class="type__testimonial-name" v-html="$t('secondTestimonial.quoteAuthor')"></footer>
          </div>
        </blockquote>
        <img src="@/assets/illustrations/phare.webp" :alt="$t('secondTestimonial.quote')"
          class="second-testimonial__image ml-auto" loading="lazy">
      </div>
      <div class="container mb-2" :class="{ 'absolute-bottom': !isMobile }">
        <div class="centered">
          <p class="type__footnote paragraph-spacing" :class="{ 'mb-0': isMobile }"
            v-html="$t('secondTestimonial.footnote')"></p>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.second-testimonial {
  overflow-x: hidden;
}

.second-testimonial__image {
  display: block;
  max-width: 100%;
  height: auto;
  align-self: flex-end;
}

@media (max-width: 47.99rem) {
  .second-testimonial__image {
    margin-top: 10rem;
  }
}

.absolute-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
