<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const cell1 = ref<HTMLElement | null>(null)
const cell2 = ref<HTMLElement | null>(null)
const caption = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: cell1, direction: 'left', delay: 0 },
    { el: cell2, direction: 'right', delay: 0.08 },
    { el: caption, direction: 'left', delay: 0.16 },
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
<div data-block data-component="SignalisationSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="signalisation-section mt-3 mb-3">
  <div class="container">
    <div class="signalisation-section__grid">
      <div ref="cell1" class="signalisation-section__cell">
        <ImageCrop width="100%" height="600px" position="center 50%">
          <img src="../../assets/photos/08_florence_antunes.webp" :alt="$t('signalisation.caption')" loading="lazy">
        </ImageCrop>
      </div>
      <div ref="cell2" class="signalisation-section__cell">
        <ImageCrop width="100%" height="600px" position="center 50%">
          <img src="../../assets/photos/09_florence_antunes.webp" :alt="$t('signalisation.caption')" loading="lazy">
        </ImageCrop>
      </div>
    </div>
    <p ref="caption" class="signalisation-section__caption type__image-caption type__image-caption--with-line">
      {{ $t('signalisation.caption') }}
    </p>
  </div>
</section>
  </div>
</div>
</template>

<style scoped>
.signalisation-section {
  overflow-x: hidden;
}

.signalisation-section__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-width: 100%;
}

.signalisation-section__cell {
  overflow: hidden;
}

.signalisation-section__cell :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.signalisation-section__caption {
  margin: 0;
  text-align: center;
}
</style>
