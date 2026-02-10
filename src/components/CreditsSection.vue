<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="credits" aria-label="Crédits">
    <div class="credits__inner">
      <div class="credits__col credits__col--left">
        <div class="credits__line-accent" aria-hidden="true" />
        <p class="credits__by">
          {{ t('credits.byPrefix') }}<span class="credits__name">{{ t('credits.byName') }}</span>
        </p>
        <p class="credits__role">
          {{ t('credits.authorRole') }}
        </p>
        <p class="credits__date">
          {{ t('credits.publishedOnPrefix') }}<span class="credits__name">{{ t('credits.publishedOnDate') }}</span>
        </p>
      </div>
      <div class="credits__col credits__col--right">
        <div class="credits__line-accent" aria-hidden="true" />
        <p class="credits__line">
          {{ t('credits.artDirectionPrefix') }}<span class="credits__name">{{ t('credits.artDirectionName') }}</span>
        </p>
        <p class="credits__line">
          {{ t('credits.illustrationPrefix') }}<span class="credits__name">{{ t('credits.illustrationName') }}</span>
        </p>
        <p class="credits__line">
          {{ t('credits.devDesignPrefix') }}<span class="credits__name">{{ t('credits.devDesignName') }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.credits {
  margin-top: 100px;
  width: 100%;
}

.credits__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 3rem;
}

.credits__col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-family: var(--font-family-ubuntu);
  font-style: var(--font-style-normal);
  font-weight: var(--font-weight-normal);
  font-size: 16px;
  line-height: 18px;
  letter-spacing: var(--letter-spacing-normal);
  color: var(--color-orange);
}

.credits__col--left {
  text-align: left;
}

.credits__col--right {
  text-align: right;
}

.credits__line-accent {
  width: 8rem;
  height: 4px;
  background: var(--color-orange);
  margin-bottom: 0.5rem;
}

.credits__col--right .credits__line-accent {
  margin-left: auto;
}

.credits__by,
.credits__role,
.credits__date,
.credits__line {
  margin: 0;
}

.credits__name {
  font-weight: var(--font-weight-bold);
  text-decoration: underline;
}

@media (max-width: 640px) {
  .credits__inner {
    grid-template-columns: 1fr;
  }

  .credits__col--right {
    text-align: left;
  }

  .credits__col--right .credits__line-accent {
    margin-left: 0;
  }
}
</style>
