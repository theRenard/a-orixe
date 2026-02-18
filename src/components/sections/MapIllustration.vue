<script setup lang="ts">
import mapImage from '@/assets/illustrations/map.webp'
import mapLineImage from '@/assets/illustrations/map_line.webp'
</script>

<template>
<section class="map-illustration section--full-viewport mt-4" role="img"
  :aria-label="$t('carteEtapesSantiago.caption')">
  <div class="map-illustration__bg" :style="{ backgroundImage: `url(${mapImage})` }" />
  <div class="map-illustration__line" :style="{ backgroundImage: `url(${mapLineImage})` }" aria-hidden="true" />
</section>
</template>

<style scoped>
.map-illustration {
  width: 100%;
  line-height: 0;
  position: relative;
}

.map-illustration__bg {
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
