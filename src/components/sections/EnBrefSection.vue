<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import phareCorrubedo from '@/assets/illustrations/phare.png'
import cathedrale from '@/assets/illustrations/cathedrale.png'

const { locale } = useI18n()
const routeDetailUrl = computed(() => `https://aorixe.es/${locale.value === 'es' ? 'es' : 'fr'}`)
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
      <a :href="routeDetailUrl" target="_blank" rel="noopener noreferrer" class="type__enbref-small-green en-bref-section__link">{{ $t('enBref.detailLinkHere') }}</a>
    </p>
  </div>
</section>
</template>

<style scoped>
.en-bref-section {
  background-color: var(--color-teal-enbref-bg);
}

.en-bref-section__inner {
  max-width: 62.5rem;
  margin: 0 auto;
}

.en-bref-section__title {
  font: normal var(--font-weight-bold) var(--text-xxl) / 1.2 var(--font-family-fraunces);
  color: var(--color-orange);
  text-align: left;
}

.en-bref-section__title-underline {
  display: inline-block;
  border-bottom: 0.125rem solid var(--color-orange);
  padding-bottom: 0.125rem;
  margin-bottom: 0.125rem;
}

.en-bref-section__stats-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
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
}

.en-bref-section__icon {
  flex-shrink: 0;
  width: calc(var(--fluid-base) * 6);
  height: calc(var(--fluid-base) * 6);
  object-fit: contain;
  margin-right: var(--space-2);
}

.en-bref-section__icon--svg {
  color: var(--color-orange);
}

.en-bref-section__icon--svg :deep(svg) {
  width: calc(var(--fluid-base) * 3);
  height: calc(var(--fluid-base) * 3);
}

.en-bref-section__link-wrap {
  font: normal var(--font-weight-normal) var(--text-md) / 1.4 var(--font-family-ubuntu);
  color: var(--color-teal-dark);
  text-align: center;
  margin: 0;
}

.en-bref-section__link {
  color: var(--color-orange);
  text-decoration: underline;
}
</style>
