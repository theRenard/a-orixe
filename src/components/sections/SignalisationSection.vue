<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<template>
  <section class="signalisation-section">
    <div class="container">
      <div class="centered">
        <div class="signalisation-section__grid">
          <div class="signalisation-section__cell">
            <ImageCrop width="100%" height="280px" position="center 50%">
              <img
                src="../../assets/photos/04_florence_antunes.webp"
                :alt="$t('signalisation.caption')"
                loading="lazy"
              >
            </ImageCrop>
          </div>
          <div class="signalisation-section__cell">
            <ImageCrop width="100%" height="280px" position="center 50%">
              <img
                src="../../assets/photos/08_florence_antunes.webp"
                :alt="$t('signalisation.caption')"
                loading="lazy"
              >
            </ImageCrop>
          </div>
        </div>
        <p class="signalisation-section__caption type__footnote paragraph-spacing">
          {{ $t('signalisation.caption') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.signalisation-section__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-width: 100%;
}

@media (max-width: 768px) {
  .signalisation-section__grid {
    grid-template-columns: 1fr;
  }
}

.signalisation-section__cell {
  overflow: hidden;
  border-radius: 2px;
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
