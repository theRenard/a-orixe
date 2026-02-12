<template>
  <section class="etapes-cles-section">
    <div class="container">
      <div class="centered">
        <h2 class="type__section-title type__section-title--with-line mt-5">
          {{ $t('etapesCles.title') }}
        </h2>
        <p class="type__section-paragraph mt-3 mb-5">
          {{ $t('etapesCles.paragraph') }}
        </p>
      </div>
      <img
      src="../../assets/illustrations/saint_jacques_ok.webp"
      :alt="$t('etapesCles.title')"
      class="etapes-cles-section__image"
      loading="lazy"
      >
    </div>
  </section>
</template>

<style scoped>
.etapes-cles-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
