<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<template>
<section class="ressentir-lieux-section">
  <div class="container">
    <div class="centered">
      <h2 class="type__section-title type__section-title--with-line heading-spacing">
        {{ $t('ressentirLieux.title') }}
      </h2>
      <p class="type__section-paragraph paragraph-spacing">
        {{ $t('ressentirLieux.paragraph') }}
      </p>
      <p class="type__section-paragraph paragraph-spacing">
        {{ $t('ressentirLieux.transition') }}
      </p>
      <p class="type__question paragraph-spacing">
        {{ $t('ressentirLieux.question') }}
      </p>
      <p class="ressentir-lieux-section__caption type__footnote paragraph-spacing">
        {{ $t('ressentirLieux.imageCaption') }}
      </p>
    </div>
    <ImageCrop width="100%" height="300px" position="0 75%">
      <img src="../../assets/photos/01_florence_antunes.webp" :alt="$t('ressentirLieux.imageCaption')"
        class="ressentir-lieux-section__image" loading="lazy">
    </ImageCrop>
  </div>
</section>
</template>

<style scoped>
.ressentir-lieux-section__caption {
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-gray);
}

.ressentir-lieux-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
