<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()
const { locale } = useI18n()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const blockquoteInner = ref<HTMLElement | null>(null)
let cleanup: (() => void) | undefined

onMounted(() => {
  if (!sectionRoot.value || !blockquoteInner.value) return
  cleanup = useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: blockquoteInner, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, delay: 0.5, ease: 'power3.out' } },
    ],
  })
})
onUnmounted(() => cleanup?.())
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: blockquoteInner, direction: 'down', delay: 0.5 }, { el: imageRef, direction: 'left', delay: 1.1 }]
  - offset: 40
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'testimonial', 'section--full-viewport', 'with-background', 'with-shadow', 'fourth-testimonial']" data-block data-component="FourthTestimonial">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container fourth-testimonial__container">
        <img v-if="!isMobile" src="@/assets/illustrations/mouette.webp"
          :alt="$t('fourthTestimonial.quote')" class="fourth-testimonial__bird" loading="lazy">
        <blockquote class="centered">
          <div ref="blockquoteInner">
            <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
              <span v-html="$t('fourthTestimonial.quote')"></span>
            </p>
            <footer class="type__testimonial-name" v-html="$t('fourthTestimonial.quoteAuthor')"></footer>
          </div>
        </blockquote>
      </div>
    </div>
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
</style>
