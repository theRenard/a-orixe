<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImage from '@/assets/illustrations/illu_principale_ok.webp'
import mouseIcon from '@/assets/icons/scroll_down_2.webp'
import { ANIMATION_PLAYBACK_RATE } from '@/config'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isWide, isMobile } = useMobileDetection()
gsap.registerPlugin(ScrollTrigger)

const sectionRoot = ref<HTMLElement | null>(null)
const illustration = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroSubtitle = ref<HTMLElement | null>(null)
const creditsLeft = ref<HTMLElement | null>(null)
const creditsRight = ref<HTMLElement | null>(null)
const scrollIndicator = ref<HTMLElement | null>(null)

const HERO_SCROLL_THRESHOLD_PX = 600
const HERO_SCROLL_INDICATOR_HIDE_PX = 10
const HERO_REVEAL_TRIGGER_PX = 50

let tickerCleanup: (() => void) | null = null
let pinTrigger: ScrollTrigger | null = null
let revealTimeline: gsap.core.Timeline | null = null
let revealDone = false

function setDesktopInitialState() {
  if (!illustration.value || !content.value || !heroTitle.value || !heroSubtitle.value || !creditsLeft.value || !creditsRight.value) return

  gsap.set(illustration.value, { clearProps: 'height', height: '100vh' })
  gsap.set(content.value, { y: -48, opacity: 0 })
  gsap.set(heroTitle.value, { x: -80, opacity: 0 })
  gsap.set(heroSubtitle.value, { x: 80, opacity: 0 })
  gsap.set(creditsLeft.value, { x: -80, opacity: 0 })
  gsap.set(creditsRight.value, { x: 80, opacity: 0 })
  if (scrollIndicator.value) {
    gsap.set(scrollIndicator.value, { opacity: 1, visibility: 'inherit' })
  }
}

function clearDesktopState() {
  tickerCleanup?.()
  tickerCleanup = null
  revealTimeline?.kill()
  revealTimeline = null
  pinTrigger = null
  revealDone = false

  const elements = [
    illustration.value,
    content.value,
    heroTitle.value,
    heroSubtitle.value,
    creditsLeft.value,
    creditsRight.value,
    scrollIndicator.value,
  ].filter(Boolean)

  elements.forEach((element) => {
    gsap.set(element, { clearProps: 'all' })
  })
}

function findPinTrigger(): ScrollTrigger | null {
  if (!sectionRoot.value) return null
  return ScrollTrigger.getAll().find((trigger) =>
    trigger.trigger === sectionRoot.value && Boolean(trigger.pin),
  ) ?? null
}

function syncHeroProgress() {
  if (!illustration.value) return

  if (!pinTrigger) {
    pinTrigger = findPinTrigger()
    if (!pinTrigger) return
  }

  const traveled = Math.max(0, pinTrigger.scroll() - pinTrigger.start)
  const imageProgress = Math.min(traveled / HERO_SCROLL_THRESHOLD_PX, 1)
  gsap.set(illustration.value, { height: `${100 - imageProgress * 50}vh` })

  if (scrollIndicator.value) {
    gsap.set(scrollIndicator.value, {
      opacity: traveled <= HERO_SCROLL_INDICATOR_HIDE_PX ? 1 : 0,
      visibility: traveled <= HERO_SCROLL_INDICATOR_HIDE_PX ? 'inherit' : 'hidden',
    })
  }

  if (!revealDone && traveled >= HERO_REVEAL_TRIGGER_PX) {
    revealDone = true
    revealTimeline?.play(0)
  } else if (revealDone && traveled < HERO_REVEAL_TRIGGER_PX) {
    revealDone = false
    revealTimeline?.pause(0)
  }
}

function initDesktopAnimation() {
  if (!sectionRoot.value || !illustration.value || !content.value || !heroTitle.value || !heroSubtitle.value || !creditsLeft.value || !creditsRight.value) {
    return
  }

  setDesktopInitialState()

  revealTimeline = gsap.timeline({ paused: true })
  revealTimeline.timeScale(ANIMATION_PLAYBACK_RATE)
  revealTimeline
    .to(content.value, {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
    }, 0)
    .to(heroTitle.value, {
      x: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
    }, 0.1)
    .to(heroSubtitle.value, {
      x: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
    }, 0.2)
    .to(creditsLeft.value, {
      x: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
    }, 0.35)
    .to(creditsRight.value, {
      x: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
    }, 0.35)

  const tick = () => {
    syncHeroProgress()
  }

  gsap.ticker.add(tick)
  tickerCleanup = () => {
    gsap.ticker.remove(tick)
  }
  syncHeroProgress()
}

onMounted(() => {
  nextTick(() => {
    if (!isWide.value) return
    initDesktopAnimation()
  })
})

onUnmounted(() => {
  clearDesktopState()
})

watch(isWide, (wide) => {
  clearDesktopState()
  if (wide) {
    initDesktopAnimation()
  }
})
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
  ref="sectionRoot"
  :class="['section', 'hero-block', 'section--full-viewport', 'block--first']"
  :data-wide="isWide" :data-mobile="isMobile" data-block data-component="HeroIllustration" aria-label="Hero">
  <div class="section-inner" data-block-inner>
      <div
        ref="illustration"
        class="hero-block__illustration"
        :style="{ height: isWide ? '100vh' : '75vh' }" role="img"
        :aria-label="$t('hero.illustrationAlt')">
        <img
          :src="heroImage"
          alt=""
          class="hero-block__illustration-image"
          aria-hidden="true">
        <div
          ref="scrollIndicator"
          v-if="isWide"
          class="scroll-indicator"
          aria-hidden="true">
          <img :src="mouseIcon" alt="" class="scroll-indicator__icon" />
        </div>
      </div>
      <div ref="content" class="hero-block__content mt-4 type__credits">
        <div class="container">
          <h1 ref="heroTitle" class="type__hero-title">
            {{ $t('hero.title') }}
          </h1>
          <p ref="heroSubtitle" class="type__hero-subtitle mt-0" v-html="$t('hero.subtitle')"></p>
          <div class="paragraph-spacing" :class="{ 'mb-0': isMobile }">
            <div class="container credits__inner">
              <div
                ref="creditsLeft"
                class="credits__col credits__col--left"
                :class="{ 'pb-2': isMobile, 'pt-2': isMobile }">
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
              <div
                ref="creditsRight"
                :class="{ 'pb-2': isMobile, 'pt-2': isMobile }"
                class="credits__col credits__col--right">
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
</section>
</template>

<style scoped>
.hero-block {
  width: 100vw;
  line-height: 0;
  overflow-x: hidden;
  justify-content: flex-start;
  align-items: stretch;
}

.hero-block__illustration {
  width: 100vw;
  min-height: 50vh;
  transition: height 0.25s ease-out;
  position: relative;
  overflow: hidden;
}

.hero-block__illustration-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.hero-block__content {
  line-height: normal;
}

.block--first .section-inner {
  position: relative;
  width: 100vw;
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
