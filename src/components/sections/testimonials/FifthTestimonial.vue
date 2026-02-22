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
<div data-block class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="fifth-testimonial section--full-viewport with-background with-shadow">
      <div class="container">
        <blockquote class="centered">
          <div ref="blockquoteInner">
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
