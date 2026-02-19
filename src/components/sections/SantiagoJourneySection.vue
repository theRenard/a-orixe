<script setup lang="ts">
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioAdrian from '@/assets/audio/audio_adrian.mp3'
import chaptersAdrian from '@/assets/audio-refs/Horodatage-Audio-Adrian.json'
import adrianImage from '@/assets/audio-photos/pastille-photo-adrian.webp'
</script>

<template>
<section class="santiago-journey-section">
  <div class="container">
    <div class="centered">
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoJourney.paragraph')"></p>
      <SoundPlayer :src="audioAdrian" :text="$t('santiagoJourney.soundPlayerQuote')" :image="adrianImage"
        :chapters="chaptersAdrian" class="paragraph-spacing align-center" />
    </div>
  </div>
</section>
</template>

<style scoped></style>
