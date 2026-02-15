<script setup lang="ts">
</script>

<template>
<section class="elements-jacquaire-section">
  <div class="container">
    <img src="../../assets/illustrations/benevoles_ok.webp" :alt="$t('elementsJacquaire.title')"
      class="elements-jacquaire-section__image ma" loading="lazy" width="50%" height="auto">
    <div class="centered">
      <h2 class="type__section-title elements-jacquaire-section__title heading-spacing">
        {{ $t('elementsJacquaire.title') }}
      </h2>
      <p class="type__section-paragraph paragraph-spacing">
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
</style>
