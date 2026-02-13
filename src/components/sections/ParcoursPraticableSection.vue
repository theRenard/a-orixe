<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<template>
<section class="parcours-praticable-section">
  <div class="container">
    <div class="centered">
      <p class="type__section-paragraph mt-5">
        {{ $t('parcoursPraticable.paragraph1') }}
      </p>
      <div class="parcours-praticable-section__row">
        <div class="parcours-praticable-section__col parcours-praticable-section__col--text">
          <p class="type__question">
            {{ $t('parcoursPraticable.paragraph2') }}
          </p>
        </div>
        <div class="parcours-praticable-section__col parcours-praticable-section__col--image">
          <ImageCrop width="100%" height="320px" position="center 40%">
            <img src="../../assets/photos/03_florence_antunes.webp" :alt="$t('parcoursPraticable.imageCaption')"
              class="parcours-praticable-section__image" loading="lazy">
          </ImageCrop>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.parcours-praticable-section__row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.parcours-praticable-section__col {
  min-width: 0;
}

.parcours-praticable-section__col--text {
  flex: 1 1 45%;
}

.parcours-praticable-section__col--image {
  flex: 1 1 45%;
}

@media (max-width: 768px) {

  .parcours-praticable-section__col--text,
  .parcours-praticable-section__col--image {
    flex: 1 1 100%;
  }
}

.parcours-praticable-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
