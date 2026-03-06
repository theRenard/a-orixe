<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const imageBlock = ref<HTMLElement | null>(null)
const image = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value || !imageBlock.value || !image.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
      { el: imageBlock, from: { scale: 4, opacity: 0, transformOrigin: 'bottom center' }, to: { scale: 1, opacity: 1, duration: 4, ease: 'power3.out', transformOrigin: 'bottom center' } },
      { el: image, from: { y: -80, opacity: 0, scale: 3, transformOrigin: 'top center' }, to: { y: 0, opacity: 1, scale: 1, ease: 'power3.out', transformOrigin: 'top center' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot"
  :class="['section', 'reconstitution-trac-section', { 'mt-8': isMobile }]" data-block
  data-component="ReconstitutionTracSection">
  <div class="section-inner" data-block-inner>
    <div class="container">
      <div ref="imageBlock">
        <ImageCrop width="100%" height="320px" position="center 50%" :caption="$t('reconstitutionTrac.imageCaption')"
          caption-position="bottom">
          <img ref="image" src="../../assets/photos/02_miguel_angel_soutullo_alvarez.webp"
            :alt="$t('reconstitutionTrac.imageCaption')" class="reconstitution-trac-section__image" loading="lazy">
        </ImageCrop>
      </div>
      <div class="centered">
        <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
          {{ $t('reconstitutionTrac.title') }}
        </h2>
        <div>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph1')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph2')"></p>
          <p class="type__question paragraph-spacing" v-html="$t('reconstitutionTrac.question')"></p>
          <p class="type__section-paragraph travail-fourmi-paragraph paragraph-spacing"
            v-html="$t('travailFourmi.paragraph')"></p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.reconstitution-trac-section {
  overflow-x: hidden;
}

.reconstitution-trac-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
