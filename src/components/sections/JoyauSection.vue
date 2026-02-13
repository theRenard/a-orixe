<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<template>
  <section class="joyau-section">
    <div class="container">
      <div class="centered">
        <p class="type__section-paragraph joyau-section__quote mt-5">
          {{ $t('joyau.paragraph') }}
        </p>
        <div class="joyau-section__grid mt-4">
          <div class="joyau-section__cell">
            <ImageCrop width="100%" height="240px" position="center 50%">
              <img
                src="../../assets/photos/09_florence_antunes.webp"
                :alt="$t('joyau.caption')"
                loading="lazy"
              >
            </ImageCrop>
          </div>
          <div class="joyau-section__cell">
            <ImageCrop width="100%" height="240px" position="center 50%">
              <img
                src="../../assets/photos/10_florence_antunes.webp"
                :alt="$t('joyau.caption')"
                loading="lazy"
              >
            </ImageCrop>
          </div>
          <div class="joyau-section__cell">
            <ImageCrop width="100%" height="240px" position="center 50%">
              <img
                src="../../assets/photos/11_florence_antunes.webp"
                :alt="$t('joyau.caption')"
                loading="lazy"
              >
            </ImageCrop>
          </div>
        </div>
        <p class="joyau-section__caption type__footnote mt-3 mb-5">
          {{ $t('joyau.caption') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.joyau-section__quote {
  font-style: italic;
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
