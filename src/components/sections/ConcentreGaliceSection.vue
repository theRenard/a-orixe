<template>
<section class="concentre-galice-section">
  <div class="container">
    <div class="centered--large">
      <div class="row-two-col paragraph-spacing">
        <div class="col-left">
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('concentreGalice.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('concentreGalice.paragraph1')"></p>
          <p class="type__question paragraph-spacing" v-html="$t('concentreGalice.paragraph2')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('concentreGalice.paragraph3')"></p>
        </div>
        <div class="col-right">
          <ImageCrop width="100%" height="43.75rem" position="center 40%" :caption="$t('concentreGalice.imageCaption')"
            caption-position="bottom">
            <img class="paragraph-spacing" src="@/assets/photos/04_florence_antunes.webp"
              :alt="$t('concentreGalice.imageCaption')" loading="lazy">
          </ImageCrop>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<style scoped>
.concentre-galice-section .centered--large+.centered :deep(.paragraph-spacing) {
  margin-top: var(--space-2) !important;
}
</style>
