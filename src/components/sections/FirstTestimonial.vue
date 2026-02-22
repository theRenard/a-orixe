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
  scrollTrigger: { trigger: sectionRoot, start: 'top 88%', once: true },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<section ref="sectionRoot" class="section--full-viewport with-background with-shadow">
  <div class="container">
    <blockquote class="centered">
      <div ref="blockquoteInner">
        <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
          <span v-html="$t('camino.quote')"></span>
        </p>
        <footer class="type__testimonial-name" v-html="$t('camino.quoteAuthor')"></footer>
      </div>
    </blockquote>
  </div>
</section>
</template>

<style scoped>
.section--full-viewport.with-background.with-shadow {
  overflow-x: hidden;
}
</style>
