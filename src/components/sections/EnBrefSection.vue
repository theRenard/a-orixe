<script setup lang="ts">
import phareCorrubedo from '@/assets/illustrations/phare.png'
import cathedrale from '@/assets/illustrations/cathedrale.png'
</script>

<template>
<section class="en-bref-section section--full-viewport">
  <div class="en-bref-section__inner container">
    <h2 class="type__section-title type__section-title--with-line heading-spacing">
      <span class="">{{ $t('enBref.titlePrefix') }}</span>{{ $t('enBref.titleSuffix') }}
    </h2>

    <div class="en-bref-section__stats-row">
      <div class="en-bref-section__stat">
        <div class="type__enbref-big">{{ $t('enBref.stat1Number') }}</div>
        <div class="type__enbref-small-orange">{{ $t('enBref.stat1Label') }}</div>
      </div>
      <div class="en-bref-section__stat">
        <div class="type__enbref-big">{{ $t('enBref.stat2Number') }}</div>
        <div class="type__enbref-small-orange">{{ $t('enBref.stat2Label') }}</div>
      </div>
      <div class="en-bref-section__place">
        <img :src="phareCorrubedo" :alt="$t('enBref.departurePlace')" class="en-bref-section__icon">
        <div>
          <div class="type__enbref-small-orange--left">{{ $t('enBref.departureLabel') }}</div>
          <div class="type__enbref-small-green">{{ $t('enBref.departurePlace') }}</div>
        </div>
      </div>
      <div class="en-bref-section__place">
        <img :src="cathedrale" :alt="$t('enBref.arrivalPlace')" class="en-bref-section__icon">
        <div>
          <div class="type__enbref-small-orange--left">{{ $t('enBref.arrivalLabel') }}</div>
          <div class="type__enbref-small-green">{{ $t('enBref.arrivalPlace') }}</div>
        </div>
      </div>
    </div>

    <p class="en-bref-section__link-wrap paragraph-spacing">
      <span class="type__enbref-small-green">{{ $t('enBref.detailLinkText') }}</span>
      <a href="#etapes-cles" class="type__enbref-small-green en-bref-section__link">{{ $t('enBref.detailLinkHere')
        }}</a>
    </p>
  </div>
</section>
</template>

<style scoped>
.en-bref-section {
  background-color: var(--color-teal-enbref-bg);
}

.en-bref-section__inner {
  max-width: 1000px;
  margin: 0 auto;
}

.en-bref-section__title {
  font: normal var(--font-weight-bold) calc(38px * var(--font-scale)) / 1.2 var(--font-family-fraunces);
  color: var(--color-orange);
  text-align: left;
}

.en-bref-section__title-underline {
  display: inline-block;
  border-bottom: 2px solid var(--color-orange);
  padding-bottom: 2px;
  margin-bottom: 2px;
}

.en-bref-section__stats-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: 2.5rem;
}

.en-bref-section__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.en-bref-section__place {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  /* gap: 1rem; */
}

.en-bref-section__icon {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 1rem;
}

.en-bref-section__icon--svg {
  color: var(--color-orange);
}

.en-bref-section__icon--svg :deep(svg) {
  width: 48px;
  height: 48px;
}

.en-bref-section__link-wrap {
  font: normal var(--font-weight-normal) calc(20px * var(--font-scale)) / calc(40px * var(--font-scale)) var(--font-family-ubuntu);
  color: var(--color-teal-dark);
  text-align: center;
  margin: 0;
}

.en-bref-section__link {
  color: var(--color-orange);
  text-decoration: underline;
}
</style>
