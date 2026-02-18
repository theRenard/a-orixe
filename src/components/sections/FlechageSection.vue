<template>
  <section class="flechage-section">
    <div class="container">
      <div class="centered">
        <h2 class="type__section-title type__section-title--with-line heading-spacing">
          {{ $t('flechage.title') }}
        </h2>
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('flechage.paragraph1')"></p>
        <p class="type__question paragraph-spacing" v-html="$t('flechage.highlight')"></p>
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('flechage.paragraph2')"></p>
      </div>
    </div>
  </section>
</template>

