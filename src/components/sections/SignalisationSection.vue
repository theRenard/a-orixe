<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<template>
<section class="signalisation-section mt-3 mb-3">
  <div class="container">
    <div class="signalisation-section__grid">
      <div class="signalisation-section__cell">
        <ImageCrop width="100%" height="37.5rem" position="center 50%">
          <img src="../../assets/photos/08_florence_antunes.webp" :alt="$t('signalisation.caption')" loading="lazy">
        </ImageCrop>
      </div>
      <div class="signalisation-section__cell">
        <ImageCrop width="100%" height="37.5rem" position="center 50%">
          <img src="../../assets/photos/09_florence_antunes.webp" :alt="$t('signalisation.caption')" loading="lazy">
        </ImageCrop>
      </div>
    </div>
    <p class="signalisation-section__caption type__image-caption type__image-caption--with-line">
      {{ $t('signalisation.caption') }}
    </p>
  </div>
</section>
</template>

<style scoped>
.signalisation-section__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
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
