<script setup lang="ts">
import HeroIllustration from '@/components/HeroIllustration.vue'
import HeroSection from '@/components/HeroSection.vue'
import CreditsSection from '@/components/CreditsSection.vue'
import CaminoSection from '@/components/CaminoSection.vue'
import TestimonialSection from '@/components/TestimonialSection.vue'
</script>

<template>
  <main>
    <HeroIllustration />
    <div>
      <HeroSection />
      <CreditsSection />
      <CaminoSection />
      <TestimonialSection quote-key="camino.quote" author-key="camino.quoteAuthor" />
    </div>
  </main>
</template>
