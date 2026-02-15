<template>
<section class="etapes-cles-section">
  <div class="container">
    <div class="centered">
      <h2 class="type__section-title type__section-title--with-line mt-5">
        {{ $t('etapesCles.title') }}
      </h2>
      <p class="type__section-paragraph mt-3 mb-2">
        {{ $t('etapesCles.paragraph') }}
      </p>
    </div>
    <img class="ma mb-2" src="../../assets/illustrations/saint_jacques_ok.webp" :alt="$t('etapesCles.title')"
      loading="lazy" style="width: 60vw;">
  </div>
</section>
</template>
