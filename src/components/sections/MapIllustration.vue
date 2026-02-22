<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import mapImage from '@/assets/illustrations/map.webp'
import mapLineImage from '@/assets/illustrations/map_line.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const bg = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [{ el: bg, direction: 'left' }],
  duration: 0.8,
  offset: 40,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="map-illustration section--full-viewport mt-4 image-section" role="img"
      :aria-label="$t('carteEtapesSantiago.caption')">
      <img ref="bg" class="map-illustration__bg" :src="mapImage" alt="" />
      <div class="map-illustration__line" :style="{ backgroundImage: `url(${mapLineImage})` }" aria-hidden="true" />
    </section>
  </div>
</div>
</template>

<style scoped>
.map-illustration {
  overflow-x: hidden;
}

.image-section {
  min-height: auto !important;
}

.map-illustration {
  width: 100%;
  line-height: 0;
  position: relative;
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
</style>
