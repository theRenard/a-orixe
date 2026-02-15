<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<template>
  <section class="concentre-galice-section">
    <div class="container">
      <ImageCrop width="100%" height="320px" position="center 50%">
        <img
          src="../../assets/illustrations/phare.webp"
          :alt="$t('concentreGalice.imageCaption')"
          class="concentre-galice-section__image"
          loading="lazy"
        >
      </ImageCrop>
      <div class="centered">
        <p class="concentre-galice-section__caption type__footnote paragraph-spacing">
          {{ $t('concentreGalice.imageCaption') }}
        </p>
        <h2 class="type__section-title type__section-title--with-line heading-spacing">
          {{ $t('concentreGalice.title') }}
        </h2>
        <p class="type__section-paragraph paragraph-spacing">
          {{ $t('concentreGalice.paragraph1') }}
        </p>
        <p class="type__section-paragraph paragraph-spacing">
          {{ $t('concentreGalice.paragraph2') }}
        </p>
        <p class="type__section-paragraph paragraph-spacing">
          {{ $t('concentreGalice.paragraph3') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.concentre-galice-section__caption {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.concentre-galice-section__caption::before {
  content: '';
  flex-shrink: 0;
  width: 2rem;
  min-width: 2rem;
  height: 2px;
  background: var(--color-orange);
}

.concentre-galice-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
