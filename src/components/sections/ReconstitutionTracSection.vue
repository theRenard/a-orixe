<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<template>
<section class="reconstitution-trac-section">
  <div class="container">
    <ImageCrop width="100%" height="20rem" position="center 50%" :caption="$t('reconstitutionTrac.imageCaption')"
      caption-position="bottom">
      <img src="../../assets/photos/02_miguel_angel_soutullo_alvarez.webp" :alt="$t('reconstitutionTrac.imageCaption')"
        class="reconstitution-trac-section__image" loading="lazy">
    </ImageCrop>
    <div class="centered">
      <h2 class="type__section-title type__section-title--with-line heading-spacing">
        {{ $t('reconstitutionTrac.title') }}
      </h2>
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph1')"></p>
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph2')"></p>
      <p class="type__question paragraph-spacing" v-html="$t('reconstitutionTrac.question')"></p>
      <p class="type__section-paragraph travail-fourmi-paragraph paragraph-spacing"
        v-html="$t('travailFourmi.paragraph')"></p>
    </div>
  </div>
</section>
</template>

<style scoped>
.reconstitution-trac-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
