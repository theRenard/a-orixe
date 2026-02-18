<template>
<section class="camino-section">
  <div class="container">
    <div class="centered">
      <p class="type__hero-synopsis paragraph-spacing" v-html="$t('camino.paragraph')"></p>
      <h2 class="type__section-title type__section-title--with-line heading-spacing">
        {{ $t('camino.title') }}
      </h2>
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('camino.paragraph1')"></p>
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('camino.paragraph2')"></p>
    </div>
  </div>
</section>
</template>
