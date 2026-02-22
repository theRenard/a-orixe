<script setup lang="ts">
import espagneImage from '@/assets/illustrations/espagne_ok.webp'
</script>

<template>
<section class="santiago-steps-section">
  <div class="container">
    <div class="centered--large">
      <div class="row-two-col" style="position: relative;">
        <h2 class="type__section-title type__section-title--with-line heading-spacing col-left" style="flex: 0 0 50%;">
          {{ $t('santiagoSteps.title') }}
        </h2>
        <img :src="espagneImage" alt="" class="santiago-steps-section__title-img col-right" aria-hidden="true">
      </div>
    </div>
    <div class="centered">
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoSteps.paragraph1')"></p>
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoSteps.paragraph2')"></p>
      <p class="type__question paragraph-spacing" v-html="$t('santiagoSteps.highlight')"></p>
    </div>
  </div>
</section>
</template>

<style scoped>
.santiago-steps-section__title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3);
}

.santiago-steps-section__title-text {
  flex: 1;
  min-width: 0;
}

.santiago-steps-section__title-img-wrap {
  flex-shrink: 0;
  border: 0.3125rem solid var(--santiago-steps-border-outer, #b25d2e);
  box-shadow: inset 0 0 0 0.125rem var(--santiago-steps-border-inner, #e68e54);
  border-radius: 0.125rem;
  padding: 0;
  line-height: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.santiago-steps-section__title-img {
  display: block;
  height: 23.125rem;
  width: auto;
  object-fit: contain;
  border: 0.1875rem solid var(--color-orange);
  padding: var(--space-3);
  position: absolute;
  right: var(--space-2);
  bottom: 0;
}
</style>
