<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import SlidingGallery from '@/components/tools/SlidingGallery.vue'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation, type UseAnimationTween } from '@/composables/useAnimation'

const { t } = useI18n()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const photoGrid = ref<HTMLElement | null>(null)
const cellLeft = ref<HTMLElement | null>(null)
const cellRightTop = ref<HTMLElement | null>(null)
const cellRightBottom = ref<HTMLElement | null>(null)
const caption = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  const tweens: UseAnimationTween[] = [
    { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
    {
      el: photoGrid,
      from: { y: -80, opacity: 0, scale: 0.5, rotation: 12 },
      to: { y: 0, opacity: 1, scale: 1, rotation: 0, ease: 'power3.out' },
    },
    { el: cellLeft, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.06, ease: 'power3.out' } },
    { el: cellRightTop, from: { x: 80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.12, ease: 'power3.out' } },
    { el: cellRightBottom, from: { x: 80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.18, ease: 'power3.out' } },
    { el: caption, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.24, ease: 'power3.out' } },
  ]
  useAnimation({ trigger: sectionRoot, tweens })
})

const leftImage = new URL('../../assets/photos/05_florence_antunes.webp', import.meta.url).href
const rightTopImage = new URL('../../assets/photos/06_florence_antunes.webp', import.meta.url).href
const rightBottomImage = new URL('../../assets/photos/07_florence_antunes.webp', import.meta.url).href

const imageList = computed(() => [
  { src: leftImage, alt: t('santiagoJourney.imageCaption') },
  { src: rightTopImage, alt: '' },
  { src: rightBottomImage, alt: '' },
])
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: photoGrid, direction: 'down', delay: 0, scale: 0.5, rotation: 12 }, { el: cellLeft, direction: 'left', delay: 0.06 }, { el: cellRightTop, direction: 'right', delay: 0.12 }, { el: cellRightBottom, direction: 'right', delay: 0.18 }, { el: caption, direction: 'left', delay: 0.24 }]
  - offset: 40
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'santiago-journey-photo-grid-section', 'section--full-viewport']"
  data-block data-component="SantiagoJourneyPhotoGrid">
  <div class="section-inner" data-block-inner>
    <div class="container">
      <div class="santiago-journey-photo-grid__wrapper">
        <SlidingGallery v-if="isMobile" :images="imageList" :caption="$t('santiagoJourney.imageCaption')" />
        <template v-else>
          <div ref="photoGrid" class="santiago-journey-photo-grid align-center paragraph-spacing" role="img"
            :aria-label="$t('santiagoJourney.imageCaption')">
            <div ref="cellLeft" class="santiago-journey-photo-grid__cell santiago-journey-photo-grid__cell--left">
              <ImageCrop width="100%" height="100%" position="center 50%">
                <img :src="leftImage" :alt="$t('santiagoJourney.imageCaption')" loading="lazy">
              </ImageCrop>
            </div>
            <div ref="cellRightTop" class="santiago-journey-photo-grid__cell santiago-journey-photo-grid__cell--right-top">
              <ImageCrop width="100%" height="100%" position="center 50%">
                <img :src="rightTopImage" alt="" loading="lazy" role="presentation">
              </ImageCrop>
            </div>
            <div ref="cellRightBottom" class="santiago-journey-photo-grid__cell santiago-journey-photo-grid__cell--right-bottom">
              <ImageCrop width="100%" height="100%" position="center 50%">
                <img :src="rightBottomImage" alt="" loading="lazy" role="presentation">
              </ImageCrop>
            </div>
            <p ref="caption" class="santiago-journey-photo-grid__caption type__image-caption type__image-caption--with-line">
              {{ $t('santiagoJourney.imageCaption') }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.santiago-journey-photo-grid-section {
  overflow-x: hidden;
}

.santiago-journey-photo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  aspect-ratio: 16 / 10;
  max-width: 80%;
  overflow: hidden;
  border-radius: 2px;
}

.santiago-journey-photo-grid__cell {
  overflow: hidden;
  min-height: 0;
}

.santiago-journey-photo-grid__cell--left {
  grid-column: 1;
  grid-row: 1 / -1;
}

.santiago-journey-photo-grid__cell--right-top {
  grid-column: 2;
  grid-row: 1;
}

.santiago-journey-photo-grid__cell--right-bottom {
  grid-column: 2;
  grid-row: 2;
}

.santiago-journey-photo-grid__cell :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
