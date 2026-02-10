<script setup lang="ts">
import LanguageSelector from './components/LanguageSelector.vue'
import HeroIllustration from './components/HeroIllustration.vue'
import HeroSection from './components/HeroSection.vue'
import CreditsSection from './components/CreditsSection.vue'
import IntroSection from './components/IntroSection.vue'
</script>

<template>
  <div class="app-root">
    <LanguageSelector />
    <main>
      <HeroIllustration />
      <HeroSection />
      <CreditsSection />
      <IntroSection v-if="false" />
    </main>
  </div>
</template>

<style scoped>
.app-root {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.app-root::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: url('./assets/fond_texture.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.app-root :deep(a) {
  color: var(--color-orange);
}
</style>

