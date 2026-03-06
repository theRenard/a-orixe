<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()
const { locale } = useI18n()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const blockquoteInner = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !blockquoteInner.value || !imageRef.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: blockquoteInner, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, delay: 0.5, ease: 'power3.out' } },
      { el: imageRef, from: { x: 80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 1.1, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: blockquoteInner, direction: 'down', delay: 0.5 }, { el: imageRef, direction: 'right', delay: 1.1 }]
  - offset: 40
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'testimonial', 'section--full-viewport', 'with-background', 'with-shadow', 'second-testimonial']" style="position: relative;" data-block data-component="SecondTestimonial">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <blockquote class="centered">
          <div ref="blockquoteInner">
            <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
              <span v-html="$t('secondTestimonial.quote')"></span>
            </p>
            <footer class="type__testimonial-name" v-html="$t('secondTestimonial.quoteAuthor')"></footer>
          </div>
        </blockquote>
        <img ref="imageRef" src="@/assets/illustrations/phare.webp" :alt="$t('secondTestimonial.quote')"
          class="second-testimonial__image ml-auto" loading="lazy">
      </div>
      <div class="container mb-2" :class="{ 'absolute-bottom': !isMobile }">
        <div class="centered">
          <p class="type__footnote paragraph-spacing" :class="{ 'mb-0': isMobile }"
            v-html="$t('secondTestimonial.footnote')"></p>
        </div>
      </div>
    </div>
</section>
</template>

<style scoped>
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
