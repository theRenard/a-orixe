<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imageSrc from '@/assets/photos/02_miguel_angel_soutullo_alvarez.webp'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { ANIMATION_PLAYBACK_RATE } from '@/config'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isWide, isMobile } = useMobileDetection()
gsap.registerPlugin(ScrollTrigger)

const sectionRoot = ref<HTMLElement | null>(null)
const illustration = ref<HTMLElement | null>(null)
const illustrationImage = ref<HTMLImageElement | null>(null)
const content = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)

const IMAGE_SCROLL_THRESHOLD_PX = 700
const IMAGE_END_HEIGHT_VH = 25
const IMAGE_SIDE_PADDING_REM = 20
const IMAGE_END_OBJECT_POSITION_Y = 70
const REVEAL_TRIGGER_PX = 80

let tickerCleanup: (() => void) | null = null
let pinTrigger: ScrollTrigger | null = null
let revealTimeline: gsap.core.Timeline | null = null
let revealDone = false

function setDesktopInitialState() {
  if (!illustration.value || !illustrationImage.value || !content.value || !title.value || !question.value) return

  gsap.set(illustration.value, {
    clearProps: 'height,paddingLeft,paddingRight,boxSizing',
    height: '100vh',
    paddingLeft: '0rem',
    paddingRight: '0rem',
    boxSizing: 'border-box',
  })
  gsap.set(illustrationImage.value, { scale: 1.18, transformOrigin: 'center top' })
  illustrationImage.value.style.objectPosition = '50% 100%'
  gsap.set(content.value, { y: -48, opacity: 0 })
  gsap.set(title.value, { x: -80, opacity: 0 })
  gsap.set(question.value, { y: -80, opacity: 0 })
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
    illustrationImage.value,
    content.value,
    title.value,
    question.value,
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

function syncSectionProgress() {
  if (!illustration.value || !illustrationImage.value) return

  if (!pinTrigger) {
    pinTrigger = findPinTrigger()
    if (!pinTrigger) return
  }

  const traveled = Math.max(0, pinTrigger.scroll() - pinTrigger.start)
  const imageProgress = Math.min(traveled / IMAGE_SCROLL_THRESHOLD_PX, 1)
  const nextHeight = 100 - imageProgress * (100 - IMAGE_END_HEIGHT_VH)
  gsap.set(illustration.value, {
    height: `${nextHeight}vh`,
    paddingLeft: `${imageProgress * IMAGE_SIDE_PADDING_REM}rem`,
    paddingRight: `${imageProgress * IMAGE_SIDE_PADDING_REM}rem`,
  })
  gsap.set(illustrationImage.value, { scale: 1.18 - imageProgress * 0.18 })
  illustrationImage.value.style.objectPosition = `50% ${100 - imageProgress * (100 - IMAGE_END_OBJECT_POSITION_Y)}%`

  if (!revealDone && traveled >= REVEAL_TRIGGER_PX) {
    revealDone = true
    revealTimeline?.play(0)
  } else if (revealDone && traveled < REVEAL_TRIGGER_PX) {
    revealDone = false
    revealTimeline?.pause(0)
  }
}

function initDesktopAnimation() {
  if (!sectionRoot.value || !illustration.value || !illustrationImage.value || !content.value || !title.value || !question.value) {
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
    .to(title.value, {
      x: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
    }, 0.1)
    .to(question.value, {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
    }, 0.2)

  const tick = () => {
    syncSectionProgress()
  }

  gsap.ticker.add(tick)
  tickerCleanup = () => {
    gsap.ticker.remove(tick)
  }
  syncSectionProgress()
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
<section ref="sectionRoot"
  :class="['section', 'reconstitution-trac-section', 'section--full-viewport', { 'mt-8': isMobile }]" data-block
  data-component="ReconstitutionTracSection">
  <div class="section-inner" data-block-inner>
    <div ref="illustration" class="reconstitution-trac-section__illustration"
      :style="{ height: isWide ? '100vh' : '60vh' }">
      <ImageCrop width="100%" height="100%" position="bottom center" :caption="$t('reconstitutionTrac.imageCaption')"
        caption-position="bottom">
        <img ref="illustrationImage" :src="imageSrc" :alt="$t('reconstitutionTrac.imageCaption')"
          class="reconstitution-trac-section__illustration-image" loading="lazy">
      </ImageCrop>
    </div>

    <div ref="content" class="reconstitution-trac-section__content">
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('reconstitutionTrac.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph2')"></p>
            <p ref="question" class="type__question paragraph-spacing" v-html="$t('reconstitutionTrac.question')"></p>
            <p class="type__section-paragraph travail-fourmi-paragraph paragraph-spacing"
              v-html="$t('travailFourmi.paragraph')"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.reconstitution-trac-section {
  width: 100vw;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: hidden;
}

.reconstitution-trac-section .section-inner {
  position: relative;
  width: 100vw;
}

.reconstitution-trac-section__illustration {
  width: 100vw;
  min-height: 25vh;
  position: relative;
}

.reconstitution-trac-section__illustration-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom center;
  display: block;
  transform-origin: center top;
  will-change: transform;
}

.reconstitution-trac-section__illustration :deep(.image-crop) {
  width: 100%;
  height: 100%;
}

.reconstitution-trac-section__illustration :deep(.type__image-caption) {
  padding: 0.75rem 0 0;
}

.reconstitution-trac-section__content {
  line-height: normal;
  padding-top: 2.5rem;
}

@media (max-width: 47.99rem) {
  .reconstitution-trac-section {
    width: 100%;
  }

  .reconstitution-trac-section .section-inner {
    width: 100%;
  }

  .reconstitution-trac-section__illustration {
    width: 100%;
  }
}
</style>
