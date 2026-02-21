<template>
<section class="reconnaissance-section">
  <div class="container">
    <div class="centered--large">
      <div class="row-two-col paragraph-spacing reconnaissance-section__row">
        <div class="col-left">
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('reconnaissance.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconnaissance.paragraph1')"></p>
        </div>
        <div class="col-right">
          <ImageCrop width="100%" height="600px" position="center" :caption="$t('reconnaissance.documentCaption')"
            caption-position="bottom">
            <img class="paragraph-spacing" src="@/assets/photos/lettrereconnaissancechemin.webp"
              :alt="$t('reconnaissance.documentCaption')" loading="lazy">
          </ImageCrop>
        </div>
      </div>
    </div>
    <div class="centered reconnaissance-section__text">
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconnaissance.paragraph2')"></p>
      <p class="type__footnote paragraph-spacing" v-html="$t('reconnaissance.footnote')"></p>
      <p class="type__section-paragraph paragraph-spacing">{{ $t('reconnaissance.insertBetween') }}</p>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<style scoped>
.reconnaissance-section__text :deep(.paragraph-spacing) {
  margin-top: 0.75rem;
}
.reconnaissance-section__row + .centered {
  margin-top: 0.5rem;
}
</style>
