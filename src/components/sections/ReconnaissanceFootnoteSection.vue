<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import ImageCrop from '@/components/tools/ImageCrop.vue'

const sectionRoot = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: image, direction: 'right', delay: 0, rotation: 12 },
    { el: content, direction: 'left', delay: 0.1 },
  ],
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
<div data-block data-component="ReconnaissanceFootnoteSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="reconnaissance-footnote-section section--full-viewport">
      <div class="container">
        <div ref="content" class="centered">
          <p class="type__section-paragraph paragraph-spacing">{{ $t('reconnaissance.insertBetween') }}</p>
        </div>
        <div ref="image" class="centered paragraph-spacing mr-3">
          <ImageCrop width="35rem" height="auto" position="center 50%" :caption="$t('reconnaissance.documentCaption')"
            caption-position="bottom">
            <img src="@/assets/photos/lettrereconnaissancechemin.webp"
              :alt="$t('reconnaissance.documentCaption')" loading="lazy">
          </ImageCrop>
          </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>

.image-crop-container {
  width: 35rem;
  height: auto;
  margin: 0 auto;
}

.reconnaissance-footnote-section {
  overflow-x: hidden;
}

.reconnaissance-footnote-section .paragraph-spacing {
  margin-top: 0.75rem;
}

.reconnaissance-footnote-section img {
  width: 35rem;
  height: auto;
  margin: 0 auto;
}
</style>
