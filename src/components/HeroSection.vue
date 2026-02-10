<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__text">
      <h1 id="hero-title" class="hero__title">
        {{ t('hero.title') }}
      </h1>
      <p class="hero__subtitle">
        {{ t('hero.subtitle') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
}

.hero__text {
  text-align: center;
  width: 1030px;
  margin: 0 auto;
}

.hero__title {
  font-family: var(--font-family-fraunces);
  font-weight: var(--font-weight-bold);
  font-size: clamp(2.5rem, 8vw, 6.625rem); /* 106px at 1920 */
  line-height: 1.1;
  color: var(--color-brown-dark);
  text-align: left;
}

.hero__subtitle {
  font-family: var(--font-family-fraunces);
  font-weight: var(--font-weight-bold);
  font-size: clamp(1.5rem, 4vw, 3.9375rem); /* 63px at 1920 */
  line-height: 1.2;
  color: var(--color-orange);
  margin: 0;
  text-align: left;
}

</style>
