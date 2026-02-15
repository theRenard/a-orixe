<script setup lang="ts">
import SantiagoJourneyPhotoGrid from '@/components/sections/SantiagoJourneyPhotoGrid.vue'
</script>

<template>
  <section class="santiago-journey-section">
    <div class="container">
      <SantiagoJourneyPhotoGrid />
      <div class="centered">
        <p class="santiago-journey-section__caption type__footnote paragraph-spacing">
          {{ $t('santiagoJourney.imageCaption') }}
        </p>
        <p class="type__section-paragraph paragraph-spacing">
          {{ $t('santiagoJourney.paragraph') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.santiago-journey-section__caption {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.santiago-journey-section__caption::before {
  content: '';
  flex-shrink: 0;
  width: 2rem;
  min-width: 2rem;
  height: 2px;
  background: var(--color-orange);
}
</style>
