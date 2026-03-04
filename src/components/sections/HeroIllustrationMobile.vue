<script setup lang="ts">
import heroImage from '@/assets/illustrations/illu_principale_ok.webp'
</script>

<template>
<div data-mobile data-block data-component="HeroIllustrationMobile"
  class="block block--first">
  <div data-block-inner class="block-inner">
    <section class="hero-block section--full-viewport" aria-label="Hero">
      <div class="hero-block__illustration"
        :style="{ backgroundImage: `url(${heroImage})`, height: '75vh' }" role="img"
        :aria-label="$t('hero.illustrationAlt')" />
      <div class="hero-block__content mt-4 type__credits">
        <div class="container">
          <h1 class="type__hero-title">
            {{ $t('hero.title') }}
          </h1>
          <p class="type__hero-subtitle mt-0" v-html="$t('hero.subtitle')"></p>
          <div class="paragraph-spacing mb-0">
            <div class="container credits__inner">
              <div class="credits__col credits__col--left pb-2 pt-2">
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
              <div class="credits__col credits__col--right pb-2 pt-2">
                <div class="credits__line-accent" aria-hidden="true" />
                <p>
                  {{ $t('credits.artDirectionPrefix') }}<span class="type__credits-bold">{{
                    $t('credits.artDirectionName')
                  }}</span>
                </p>
                <p>
                  {{ $t('credits.illustrationPrefix') }}<span class="type__credits-bold">{{
                    $t('credits.illustrationName')
                  }}</span>
                </p>
                <p>
                  {{ $t('credits.devDesignPrefix') }}<span class="type__credits-bold">{{ $t('credits.devDesignName')
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.hero-block {
  width: 100%;
  line-height: 0;
  overflow-x: hidden;
}

.hero-block__illustration {
  width: 100%;
  min-height: 50vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-block__content {
  line-height: normal;
}

.block--first .block-inner {
  position: relative;
}

.credits__inner {
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 3rem; */
}

.credits__col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.credits__col--left {
  text-align: left;
}

.credits__col--right {
  text-align: left;
}

.credits__line-accent {
  width: 8rem;
  height: 4px;
  background: var(--color-orange);
  margin-bottom: 0.5rem;
}
</style>
