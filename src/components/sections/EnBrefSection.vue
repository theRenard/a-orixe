<template>
  <section class="en-bref-section">
    <div class="en-bref-section__inner container">
      <h2 class="en-bref-section__title heading-spacing">
        <span class="en-bref-section__title-underline">{{ $t('enBref.titlePrefix') }}</span>{{ $t('enBref.titleSuffix') }}
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
          <img
            src="@/assets/illustrations/phare.webp"
            alt=""
            class="en-bref-section__icon"
            width="48"
            height="48"
          >
          <div>
            <div class="type__enbref-small-orange--left">{{ $t('enBref.departureLabel') }}</div>
            <div class="type__enbref-small-green">{{ $t('enBref.departurePlace') }}</div>
          </div>
        </div>
        <div class="en-bref-section__place">
          <svg
            class="en-bref-section__icon en-bref-section__icon--svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M24 8v32M24 8l-8 6v4h4v6h4v-6h-4v-4l8-6M24 8l8 6v4h-4v6h-4v-6h4v-4l-8-6" />
            <path d="M12 40V24l12-10 12 10v16" />
            <path d="M18 40h12" />
            <path d="M24 14v10" />
          </svg>
          <div>
            <div class="type__enbref-small-orange--left">{{ $t('enBref.arrivalLabel') }}</div>
            <div class="type__enbref-small-green">{{ $t('enBref.arrivalPlace') }}</div>
          </div>
        </div>
      </div>

      <p class="en-bref-section__link-wrap paragraph-spacing">
        {{ $t('enBref.detailLinkText') }}
        <a href="#etapes-cles" class="en-bref-section__link">{{ $t('enBref.detailLinkHere') }}</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.en-bref-section {
  min-height: auto;
  background-color: var(--color-teal-enbref-bg);
  padding: 4rem 0 5rem;
}

.en-bref-section__inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.en-bref-section__title {
  font: normal var(--font-weight-bold) 38px/1.2 var(--font-family-fraunces);
  color: var(--color-orange);
  text-align: center;
}

.en-bref-section__title-underline {
  display: inline-block;
  border-bottom: 2px solid var(--color-orange);
  padding-bottom: 2px;
  margin-bottom: 2px;
}

.en-bref-section__stats-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 3rem 4rem;
  margin-bottom: 2.5rem;
}

.en-bref-section__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
}

.en-bref-section__place {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
}

.en-bref-section__icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.en-bref-section__icon--svg {
  color: var(--color-orange);
}

.en-bref-section__icon--svg :deep(svg) {
  width: 48px;
  height: 48px;
}

.en-bref-section__link-wrap {
  font: normal var(--font-weight-normal) 20px/40px var(--font-family-ubuntu);
  color: var(--color-teal-dark);
  text-align: center;
  margin: 0;
}

.en-bref-section__link {
  color: var(--color-orange);
  text-decoration: underline;
}
</style>
