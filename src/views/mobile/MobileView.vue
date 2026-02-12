<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import CaminoSection from '@/components/sections/CaminoSection.vue'
</script>

<template>
  <main class="mobile-view">
    <HeroSection />
    <CaminoSection />
  </main>
</template>

<style scoped>
.mobile-view {
  width: 100%;
  min-height: 100vh;
  padding: 0 1rem;
  box-sizing: border-box;
}
</style>
