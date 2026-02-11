<template>
  <section class="container credits-section type__credits" aria-label="Crédits">
    <div class="credits-section__inner">
      <div class="credits-section__col credits-section__col--left">
        <div class="credits-section__line-accent" aria-hidden="true" />
        <p>
          {{ $t('credits.byPrefix') }}<span class="type__credits-bold">{{ $t('credits.byName') }}</span>
        </p>
        <p>{{ $t('credits.authorRole') }}</p>
        <p>
          {{ $t('credits.publishedOnPrefix') }}<span class="type__credits-bold">{{ $t('credits.publishedOnDate') }}</span>
        </p>
      </div>
      <div class="credits-section__col credits-section__col--right">
        <div class="credits-section__line-accent" aria-hidden="true" />
        <p>
          {{ $t('credits.artDirectionPrefix') }}<span class="type__credits-bold">{{ $t('credits.artDirectionName') }}</span>
        </p>
        <p>
          {{ $t('credits.illustrationPrefix') }}<span class="type__credits-bold">{{ $t('credits.illustrationName') }}</span>
        </p>
        <p>
          {{ $t('credits.devDesignPrefix') }}<span class="type__credits-bold">{{ $t('credits.devDesignName') }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.credits-section {
  margin-top: 100px;
  width: 100%;
}

.credits-section__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 3rem;
}

.credits-section__col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.credits-section__col p {
  margin: 0;
}

.credits-section__col--left {
  text-align: left;
}

.credits-section__col--right {
  text-align: right;
}

.credits-section__line-accent {
  width: 8rem;
  height: 4px;
  background: var(--color-orange);
  margin-bottom: 0.5rem;
}

.credits-section__col--right .credits-section__line-accent {
  margin-left: auto;
}
</style>
