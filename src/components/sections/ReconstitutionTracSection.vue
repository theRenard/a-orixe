<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const imageBlock = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const textBlock = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: imageBlock, direction: 'left', delay: 0 },
    { el: title, direction: 'right', delay: 0.1 },
    { el: textBlock, direction: 'left', delay: 0.2 },
  ],
  duration: 0.6,
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="ReconstitutionTracSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="reconstitution-trac-section">
  <div class="container">
    <div ref="imageBlock">
      <ImageCrop width="100%" height="320px" position="center 50%" :caption="$t('reconstitutionTrac.imageCaption')"
        caption-position="bottom">
        <img src="../../assets/photos/02_miguel_angel_soutullo_alvarez.webp" :alt="$t('reconstitutionTrac.imageCaption')"
          class="reconstitution-trac-section__image" loading="lazy">
      </ImageCrop>
    </div>
    <div class="centered">
      <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
        {{ $t('reconstitutionTrac.title') }}
      </h2>
      <div ref="textBlock">
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph1')"></p>
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph2')"></p>
        <p class="type__question paragraph-spacing" v-html="$t('reconstitutionTrac.question')"></p>
        <p class="type__section-paragraph travail-fourmi-paragraph paragraph-spacing"
          v-html="$t('travailFourmi.paragraph')"></p>
      </div>
    </div>
  </div>
</section>
  </div>
</div>
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
