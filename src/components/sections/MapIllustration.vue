<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import mapImage from '@/assets/illustrations/map.webp'
import mapLineImage from '@/assets/illustrations/map_line.webp'
import espagneImage from '@/assets/illustrations/espagne_ok.webp'
import mapImageMobile from '@/assets/illustrations/map_MOBILE_01.webp'
import mapLineImageMobile from '@/assets/illustrations/map_MOBILE_02.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'
import { useMobileDetection, isMobileViewport } from '@/composables/useMobileDetection'

gsap.registerPlugin(ScrollTrigger)
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const bg = ref<HTMLElement | null>(null)
const mapWrap = ref<HTMLElement | null>(null)
const lineContainer = ref<HTMLElement | null>(null)
const line = ref<HTMLElement | null>(null)
const lineWidthPx = ref<number | null>(null)

function setLineWidth() {
  const wrap = mapWrap.value
  const lineEl = line.value
  if (wrap && lineEl) {
    lineWidthPx.value = wrap.offsetWidth
  }
}

const mapImageComputed = computed(() => {
  return isMobile.value ? mapImageMobile : mapImage
})
const mapLineImageComputed = computed(() => {
  return isMobile.value ? mapLineImageMobile : mapLineImage
})

const lineStyle = computed(() => {
  const w = lineWidthPx.value
  const bgImg = mapLineImageComputed.value
  if (w == null) return { backgroundImage: `url(${bgImg})` }
  return { width: `${w}px`, backgroundImage: `url(${bgImg})` }
})
const title = ref<HTMLElement | null>(null)
const stepsImage = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)


const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const { run, setInitialState } = useRevealAnimation({
  elements: [
    { el: title, direction: 'left', delay: 0.1 },
    // { el: mapWrap, direction: 'up', delay: 0.1, scale: 3, duration: 4, transformOrigin: 'bottom center' },
    { el: stepsImage, direction: 'right', delay: 0.18, rotation: 12 },
    { el: question, direction: 'down', delay: 0.26 },
  ],
  offset: 44,
  ease: 'power3.out',
  runOnMount: false,
})
let myBlockIndex = -1
let mobileRevealCleanup: (() => void) | void
onMounted(() => {
  setInitialState()
  myBlockIndex = getBlockIndexFromElement(sectionRoot.value)
  registerBlockEnter?.(myBlockIndex, () => run())
  if (isMobileViewport()) mobileRevealCleanup = run()
  setLineWidth()
  const resizeObserver = new ResizeObserver(setLineWidth)
  const wrap = mapWrap.value
  if (wrap) resizeObserver.observe(wrap)
  onUnmounted(() => resizeObserver.disconnect())
  const containerEl = lineContainer.value
  const triggerEl = sectionRoot.value
  if (containerEl && triggerEl) {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: triggerEl, start: 'top 70%', once: true },
    })
    tl.to(containerEl, { width: '27%', duration: 0, ease: 'linear' }, 0)
    tl.to(containerEl, { width: '100%', duration: 5, ease: 'linear' }, 0.15)
    onUnmounted(() => tl.scrollTrigger?.kill())
  }
})
onUnmounted(() => {
  unregisterBlockEnter?.(myBlockIndex)
  mobileRevealCleanup?.()
})
</script>

<template>
<div data-block data-component="MapIllustration" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="map-illustration-section">
      <div ref="mapWrap" class="map-illustration section--full-viewport image-section" role="img"
        :aria-label="$t('carteEtapesSantiago.caption')">
        <img ref="bg" class="map-illustration__bg" :src="mapImageComputed" alt="" />
        <div ref="lineContainer" class="map-illustration__line-container">
          <div ref="line" class="map-illustration__line" :style="lineStyle" aria-hidden="true" />
        </div>
      </div>
      <div class="container">
        <div class="centered--large">
          <div class="row-two-col map-illustration-section__steps-row">
            <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing col-left">
              {{ $t('santiagoSteps.title') }}
            </h2>
            <img ref="stepsImage" :src="espagneImage" alt="" class="map-illustration-section__steps-img col-right"
              :class="{ 'paragraph-spacing': isMobile }" aria-hidden="true">
          </div>
        </div>
        <div class="centered">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoSteps.paragraph1')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoSteps.paragraph2')"></p>
          <p ref="question" class="type__question paragraph-spacing" v-html="$t('santiagoSteps.highlight')"></p>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.map-illustration-section {
  overflow-x: hidden;
}

.map-illustration {
  width: 100%;
  line-height: 0;
  position: relative;
}

.image-section {
  min-height: auto !important;
}

.map-illustration__bg {
  display: block;
  width: 100%;
  height: auto;
  vertical-align: middle;
}

.map-illustration__line-container {
  position: absolute;
  inset: 0;
  width: 0;
  overflow: hidden;
}

/* Line width is set in px to match map so it doesn’t scale as container grows */
/* Line is full map width in px; container acts as mask and reveals it by animating width */
.map-illustration__line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  /* width from :style (lineStyle) so the image never shrinks; container clips it */
  min-width: 100%;
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  pointer-events: none;
}

.map-illustration-section__steps-row {
  position: relative;
}

.map-illustration-section__steps-img {
  display: block;
  height: 25rem;
  width: auto;
  object-fit: contain;
  border: 3px solid var(--color-orange);
  padding: 2rem;
  position: absolute;
  right: 1rem;
  bottom: 0;
}

@media (max-width: 47.99rem) {
  .map-illustration-section__steps-img {
    bottom: 100%;
  }
}
</style>
