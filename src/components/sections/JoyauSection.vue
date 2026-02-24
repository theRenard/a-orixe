<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const paragraph1 = ref<HTMLElement | null>(null)
const quote = ref<HTMLElement | null>(null)
const caption = ref<HTMLElement | null>(null)
const cell1 = ref<HTMLElement | null>(null)
const cell2 = ref<HTMLElement | null>(null)
const cell3 = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: paragraph1, direction: 'left', delay: 0 },
    { el: quote, direction: 'left', delay: 0.06 },
    { el: caption, direction: 'right', delay: 0.12 },
    { el: cell1, direction: 'left', delay: 0.18 },
    { el: cell2, direction: 'left', delay: 0.24 },
    { el: cell3, direction: 'right', delay: 0.3 },
  ],
  offset: 40,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="JoyauSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="joyau-section section--full-viewport">
  <div class="container">
    <div class="centered">
      <p ref="paragraph1" class="type__section-paragraph paragraph-spacing" v-html="$t('joyau.paragraph1')"></p>
      <p ref="quote" class="type__section-paragraph joyau-section__quote paragraph-spacing" v-html="$t('joyau.paragraph2')"></p>
    </div>
    <p ref="caption" class="joyau-section__caption type__image-caption type__image-caption--with-line" v-html="$t('joyau.caption')">
    </p>
    <div class="joyau-section__grid">
      <div ref="cell1" class="joyau-section__cell">
        <ImageCrop width="100%" height="600px" position="center 50%">
          <img src="../../assets/photos/10_florence_antunes.webp" :alt="$t('joyau.caption')" loading="lazy">
        </ImageCrop>
      </div>
      <div ref="cell2" class="joyau-section__cell">
        <ImageCrop width="100%" height="600px" position="center 50%">
          <img src="../../assets/photos/11_florence_antunes.webp" :alt="$t('joyau.caption')" loading="lazy">
        </ImageCrop>
      </div>
      <div ref="cell3" class="joyau-section__cell">
        <ImageCrop width="100%" height="600px" position="center 50%">
          <img src="../../assets/photos/12_florence_antunes.webp" :alt="$t('joyau.caption')" loading="lazy">
        </ImageCrop>
      </div>
    </div>
  </div>
</section>
  </div>
</div>
</template>

<style scoped>
.joyau-section {
  overflow-x: hidden;
}

.joyau-section__quote {
  margin: 0;
}

.joyau-section__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  max-width: 100%;
}

@media (max-width: 768px) {
  .joyau-section__grid {
    grid-template-columns: 1fr;
  }
}

.joyau-section__cell {
  overflow: hidden;
  border-radius: 2px;
}

.joyau-section__cell :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.joyau-section__caption {
  margin: 0;
  text-align: center;
}
</style>
