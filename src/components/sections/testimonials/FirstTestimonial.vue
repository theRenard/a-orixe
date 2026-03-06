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
<section :class="['section', `section-${sectionIndex}`, 'testimonial', 'section--full-viewport', 'with-background', 'with-shadow']" data-block data-component="FirstTestimonial">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <blockquote class="centered">
          <div>
            <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
              <span v-html="$t('camino.quote')"></span>
            </p>
            <footer class="type__testimonial-name" v-html="$t('camino.quoteAuthor')"></footer>
          </div>
        </blockquote>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.section--full-viewport.with-background.with-shadow {
  overflow-x: hidden;
}
</style>
