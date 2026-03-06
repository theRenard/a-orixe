<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { locale } = useI18n()
const { isMobile } = useMobileDetection()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: blockquoteInner, direction: 'down', delay: 0.5 }, { el: imageRef, direction: 'left', delay: 1.1 }]
  - offset: 40
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="FourthTestimonial" class="block">
  <div data-block-inner class="block-inner">
    <section
      class="testimonial section--full-viewport with-background with-shadow fourth-testimonial">
      <div class="container fourth-testimonial__container">
        <img v-if="!isMobile" src="@/assets/illustrations/mouette.webp"
          :alt="$t('fourthTestimonial.quote')" class="fourth-testimonial__bird" loading="lazy">
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
  </div>
</div>
</template>

<style scoped>
.fourth-testimonial {
  overflow-x: hidden;
}

.fourth-testimonial__container {
  position: relative;
}

.fourth-testimonial__bird {
  position: absolute;
  top: 0;
  right: 2rem;
  width: 120px;
  height: auto;
  display: block;
}
</style>
