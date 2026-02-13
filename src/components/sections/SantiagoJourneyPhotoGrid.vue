<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'

const leftImage = new URL('../../assets/photos/05_florence_antunes.webp', import.meta.url).href
const rightTopImage = new URL('../../assets/photos/06_florence_antunes.webp', import.meta.url).href
const rightBottomImage = new URL('../../assets/photos/07_florence_antunes.webp', import.meta.url).href
</script>

<template>
  <div class="santiago-journey-photo-grid" role="img" :aria-label="$t('santiagoJourney.imageCaption')">
    <div class="santiago-journey-photo-grid__cell santiago-journey-photo-grid__cell--left">
      <ImageCrop width="100%" height="100%" position="center 50%">
        <img
          :src="leftImage"
          :alt="$t('santiagoJourney.imageCaption')"
          loading="lazy"
        >
      </ImageCrop>
    </div>
    <div class="santiago-journey-photo-grid__cell santiago-journey-photo-grid__cell--right-top">
      <ImageCrop width="100%" height="100%" position="center 50%">
        <img
          :src="rightTopImage"
          alt=""
          loading="lazy"
          role="presentation"
        >
      </ImageCrop>
    </div>
    <div class="santiago-journey-photo-grid__cell santiago-journey-photo-grid__cell--right-bottom">
      <ImageCrop width="100%" height="100%" position="center 50%">
        <img
          :src="rightBottomImage"
          alt=""
          loading="lazy"
          role="presentation"
        >
      </ImageCrop>
    </div>
  </div>
</template>

<style scoped>
.santiago-journey-photo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.5rem;
  aspect-ratio: 16 / 10;
  max-width: 100%;
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
