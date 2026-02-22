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
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.paragraph')"></p>
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.transition')"></p>
      <p class="type__question paragraph-spacing" v-html="$t('ressentirLieux.question')"></p>
    </div>
    <ImageCrop width="100%" height="18.75rem" position="0 75%" :caption="$t('ressentirLieux.imageCaption')"
      caption-position="top">
      <img src="../../assets/photos/01_florence_antunes.webp" :alt="$t('ressentirLieux.imageCaption')"
        class="ressentir-lieux-section__image" loading="lazy">
    </ImageCrop>
  </div>
</section>
</template>
