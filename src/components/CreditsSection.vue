<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="credits" aria-label="Crédits">
    <div class="credits__inner">
      <div class="credits__col credits__col--left">
        <p class="credits__by">
          {{ t('credits.by') }}
        </p>
        <p class="credits__role">
          {{ t('credits.authorRole') }}
        </p>
        <p class="credits__date">
          {{ t('credits.publishedOn') }}
        </p>
      </div>
      <div class="credits__col credits__col--right">
        <p class="credits__line">
          {{ t('credits.artDirection') }}
        </p>
        <p class="credits__line">
          {{ t('credits.illustration') }}
        </p>
        <p class="credits__line">
          {{ t('credits.devDesign') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.credits {
  width: 100%;
  padding: 0 1.5rem 2rem;
}

.credits__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 3rem;
  font-family: var(--font-family-ubuntu);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-black);
}

.credits__col--left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.credits__col--right {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: flex-start;
}

.credits__by {
  font-weight: var(--font-weight-bold);
  margin: 0;
}

.credits__role,
.credits__date,
.credits__line {
  margin: 0;
  font-weight: var(--font-weight-normal);
}

@media (max-width: 640px) {
  .credits__inner {
    grid-template-columns: 1fr;
  }
}
</style>
