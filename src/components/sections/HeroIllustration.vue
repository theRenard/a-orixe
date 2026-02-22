<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import heroImage from '@/assets/illustrations/illu_principale_ok.webp'
import mouseIcon from '@/assets/icons/computer-mouse-icon.svg'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const bg = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroSubtitle = ref<HTMLElement | null>(null)
const creditsLeft = ref<HTMLElement | null>(null)
const creditsRight = ref<HTMLElement | null>(null)

const { run } = useRevealAnimation({
  elements: [
    { el: bg, direction: 'left', delay: 0 },
    { el: heroTitle, direction: 'left', delay: 0.1 },
    { el: heroSubtitle, direction: 'left', delay: 0.2 },
    { el: creditsLeft, direction: 'left', delay: 0.35 },
    { el: creditsRight, direction: 'right', delay: 0.35 },
  ],
  duration: 0.6,
  offset: 48,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="HeroIllustration" class="block block--first">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="hero-block" aria-label="Hero">
      <div
        ref="bg"
        class="hero-block__illustration"
        :style="{ backgroundImage: `url(${heroImage})` }"
        role="img"
        :aria-label="$t('hero.illustrationAlt')"
      />
      <div class="hero-block__content mt-4 type__credits">
        <div class="container">
          <h1 ref="heroTitle" class="type__hero-title">
            {{ $t('hero.title') }}
          </h1>
          <p ref="heroSubtitle" class="type__hero-subtitle mt-0" v-html="$t('hero.subtitle')"></p>
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
                {{ $t('credits.publishedOnPrefix') }}<span class="type__credits-bold">{{ $t('credits.publishedOnDate') }}</span>
              </p>
            </div>
            <div ref="creditsRight" class="credits__col credits__col--right">
              <div class="credits__line-accent ml-auto" aria-hidden="true" />
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
        </div>
      </div>
    </section>
    <div class="scroll-indicator" aria-hidden="true">
      <img :src="mouseIcon" alt="" class="scroll-indicator__icon" />
    </div>
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
  min-height: 100vh;
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

.scroll-indicator {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.scroll-indicator__icon {
  display: block;
  width: 2rem;
  height: auto;
  animation: scroll-jump 1.2s cubic-bezier(0.33, 1, 0.68, 1) infinite;
}

@keyframes scroll-jump {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.6rem);
  }
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
