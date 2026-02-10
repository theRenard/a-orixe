<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__illustration">
      <img
        src="../assets/illustrations/illu_principale_ok.webp"
        alt=""
        width="1920"
        height="1080"
        fetchpriority="high"
      >
    </div>
    <div class="hero__text">
      <h1 id="hero-title" class="hero__title">
        {{ t('hero.title') }}
      </h1>
      <p class="hero__subtitle">
        {{ t('hero.subtitle') }}
      </p>
      <div class="hero__lines" aria-hidden="true" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
}

.hero__illustration {
  width: 100%;
  line-height: 0;
}

.hero__illustration img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.hero__text {
  text-align: center;
  padding: 1.5rem 1.5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero__title {
  font-family: var(--font-family-fraunces);
  font-weight: var(--font-weight-bold);
  font-size: clamp(2.5rem, 8vw, 6.625rem); /* 106px at 1920 */
  line-height: 1.1;
  color: var(--color-brown-dark);
  margin: 0 0 0.25em;
}

.hero__subtitle {
  font-family: var(--font-family-fraunces);
  font-weight: var(--font-weight-bold);
  font-size: clamp(1.5rem, 4vw, 3.9375rem); /* 63px at 1920 */
  line-height: 1.2;
  color: var(--color-orange);
  margin: 0;
}

.hero__lines {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.hero__lines::before,
.hero__lines::after {
  content: '';
  width: 2rem;
  height: 4px;
  background: var(--color-orange);
}
</style>
