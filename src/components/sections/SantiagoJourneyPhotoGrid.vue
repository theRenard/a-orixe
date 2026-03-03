<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import SlidingGallery from '@/components/tools/SlidingGallery.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { t } = useI18n()
const { isMobile } = useMobileDetection()

const leftImage = new URL('../../assets/photos/05_florence_antunes.webp', import.meta.url).href
const rightTopImage = new URL('../../assets/photos/06_florence_antunes.webp', import.meta.url).href
const rightBottomImage = new URL('../../assets/photos/07_florence_antunes.webp', import.meta.url).href

const imageList = computed(() => [
  { src: leftImage, alt: t('santiagoJourney.imageCaption') },
  { src: rightTopImage, alt: '' },
  { src: rightBottomImage, alt: '' },
])

const sectionRoot = ref<HTMLElement | null>(null)
const photoGrid = ref<HTMLElement | null>(null)
const cellLeft = ref<HTMLElement | null>(null)
const cellRightTop = ref<HTMLElement | null>(null)
const cellRightBottom = ref<HTMLElement | null>(null)
const caption = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: photoGrid, direction: 'down', delay: 0, scale: 0.5, rotation: 12 },
    { el: cellLeft, direction: 'left', delay: 0.06 },
    { el: cellRightTop, direction: 'right', delay: 0.12 },
    { el: cellRightBottom, direction: 'right', delay: 0.18 },
    { el: caption, direction: 'left', delay: 0.24 },
  ],
  offset: 40,
  ease: 'power3.out',
  runOnMount: false,
})
let myBlockIndex = -1
onMounted(() => {
  myBlockIndex = getBlockIndexFromElement(sectionRoot.value)
  registerBlockEnter?.(myBlockIndex, () => run())
})
onUnmounted(() => {
  unregisterBlockEnter?.(myBlockIndex)
})
</script>

<template>
<div data-block data-component="SantiagoJourneyPhotoGrid" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="santiago-journey-photo-grid-section section--full-viewport">
      <div class="container">
        <div ref="photoGrid" class="santiago-journey-photo-grid__wrapper">
          <SlidingGallery
            v-if="isMobile"
            :images="imageList"
            :caption="$t('santiagoJourney.imageCaption')"
          />
          <template v-else>
            <div class="santiago-journey-photo-grid align-center paragraph-spacing" role="img"
              :aria-label="$t('santiagoJourney.imageCaption')">
              <div ref="cellLeft" class="santiago-journey-photo-grid__cell santiago-journey-photo-grid__cell--left">
                <ImageCrop width="100%" height="100%" position="center 50%">
                  <img :src="leftImage" :alt="$t('santiagoJourney.imageCaption')" loading="lazy">
                </ImageCrop>
              </div>
              <div ref="cellRightTop"
                class="santiago-journey-photo-grid__cell santiago-journey-photo-grid__cell--right-top">
                <ImageCrop width="100%" height="100%" position="center 50%">
                  <img :src="rightTopImage" alt="" loading="lazy" role="presentation">
                </ImageCrop>
              </div>
              <div ref="cellRightBottom"
                class="santiago-journey-photo-grid__cell santiago-journey-photo-grid__cell--right-bottom">
                <ImageCrop width="100%" height="100%" position="center 50%">
                  <img :src="rightBottomImage" alt="" loading="lazy" role="presentation">
                </ImageCrop>
              </div>
            </div>
            <p ref="caption"
              class="santiago-journey-photo-grid__caption type__image-caption type__image-caption--with-line">
              {{ $t('santiagoJourney.imageCaption') }}
            </p>
          </template>
        </div>
      </div>
    </section>
  </div>
</div>
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
