<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation, type UseAnimationTween } from '@/composables/useAnimation'

const { locale } = useI18n()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const blockquoteInner = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !blockquoteInner.value) return
  const tweens: UseAnimationTween[] = [
    { el: blockquoteInner, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, delay: 0.5, ease: 'power3.out' } },
  ]
  if (imageRef.value) {
    tweens.push({ el: imageRef, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 1.1, ease: 'power3.out' } })
  }
  useAnimation({ trigger: sectionRoot, tweens })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: blockquoteInner, direction: 'down', delay: 0.5 }, { el: imageRef, direction: 'left', delay: 1.1 }]
  - offset: 40
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'testimonial', 'section--full-viewport', 'with-background', 'with-shadow', 'fourth-testimonial']" data-block data-component="FourthTestimonial">
  <div class="section-inner" data-block-inner>
      <div class="container fourth-testimonial__container">
        <img v-if="!isMobile" ref="imageRef" src="@/assets/illustrations/mouette.webp"
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
