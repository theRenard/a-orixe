<script setup lang="ts">
import SantiagoJourneyPhotoGrid from '@/components/sections/SantiagoJourneyPhotoGrid.vue'
</script>

<template>
  <section class="santiago-journey-section">
    <div class="container">
      <SantiagoJourneyPhotoGrid />
      <div class="centered">
        <p class="santiago-journey-section__caption type__image-caption type__image-caption--with-line paragraph-spacing">
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
</style>
