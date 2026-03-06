<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value || !question.value) return
  useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.1, ease: 'power3.out' } },
      { el: question, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
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
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'ressentir-lieux-section']" data-block data-component="RessentirLieuxSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="ressentir-lieux-section__image-wrap">
          <ImageCrop width="100%" height="300px" position="0 75%" :caption="$t('ressentirLieux.imageCaption')"
            caption-position="bottom">
            <img src="../../assets/photos/01_florence_antunes.webp" :alt="$t('ressentirLieux.imageCaption')"
              class="ressentir-lieux-section__image" loading="lazy">
          </ImageCrop>
        </div>
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('ressentirLieux.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.paragraph')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.transition')"></p>
            <p ref="question" class="type__question paragraph-spacing" v-html="$t('ressentirLieux.question')"></p>
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
