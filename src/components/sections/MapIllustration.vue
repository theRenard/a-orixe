<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import mapImage from '@/assets/illustrations/map.webp'
import mapLineImage from '@/assets/illustrations/map_line.webp'
import espagneImage from '@/assets/illustrations/espagne_ok.webp'
import mapImageMobile from '@/assets/illustrations/map_MOBILE_01.webp'
import mapLineImageMobile from '@/assets/illustrations/map_MOBILE_02.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isWide, isMobile } = useMobileDetection()

const mapBlock = ref<HTMLElement | null>(null)
const mapImageRef = ref<HTMLImageElement | null>(null)
const lineContainer = ref<HTMLElement | null>(null)
const lineImageRef = ref<HTMLImageElement | null>(null)
const content = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const stepsImage = ref<HTMLImageElement | null>(null)
const question = ref<HTMLElement | null>(null)

const MAP_LINE_REVEAL_START_RATIO = 0.18
const MAP_LINE_ANIMATION_DURATION_SEC = 9
const DESKTOP_MAP_ASPECT_RATIO = '4000 / 1609'
const MOBILE_MAP_ASPECT_RATIO = '1500 / 1411'

const mapImageComputed = computed(() => (isMobile.value ? mapImageMobile : mapImage))
const mapLineImageComputed = computed(() => (isMobile.value ? mapLineImageMobile : mapLineImage))
const mapAspectRatio = computed(() => (isMobile.value ? MOBILE_MAP_ASPECT_RATIO : DESKTOP_MAP_ASPECT_RATIO))

let lineRevealTimeline: gsap.core.Timeline | null = null
let revealTimeline: gsap.core.Timeline | null = null

function setDesktopInitialState() {
  if (!mapBlock.value || !mapImageRef.value || !lineImageRef.value || !lineContainer.value || !content.value || !title.value || !stepsImage.value || !question.value) {
    return
  }

  gsap.set(mapBlock.value, {
    clearProps: 'transformOrigin',
    transformOrigin: 'center top',
  })
  gsap.set(lineContainer.value, { clipPath: `inset(0 ${100 - MAP_LINE_REVEAL_START_RATIO * 100}% 0 0)` })
  gsap.set(content.value, { y: -48, opacity: 0 })
  gsap.set(title.value, { x: -80, opacity: 0 })
  gsap.set(stepsImage.value, { x: 80, opacity: 0, rotation: 12 })
  gsap.set(question.value, { y: -80, opacity: 0 })
}

function clearDesktopState() {
  lineRevealTimeline?.kill()
  lineRevealTimeline = null
  revealTimeline?.kill()
  revealTimeline = null

  const elements = [
    mapBlock.value,
    mapImageRef.value,
    lineContainer.value,
    lineImageRef.value,
    content.value,
    title.value,
    stepsImage.value,
    question.value,
  ].filter(Boolean)

  elements.forEach((element) => {
    gsap.set(element, { clearProps: 'all' })
  })
}

function initDesktopAnimation() {
  if (!mapBlock.value || !mapImageRef.value || !lineContainer.value || !lineImageRef.value || !content.value || !title.value || !stepsImage.value || !question.value) {
    return
  }

  setDesktopInitialState()

  lineRevealTimeline = gsap.timeline({ paused: true })
  lineRevealTimeline.to(lineContainer.value, {
    clipPath: 'inset(0 0% 0 0)',
    duration: MAP_LINE_ANIMATION_DURATION_SEC,
    ease: 'power2.out',
  })

  revealTimeline = gsap.timeline({ paused: true })
  revealTimeline
    .to(content.value, {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
    }, 0)
    .to(title.value, {
      x: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
    }, 0.1)
    .to(stepsImage.value, {
      x: 0,
      opacity: 1,
      rotation: 0,
      duration: 3,
      ease: 'power3.out',
    }, 0.18)
    .to(question.value, {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
    }, 0.26)

  lineRevealTimeline.play(0)
  revealTimeline.play(0)
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

<template>
<section class="section map-illustration-section section--full-viewport" data-block
  data-component="MapIllustration">
  <div class="section-inner" data-block-inner>
    <div ref="mapBlock" class="map-illustration" :style="{ '--map-aspect-ratio': mapAspectRatio }" role="img"
      :aria-label="$t('carteEtapesSantiago.caption')">
      <img ref="mapImageRef" class="map-illustration__bg" :src="mapImageComputed" alt="" aria-hidden="true">
      <div ref="lineContainer" class="map-illustration__line-container">
        <img ref="lineImageRef" class="map-illustration__line" :src="mapLineImageComputed" alt="" aria-hidden="true">
      </div>
    </div>

    <div ref="content" class="map-illustration-section__content pb-10">
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
          <p ref="question" class="type__question paragraph-spacing mb-10" v-html="$t('santiagoSteps.highlight')"></p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.map-illustration-section {
  width: 100vw;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: hidden;
}

.map-illustration-section .section-inner {
  position: relative;
  width: 100vw;
}

.map-illustration {
  width: 100vw;
  max-width: 100vw;
  aspect-ratio: var(--map-aspect-ratio);
  height: auto;
  line-height: 0;
  position: relative;
  overflow: hidden;
}

.map-illustration__bg {
  display: block;
  width: 100%;
  height: auto;
}

.map-illustration__line {
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.map-illustration__line-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  will-change: clip-path;
}

.map-illustration__line {
  pointer-events: none;
}

.map-illustration-section__content {
  line-height: normal;
  padding-top: 2.5rem;
}

.map-illustration-section__steps-row {
  position: relative;
}

@media (max-width: 47.99rem) {

  .map-illustration-section,
  .map-illustration-section .section-inner,
  .map-illustration {
    max-width: 100vw;
  }

  .map-illustration-section {
    width: 100%;
  }

  .map-illustration-section .section-inner {
    width: 100%;
  }

  .map-illustration {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }

  .map-illustration-section__steps-img {
    bottom: 100%;
  }
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
  top: -30rem;
}
</style>
