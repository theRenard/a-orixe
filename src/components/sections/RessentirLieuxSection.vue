<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted, onUnmounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

gsap.registerPlugin(ScrollTrigger)

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)
const imageBlock = ref<HTMLElement | null>(null)
const titleBlock = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: imageBlock, delay: 0, steps: [
      { to: { scale: 1.5 }, duration: 0, opacity: 0, transformOrigin: 'center top' },
      { to: { scale: 1 }, duration: 4, opacity: 1 }
    ], transformOrigin: 'center top' },
    { el: image, direction: 'down', scale: 3, transformOrigin: 'center top' },
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: titleBlock, direction: 'down', delay: 1 },
    { el: title, direction: 'right', delay: 1.1 },
    { el: question, direction: 'down', delay: 1.1 },
  ],
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot, start: 'top 10%' },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="RessentirLieuxSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="ressentir-lieux-section">
      <div class="container">
        <div ref="imageBlock" class="ressentir-lieux-section__image-wrap">
          <ImageCrop width="100%" height="300px" position="0 75%" :caption="$t('ressentirLieux.imageCaption')"
            caption-position="bottom">
            <img ref="image" src="../../assets/photos/01_florence_antunes.webp" :alt="$t('ressentirLieux.imageCaption')"
              class="ressentir-lieux-section__image" loading="lazy">
          </ImageCrop>
        </div>
        <div ref="titleBlock" class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('ressentirLieux.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.paragraph')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.transition')"></p>
            <p ref="question" class="type__question paragraph-spacing" v-html="$t('ressentirLieux.question')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.paragraph2')"></p>
          </div>
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
