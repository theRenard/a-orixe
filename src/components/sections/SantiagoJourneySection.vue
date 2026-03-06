<script setup lang="ts">
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioAdrian from '@/assets/audio/audio_adrian.mp3'
import chaptersAdrian from '@/assets/audio-refs/Horodatage-Audio-Adrian.json'
import adrianImage from '@/assets/audio-photos/pastille-photo-adrian.webp'
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: player, direction: 'down', delay: 0 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="SantiagoJourneySection" class="block">
  <div data-block-inner class="block-inner">
    <section class="santiago-journey-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoJourney.paragraph')"></p>
          <div>
            <SoundPlayer :src="audioAdrian" :text="$t('santiagoJourney.soundPlayerQuote')" :image="adrianImage"
              :chapters="chaptersAdrian" class="paragraph-spacing align-center" />
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.santiago-journey-section {
  overflow-x: hidden;
}
</style>
