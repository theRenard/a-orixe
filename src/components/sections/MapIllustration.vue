<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import mapImage from '@/assets/illustrations/map.webp'
import mapLineImage from '@/assets/illustrations/map_line.webp'
import espagneImage from '@/assets/illustrations/espagne_ok.webp'
import mapImageMobile from '@/assets/illustrations/map_MOBILE_01.webp'
import mapLineImageMobile from '@/assets/illustrations/map_MOBILE_02.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const mapWrap = ref<HTMLElement | null>(null)
const line = ref<HTMLElement | null>(null)
const lineWidthPx = ref<number | null>(null)

function setLineWidth() {
  const wrap = mapWrap.value
  if (wrap) {
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

onMounted(() => {
  setLineWidth()
  const wrap = mapWrap.value
  if (wrap) {
    const resizeObserver = new ResizeObserver(setLineWidth)
    resizeObserver.observe(wrap)
    onUnmounted(() => resizeObserver.disconnect())
  }
  if (sectionRoot.value) {
    useAnimation({
      tweens: [
        { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      ],
    })
  }
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: title, direction: 'left', delay: 0.1 }, { el: stepsImage, direction: 'right', delay: 0.18, rotation: 12 }, { el: question, direction: 'down', delay: 0.26 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
  Line-width timeline (ScrollTrigger):
  - trigger: sectionRoot, start: 'top 70%', once: true
  - lineContainer: width 27% at 0, then to width 100% over duration 5, ease linear, position 0.15
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'map-illustration-section']" data-block data-component="MapIllustration">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div ref="mapWrap" class="map-illustration section--full-viewport image-section" role="img"
        :aria-label="$t('carteEtapesSantiago.caption')">
        <img class="map-illustration__bg" :src="mapImageComputed" alt="" />
        <div class="map-illustration__line-container map-illustration__line-container--visible">
          <div ref="line" class="map-illustration__line" :style="lineStyle" aria-hidden="true" />
        </div>
      </div>
      <div class="container">
        <div class="centered--large">
          <div class="row-two-col map-illustration-section__steps-row">
            <h2 class="type__section-title type__section-title--with-line heading-spacing col-left">
              {{ $t('santiagoSteps.title') }}
            </h2>
            <img :src="espagneImage" alt="" class="map-illustration-section__steps-img col-right"
              :class="{ 'paragraph-spacing': isMobile }" aria-hidden="true">
          </div>
        </div>
        <div class="centered">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoSteps.paragraph1')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoSteps.paragraph2')"></p>
          <p class="type__question paragraph-spacing" v-html="$t('santiagoSteps.highlight')"></p>
        </div>
      </div>
    </div>
  </div>
</section>
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

.map-illustration__line-container--visible {
  width: 100%;
}

/* Line width is set in px to match map so it doesn't scale as container grows */
.map-illustration__line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
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
