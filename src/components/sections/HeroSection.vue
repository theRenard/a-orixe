<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const heroSection = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroSubtitle = ref<HTMLElement | null>(null)
const creditsLeft = ref<HTMLElement | null>(null)
const creditsRight = ref<HTMLElement | null>(null)

const { run } = useRevealAnimation({
  elements: [
    { el: heroTitle, direction: 'left', delay: 0 },
    { el: heroSubtitle, direction: 'left', delay: 0.1 },
    { el: creditsLeft, direction: 'left', delay: 0.25 },
    { el: creditsRight, direction: 'right', delay: 0.25 },
  ],
  duration: 0.6,
  offset: 48,
  scrollTrigger: { trigger: heroSection },
})

onMounted(() => {
  const cleanup = run()
  if (cleanup) {
    onUnmounted(cleanup)
  }
})
</script>

<template>
<section ref="heroSection" class="hero-section mt-4 type__credits" aria-label="Crédits">
  <div class="container">
    <h1 ref="heroTitle" class="type__hero-title">
      {{ $t('hero.title') }}
    </h1>
    <p ref="heroSubtitle" class="type__hero-subtitle mt-0 " v-html="$t('hero.subtitle')"></p>
    <div class="container credits__inner paragraph-spacing">
      <div ref="creditsLeft" class="credits__col credits__col--left">
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
      <div ref="creditsRight" class="credits__col credits__col--right">
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
.hero-section {
  overflow-x: hidden;
}

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
