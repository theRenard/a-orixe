<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const { locale } = useI18n()
const sectionRoot = ref<HTMLElement | null>(null)
const quoteBlock = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const footnote = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: quoteBlock, direction: 'left', delay: 0 },
    { el: image, direction: 'right', delay: 0.1 },
    { el: footnote, direction: 'left', delay: 0.18 },
  ],
  duration: 0.6,
  offset: 40,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot, start: 'top 88%', once: true },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<section ref="sectionRoot" class="section--full-viewport with-background with-shadow second-testimonial" style="position: relative;">
  <div class="container">
    <blockquote class="centered">
      <div ref="quoteBlock">
        <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
          <span v-html="$t('secondTestimonial.quote')"></span>
        </p>
        <footer class="type__testimonial-name" v-html="$t('secondTestimonial.quoteAuthor')"></footer>
      </div>
    </blockquote>
    <img ref="image" src="../../assets/illustrations/phare.webp" :alt="$t('secondTestimonial.quote')"
      class="second-testimonial__image ml-auto" loading="lazy">
  </div>
  <div class="container mb-2" style="position: absolute; bottom: 0; left: 0; right: 0;">
    <div class="centered">
      <p ref="footnote" class="type__footnote paragraph-spacing" v-html="$t('secondTestimonial.footnote')"></p>
    </div>
  </div>
</section>
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
</style>
