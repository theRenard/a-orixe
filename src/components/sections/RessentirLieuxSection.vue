<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<template>
<section class="ressentir-lieux-section">
  <div class="container">
    <div class="centered">
      <h2 class="type__section-title type__section-title--with-line mt-5">
        {{ $t('ressentirLieux.title') }}
      </h2>
      <p class="type__section-paragraph mt-3">
        {{ $t('ressentirLieux.paragraph') }}
      </p>
      <p class="type__section-paragraph mt-3">
        {{ $t('ressentirLieux.transition') }}
      </p>
      <p class="type__question ressentir-lieux-section__question-block mt-3 mb-5">
        {{ $t('ressentirLieux.question') }}
      </p>
      <p class="ressentir-lieux-section__caption type__footnote">
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
.ressentir-lieux-section__question-block {
  border-left: 3px solid var(--color-teal-dark);
  padding-left: 1rem;
}

.ressentir-lieux-section__caption {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-gray);
}

.ressentir-lieux-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
