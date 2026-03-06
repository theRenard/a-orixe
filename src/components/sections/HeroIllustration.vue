<script setup lang="ts">
import { computed } from 'vue'
import heroImage from '@/assets/illustrations/illu_principale_ok.webp'
import mouseIcon from '@/assets/icons/scroll_down_2.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'

const props = defineProps<{ sectionIndex: number }>()
const { isWide, isMobile } = useMobileDetection()

/** Static illustration height: 100vh (wide) or 75vh (narrow). Previously animated 100→50vh over scroll. */
const illustrationHeightVh = computed(() => (isWide.value ? 100 : 75))
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: heroTitle, direction: 'down', delay: 0.1 }, { el: heroSubtitle, direction: 'down', delay: 0.2 }, { el: creditsLeft, direction: 'left', delay: 0.35, offset: 80 }, { el: creditsRight, direction: 'right', delay: 0.35, offset: 80 }]
  - offset: 48
  - ease: 'power3.out'
  - runOnMount: false

  Scroll-driven behavior (block-inner scroll):
  - SCROLL_THRESHOLD_PX: 600 — illustration height interpolated over this scroll distance (100vh → 50vh).
  - REVEAL_TRIGGER_PX: 50 — reveal animation run when block-inner scrollTop >= 50.
  - SCROLL_INDICATOR_HIDE_PX: 10 — scroll indicator hidden when scrollTop > 10.
  - Scroll listener on blockInnerRef; onBlockScroll updated illustrationHeightVh and showScrollIndicator, and triggered run() once when scrollTop >= REVEAL_TRIGGER_PX.
</doc>

<template>
<section
  :class="['section', `section-${props.sectionIndex}`, 'hero-block', 'section--full-viewport', { 'block--first': props.sectionIndex === 1 }]"
  :data-wide="isWide" :data-mobile="isMobile" data-block data-component="HeroIllustration" aria-label="Hero">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="hero-block__illustration"
        :style="{ backgroundImage: `url(${heroImage})`, height: `${illustrationHeightVh}vh` }" role="img"
        :aria-label="$t('hero.illustrationAlt')">
        <div v-if="isWide" class="scroll-indicator" aria-hidden="true">
          <img :src="mouseIcon" alt="" class="scroll-indicator__icon" />
        </div>
      </div>
      <div class="hero-block__content mt-4 type__credits">
        <div class="container">
          <h1 class="type__hero-title">
            {{ $t('hero.title') }}
          </h1>
          <p class="type__hero-subtitle mt-0" v-html="$t('hero.subtitle')"></p>
          <div class="paragraph-spacing" :class="{ 'mb-0': isMobile }">
            <div class="container credits__inner">
              <div class="credits__col credits__col--left" :class="{ 'pb-2': isMobile, 'pt-2': isMobile }">
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
              <div :class="{ 'pb-2': isMobile, 'pt-2': isMobile }" class="credits__col credits__col--right">
                <div :class="{ 'ml-auto': isWide }" class="credits__line-accent" aria-hidden="true" />
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

    </div>
  </div>
</section>
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
  transition: height 0.25s ease-out;
  position: relative;
}

.hero-block__content {
  line-height: normal;
}

.block--first .section-inner {
  position: relative;
}

.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.25s ease-out;
}

.scroll-indicator--hidden {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: opacity 0.25s ease-out, visibility 0.25s;
}

.scroll-indicator__icon {
  display: block;
  width: 4rem;
  height: auto;
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

@media (min-width: 48rem) {

  /* Limit hero scroll height so less scroll is needed to reach bottom and go to next block */
  .hero-block {
    max-height: calc(100dvh + 600px);
  }

  .credits__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem 3rem;
  }

  .credits__col--right {
    text-align: right;
  }

}
</style>
