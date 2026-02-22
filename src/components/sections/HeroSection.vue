<template>
<section class="mt-4 type__credits" aria-label="Crédits">
  <div class="container">
    <h1 class="type__hero-title">
      {{ $t('hero.title') }}
    </h1>
    <p class="type__hero-subtitle mt-0 " v-html="$t('hero.subtitle')"></p>
    <div class="container credits__inner paragraph-spacing">
      <div class="credits__col credits__col--left">
        <div class="credits__line-accent" aria-hidden="true" />
        <p>
          {{ $t('credits.byPrefix') }}<span class="type__credits-bold">{{ $t('credits.byName') }}</span>
        </p>
        <p v-html="$t('credits.authorRole')"></p>
        <p v-if="$t('credits.translatedByPrefix')">{{ $t('credits.translatedByPrefix') }}<span
            class="type__credits-bold">{{ $t('credits.translatedByName') }}</span></p>
        <p>
          {{ $t('credits.publishedOnPrefix') }}<span class="type__credits-bold">{{ $t('credits.publishedOnDate')
          }}</span>
        </p>
      </div>
      <div class="credits__col credits__col--right">
        <div class="credits__line-accent ml-auto" aria-hidden="true" />
        <p>
          {{ $t('credits.artDirectionPrefix') }}<span class="type__credits-bold">{{ $t('credits.artDirectionName')
          }}</span>
        </p>
        <p>
          {{ $t('credits.illustrationPrefix') }}<span class="type__credits-bold">{{ $t('credits.illustrationName')
          }}</span>
        </p>
        <p>
          {{ $t('credits.devDesignPrefix') }}<span class="type__credits-bold">{{ $t('credits.devDesignName') }}</span>
        </p>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.credits {
  margin-top: var(--space-10);
  width: 100%;
}

.credits__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3) var(--space-4);
}

.credits__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.credits__col--left {
  text-align: left;
}

.credits__col--right {
  text-align: right;
}

.credits__line-accent {
  width: 8rem;
  height: 0.25rem;
  background: var(--color-orange);
  margin-bottom: var(--space-1);
}
</style>
