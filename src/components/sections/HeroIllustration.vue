<script setup lang="ts">
import heroImage from '@/assets/illustrations/illu_principale_ok.webp'
</script>

<template>
<section class="hero-illustration section--full-viewport">
  <div
    class="hero-illustration__bg"
    :style="{ backgroundImage: `url(${heroImage})` }"
    role="img"
    :aria-label="$t('hero.illustrationAlt')"
  />
</section>
</template>

<style scoped>
.hero-illustration {
  width: 100%;
  line-height: 0;
}

.hero-illustration__bg {
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
