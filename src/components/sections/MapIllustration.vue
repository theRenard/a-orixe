<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import mapImage from '@/assets/illustrations/map.webp'
import mapLineImage from '@/assets/illustrations/map_line.webp'
import espagneImage from '@/assets/illustrations/espagne_ok.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const bg = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const stepsImage = ref<HTMLElement | null>(null)
const textBlock = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: bg, direction: 'left', delay: 0 },
    { el: title, direction: 'left', delay: 0.1 },
    { el: stepsImage, direction: 'right', delay: 0.18 },
    { el: textBlock, direction: 'left', delay: 0.28 },
  ],
  duration: 0.6,
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="MapIllustration" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="map-illustration-section">
      <div class="map-illustration section--full-viewport mt-4 image-section" role="img"
        :aria-label="$t('carteEtapesSantiago.caption')">
        <img ref="bg" class="map-illustration__bg" :src="mapImage" alt="" />
        <div class="map-illustration__line" :style="{ backgroundImage: `url(${mapLineImage})` }" aria-hidden="true" />
      </div>
      <div class="container">
        <div class="centered--large">
          <div class="row-two-col map-illustration-section__steps-row">
            <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing col-left">
              {{ $t('santiagoSteps.title') }}
            </h2>
            <img ref="stepsImage" :src="espagneImage" alt="" class="map-illustration-section__steps-img col-right" aria-hidden="true">
          </div>
        </div>
        <div ref="textBlock" class="centered">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoSteps.paragraph1')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoSteps.paragraph2')"></p>
          <p class="type__question paragraph-spacing" v-html="$t('santiagoSteps.highlight')"></p>
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

.map-illustration__line {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
}

.map-illustration-section__steps-row {
  position: relative;
}

.map-illustration-section__steps-img {
  display: block;
  height: 370px;
  width: auto;
  object-fit: contain;
  border: 3px solid var(--color-orange);
  padding: 20px;
  position: absolute;
  right: 1rem;
  bottom: 0;
}
</style>
