<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, inject } from 'vue'
import gsap from 'gsap'
import heroImage from '@/assets/illustrations/illu_principale_ok.webp'
import mouseIcon from '@/assets/icons/scroll_down_2.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'

const sectionRoot = ref<HTMLElement | null>(null)
const blockInnerRef = ref<HTMLElement | null>(null)
const bg = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroSubtitle = ref<HTMLElement | null>(null)
const creditsLeft = ref<HTMLElement | null>(null)
const creditsRight = ref<HTMLElement | null>(null)

const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')

/** Illustration height in vh: 100 at top, 50 after scrolling (over first ~200px). */
const illustrationHeightVh = ref(100)
const SCROLL_THRESHOLD_PX = 200

/** Hide mouse icon as soon as user scrolls. */
const showScrollIndicator = ref(true)
const SCROLL_INDICATOR_HIDE_PX = 10

/** Run the reveal animation when user has scrolled this far inside the hero block. */
const REVEAL_TRIGGER_PX = 50
let revealDone = false

const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: heroTitle, direction: 'down', delay: 0.1 },
    { el: heroSubtitle, direction: 'down', delay: 0.2 },
    { el: creditsLeft, direction: 'left', delay: 0.35, offset: 80 },
    { el: creditsRight, direction: 'right', delay: 0.35, offset: 80 },
  ],
  offset: 48,
  ease: 'power3.out',
  runOnMount: false,
})

function onBlockScroll() {
  const el = blockInnerRef.value
  if (!el) return
  const scrollTop = el.scrollTop
  const progress = Math.min(1, scrollTop / SCROLL_THRESHOLD_PX)
  illustrationHeightVh.value = 100 - progress * 0.05
  showScrollIndicator.value = scrollTop <= SCROLL_INDICATOR_HIDE_PX

  if (!revealDone && scrollTop >= REVEAL_TRIGGER_PX) {
    revealDone = true
    run()
  }
}

function setRevealInitialState() {
  const left = creditsLeft.value
  const right = creditsRight.value
  if (left) gsap.set(left, { x: -80, opacity: 0 })
  if (right) gsap.set(right, { x: 80, opacity: 0 })
}

let myBlockIndex = -1
onMounted(() => {
  myBlockIndex = getBlockIndexFromElement(sectionRoot.value)
  registerBlockEnter?.(myBlockIndex, () => {
    if (!revealDone) {
      revealDone = true
      run()
    }
  })
  nextTick(setRevealInitialState)
  const el = blockInnerRef.value
  if (el) {
    el.addEventListener('scroll', onBlockScroll, { passive: true })
    onUnmounted(() => el.removeEventListener('scroll', onBlockScroll))
  }
})
onUnmounted(() => {
  unregisterBlockEnter?.(myBlockIndex)
})
</script>

<template>
<div data-block data-component="HeroIllustration" class="block block--first">
  <div ref="blockInnerRef" data-block-inner class="block-inner">
    <section class="hero-block section--full-viewport" aria-label="Hero">
      <div ref="bg" class="hero-block__illustration"
        :style="{ backgroundImage: `url(${heroImage})`, height: `${illustrationHeightVh}vh` }" role="img"
        :aria-label="$t('hero.illustrationAlt')" />
      <div ref="sectionRoot" class="hero-block__content mt-4 type__credits">
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
                {{ $t('credits.devDesignPrefix') }}<span class="type__credits-bold">{{ $t('credits.devDesignName')
                  }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="scroll-indicator" :class="{ 'scroll-indicator--hidden': !showScrollIndicator }" aria-hidden="true">
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
  min-height: 50vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: height 0.25s ease-out;
}

.hero-block__content {
  line-height: normal;
}

.block--first .block-inner {
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
