<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const { locale } = useI18n()
const sectionRoot = ref<HTMLElement | null>(null)
const blockquoteInner = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [{ el: blockquoteInner, direction: 'left' }],
  duration: 0.65,
  offset: 40,
  ease: 'power3.out',
  scrollTrigger: { trigger: blockquoteInner, start: 'top 80%' },
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
      <div ref="blockquoteInner">
        <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
          <span v-html="$t('secondTestimonial.quote')"></span>
        </p>
        <footer class="type__testimonial-name" v-html="$t('secondTestimonial.quoteAuthor')"></footer>
      </div>
    </blockquote>
    <img src="@/assets/illustrations/phare.webp" :alt="$t('secondTestimonial.quote')"
      class="second-testimonial__image ml-auto" loading="lazy">
  </div>
  <div class="container mb-2" style="position: absolute; bottom: 0; left: 0; right: 0;">
    <div class="centered">
      <p class="type__footnote paragraph-spacing" v-html="$t('secondTestimonial.footnote')"></p>
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
