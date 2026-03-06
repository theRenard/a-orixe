<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useAnimation } from '@/composables/useAnimation'


const sectionRoot = ref<HTMLElement | null>(null)
const imageBlock = ref<HTMLElement | null>(null)
const image = ref<HTMLImageElement | null>(null)
const titleBlock = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !imageBlock.value || !image.value || !titleBlock.value || !title.value || !question.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: imageBlock, from: { scale: 1.5, opacity: 0, transformOrigin: 'center top' }, to: { scale: 1, opacity: 1, duration: 4, ease: 'power3.out', transformOrigin: 'center top' } },
      { el: image, from: { y: -80, opacity: 0, scale: 3, transformOrigin: 'center top' }, to: { y: 0, opacity: 1, scale: 1, ease: 'power3.out', transformOrigin: 'center top' } },
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: titleBlock, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, delay: 1, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 1.1, ease: 'power3.out' } },
      { el: question, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, delay: 1.1, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: imageBlock, delay: 0, steps: [{ to: { scale: 1.5 }, duration: 0, opacity: 0, transformOrigin: 'center top' }, { to: { scale: 1 }, duration: 4, opacity: 1 }], transformOrigin: 'center top' }, { el: image, direction: 'down', scale: 3, transformOrigin: 'center top' }, { el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: titleBlock, direction: 'down', delay: 1 }, { el: title, direction: 'left', delay: 1.1 }, { el: question, direction: 'down', delay: 1.1 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'ressentir-lieux-section']" data-block data-component="RessentirLieuxSection">
  <div class="section-inner" data-block-inner>
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
    </div>
</section>
</template>

<style scoped>
.ressentir-lieux-section__image-wrap {
  overflow: visible;
}
</style>
