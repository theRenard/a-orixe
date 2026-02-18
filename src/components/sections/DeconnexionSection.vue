<template>
  <section class="deconnexion-section">
    <div class="container">
      <div class="centered">
        <h2 class="type__section-title type__section-title--with-line heading-spacing">
          {{ $t('deconnexion.title') }}
        </h2>
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('deconnexion.paragraph1')"></p>
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('deconnexion.paragraph2')"></p>
        <p class="type__question paragraph-spacing" v-html="$t('deconnexion.highlight')"></p>
      </div>
    </div>
  </section>
</template>
