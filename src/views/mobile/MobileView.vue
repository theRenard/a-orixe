<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import CreditsSection from '@/components/CreditsSection.vue'
import CaminoSection from '@/components/CaminoSection.vue'
</script>

<template>
  <main class="mobile-view">
    <HeroSection />
    <CreditsSection />
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
