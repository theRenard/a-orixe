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
  <section ref="sectionRoot" class="section--full-viewport with-background with-shadow fourth-testimonial">
    <div class="container fourth-testimonial__container">
      <img
        src="@/assets/illustrations/mouette.webp"
        :alt="$t('fourthTestimonial.quote')"
        class="fourth-testimonial__bird"
        loading="lazy"
      >
      <blockquote class="centered">
        <div ref="blockquoteInner">
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

@media (max-width: 768px) {
  .fourth-testimonial__bird {
    width: 80px;
    right: 1rem;
  }
}
</style>
