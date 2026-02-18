<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<template>
<section class="parcours-praticable-section">
  <div class="container">
    <div class="centered">
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('parcoursPraticable.paragraph1')"></p>
    </div>
    <div class="centered--large">
      <div class="row-two-col">
        <div class="col-left">
          <p class="type__question" v-html="$t('parcoursPraticable.paragraph2')"></p>
        </div>
        <div class="col-right">
          <ImageCrop width="100%" height="600px" position="center 40%">
            <img src="../../assets/photos/03_florence_antunes.webp" :alt="$t('parcoursPraticable.imageCaption')"
              loading="lazy">
          </ImageCrop>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
