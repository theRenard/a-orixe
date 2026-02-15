<template>
<section class="mt-4 type__credits" aria-label="Crédits">
  <div class="container">
    <h1 class="type__hero-title">
      {{ $t('hero.title') }}
    </h1>
    <p class="type__hero-subtitle mt-2">
      {{ $t('hero.subtitle') }}
    </p>
    <div class="container credits__inner mt-6">
      <div class="credits__col credits__col--left">
        <div class="credits__line-accent" aria-hidden="true" />
        <p>
          {{ $t('credits.byPrefix') }}<span class="type__credits-bold">{{ $t('credits.byName') }}</span>
        </p>
        <p>{{ $t('credits.authorRole') }}</p>
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
  margin-top: 100px;
  width: 100%;
}

.credits__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 3rem;
}

.credits__col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.credits__col p {
  margin: 0;
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

</style>
