<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted, onUnmounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

gsap.registerPlugin(ScrollTrigger)

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const textBlock = ref<HTMLElement | null>(null)
const imageBlock = ref<HTMLElement | null>(null)
const closingParagraph = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: title, direction: 'left', delay: 0 },
    { el: textBlock, direction: 'right', delay: 0.1 },
    { el: closingParagraph, direction: 'left', delay: 0.35 },
  ],
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
  const img = imageBlock.value?.querySelector<HTMLElement>('.image-crop img')
  const triggerEl = sectionRoot.value
  if (img && triggerEl) {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: triggerEl, start: 'top 70%', once: true },
    })
    tl.fromTo(
      img,
      { scale: 2, transformOrigin: '50% 0%' },
      { scale: 1, duration: 2, ease: 'power2.out', transformOrigin: '50% 100%' },
    )
    onUnmounted(() => tl.scrollTrigger?.kill())
  }
})
</script>

<template>
<div data-block data-component="RessentirLieuxSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="ressentir-lieux-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('ressentirLieux.title') }}
          </h2>
          <div ref="textBlock">
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.paragraph')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.transition')"></p>
            <p class="type__question paragraph-spacing" v-html="$t('ressentirLieux.question')"></p>
          </div>
        </div>
        <div ref="imageBlock" class="ressentir-lieux-section__image-wrap">
          <ImageCrop width="100%" height="300px" position="0 75%" :caption="$t('ressentirLieux.imageCaption')"
            caption-position="top">
            <img src="../../assets/photos/01_florence_antunes.webp" :alt="$t('ressentirLieux.imageCaption')"
              class="ressentir-lieux-section__image" loading="lazy">
          </ImageCrop>
        </div>
        <div class="centered">
          <p ref="closingParagraph" class="type__section-paragraph paragraph-spacing"
            v-html="$t('ressentirLieux.paragraph2')"></p>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.ressentir-lieux-section {
  overflow-x: hidden;
}

.ressentir-lieux-section__image-wrap {
  overflow: visible;
}
</style>
