<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioForetOiseaux from '@/assets/audio/audio_foret_oiseaux.mp3'
import capsuleSonoreImage from '@/assets/photos/13_florence_antunes.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isWide, isMobile } = useMobileDetection()
gsap.registerPlugin(ScrollTrigger)

const sectionRoot = ref<HTMLElement | null>(null)
const illustration = ref<HTMLElement | null>(null)
const illustrationImage = ref<HTMLImageElement | null>(null)
const playerBlock = ref<HTMLElement | null>(null)

const IMAGE_SCROLL_THRESHOLD_PX = 700
const IMAGE_END_HEIGHT_VH = 50
const IMAGE_SIDE_PADDING_REM = 15
const IMAGE_END_OBJECT_POSITION_Y = 50
const REVEAL_TRIGGER_PX = 80

let tickerCleanup: (() => void) | null = null
let pinTrigger: ScrollTrigger | null = null
let revealTimeline: gsap.core.Timeline | null = null
let revealDone = false

function setDesktopInitialState() {
  if (!illustration.value || !illustrationImage.value || !playerBlock.value) return

  gsap.set(illustration.value, {
    clearProps: 'height,paddingLeft,paddingRight,boxSizing',
    height: '100vh',
    paddingLeft: '0rem',
    paddingRight: '0rem',
    boxSizing: 'border-box',
  })
  gsap.set(illustrationImage.value, { scale: 1.18, transformOrigin: 'center top' })
  illustrationImage.value.style.objectPosition = '50% 100%'
  gsap.set(playerBlock.value, { y: -48, opacity: 0 })
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
    playerBlock.value,
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
  if (!sectionRoot.value || !illustration.value || !illustrationImage.value || !playerBlock.value) {
    return
  }

  setDesktopInitialState()

  revealTimeline = gsap.timeline({ paused: true })
  revealTimeline.to(playerBlock.value, {
    y: 0,
    opacity: 1,
    duration: 3,
    ease: 'power3.out',
  }, 0)

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
<section ref="sectionRoot" :class="['section', 'capsule-sonore-section', 'section--full-viewport']" data-block
  data-component="CapsuleSonoreSection">
  <div class="section-inner" data-block-inner>
    <div ref="illustration" class="capsule-sonore-section__illustration" :style="{ height: isWide ? '100vh' : '60vh' }">
      <ImageCrop width="100%" height="100%" position="bottom center" :caption="$t('capsuleSonore.imageCaption')"
        caption-position="bottom">
        <img ref="illustrationImage" :src="capsuleSonoreImage" :alt="$t('capsuleSonore.imageCaption')"
          class="capsule-sonore-section__illustration-image" loading="lazy">
      </ImageCrop>
    </div>

    <div ref="playerBlock" class="capsule-sonore-section__content">
      <div class="container">
        <div class="centered">
          <div class="capsule-sonore-section__player-wrap mt-3 mb-3" :class="{ 'mt-10': isMobile, 'mb-10': isMobile }">
            <SoundPlayer :src="audioForetOiseaux" :text="$t('capsuleSonore.soundPlayerText')"
              :image="capsuleSonoreImage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.capsule-sonore-section {
  width: 100vw;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: hidden;
}

.capsule-sonore-section .section-inner {
  position: relative;
  width: 100vw;
}

.capsule-sonore-section__illustration {
  width: 100vw;
  min-height: 25vh;
  position: relative;
}

.capsule-sonore-section__illustration-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom center;
  display: block;
  transform-origin: center top;
  will-change: transform;
}

.capsule-sonore-section__illustration :deep(.image-crop) {
  width: 100%;
  height: 100%;
}

.capsule-sonore-section__illustration :deep(.type__image-caption) {
  padding: 0.75rem 0 0;
}

.capsule-sonore-section__content {
  line-height: normal;
  padding-top: 2.5rem;
}

.capsule-sonore-section__player-wrap {
  display: flex;
  justify-content: center;
}

@media (max-width: 47.99rem) {
  .capsule-sonore-section {
    width: 100%;
  }

  .capsule-sonore-section .section-inner {
    width: 100%;
  }

  .capsule-sonore-section__illustration {
    width: 100%;
  }
}
</style>
