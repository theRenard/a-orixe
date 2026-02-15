<script setup lang="ts">
</script>

<template>
<section class="elements-jacquaire-section">
  <div class="container">
    <img src="../../assets/illustrations/benevoles_ok.webp" :alt="$t('elementsJacquaire.title')"
      class="elements-jacquaire-section__image ma" loading="lazy" width="50%" height="auto">
    <div class="centered">
      <h2 class="type__section-title elements-jacquaire-section__title mt-4">
        {{ $t('elementsJacquaire.title') }}
      </h2>
      <p class="type__section-paragraph mt-3 mb-5">
        {{ $t('elementsJacquaire.paragraph') }}
      </p>
    </div>
  </div>
</section>
</template>

<style scoped>
.elements-jacquaire-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}

.elements-jacquaire-section__title {
  margin-bottom: 0;
}
</style>
