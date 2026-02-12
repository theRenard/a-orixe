<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
</script>

<template>
  <section class="reconstitution-trac-section">
    <div class="container">
      <ImageCrop width="100%" height="320px" position="center 50%">
        <img
          src="../../assets/photos/02_miguel_angel_soutullo_alvarez.webp"
          :alt="$t('reconstitutionTrac.imageCaption')"
          class="reconstitution-trac-section__image"
          loading="lazy"
        >
      </ImageCrop>
      <div class="centered">
        <p class="reconstitution-trac-section__caption type__footnote">
          {{ $t('reconstitutionTrac.imageCaption') }}
        </p>
        <h2 class="type__section-title type__section-title--with-line mt-4">
          {{ $t('reconstitutionTrac.title') }}
        </h2>
        <p class="type__section-paragraph mt-3">
          {{ $t('reconstitutionTrac.paragraph1') }}
        </p>
        <p class="type__section-paragraph mt-3">
          {{ $t('reconstitutionTrac.paragraph2') }}
        </p>
        <p class="type__question reconstitution-trac-section__question-block mt-3 mb-5">
          {{ $t('reconstitutionTrac.question') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reconstitution-trac-section__caption {
  margin-top: 1rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.reconstitution-trac-section__caption::before {
  content: '';
  flex-shrink: 0;
  width: 2rem;
  min-width: 2rem;
  height: 2px;
  background: var(--color-orange);
}

.reconstitution-trac-section__question-block {
  border-left: 3px solid var(--color-teal-dark);
  padding-left: 1rem;
}

.reconstitution-trac-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
