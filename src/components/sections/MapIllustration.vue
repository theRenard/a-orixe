<script setup lang="ts">
import mapImage from '@/assets/illustrations/map.webp'
import mapLineImage from '@/assets/illustrations/map_line.webp'
</script>

<template>
<section class="map-illustration section--full-viewport mt-4 image-section" role="img"
  :aria-label="$t('carteEtapesSantiago.caption')">
  <img class="map-illustration__bg" :src="mapImage" alt="" />
  <div class="map-illustration__line" :style="{ backgroundImage: `url(${mapLineImage})` }" aria-hidden="true" />
</section>
</template>

<style scoped>
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
