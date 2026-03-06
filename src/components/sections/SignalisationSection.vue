<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import SlidingGallery from '@/components/tools/SlidingGallery.vue'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()
const { t } = useI18n()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
    ],
  })
})

const image1 = new URL('../../assets/photos/08_florence_antunes.webp', import.meta.url).href
const image2 = new URL('../../assets/photos/09_florence_antunes.webp', import.meta.url).href
const imageList = computed(() => [
  { src: image1, alt: t('signalisation.caption') },
  { src: image2, alt: t('signalisation.caption') },
])
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: cell1, direction: 'left', delay: 0, rotation: -12, transformOrigin: 'left bottom' }, { el: cell2, direction: 'right', delay: 0.08, rotation: 12, transformOrigin: 'right bottom' }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'signalisation-section', 'section--full-viewport']" data-block data-component="SignalisationSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <SlidingGallery v-if="isMobile" :images="imageList" :caption="$t('signalisation.caption')" />
        <template v-else>
          <div class="signalisation-section__grid">
            <div class="signalisation-section__cell">
              <ImageCrop width="100%" height="40vw" position="center 50%">
                <img :src="image1" :alt="$t('signalisation.caption')" loading="lazy">
              </ImageCrop>
            </div>
            <div class="signalisation-section__cell">
              <ImageCrop width="100%" height="40vw" position="center 50%">
                <img :src="image2" :alt="$t('signalisation.caption')" loading="lazy">
              </ImageCrop>
            </div>
          </div>
          <p class="signalisation-section__caption type__image-caption type__image-caption--with-line">
            {{ $t('signalisation.caption') }}
          </p>
        </template>
      </div>
    </div>
</section>
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
