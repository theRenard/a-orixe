<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import CaminoSection from '@/components/sections/CaminoSection.vue'
import CommentEstNeRecitSection from '@/components/sections/CommentEstNeRecitSection.vue'
</script>

<template>
  <main class="mobile-view">
    <HeroSection />
    <CaminoSection />
    <CommentEstNeRecitSection />
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
