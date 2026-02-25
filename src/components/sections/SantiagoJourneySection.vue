<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioAdrian from '@/assets/audio/audio_adrian.mp3'
import chaptersAdrian from '@/assets/audio-refs/Horodatage-Audio-Adrian.json'
import adrianImage from '@/assets/audio-photos/pastille-photo-adrian.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const player = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: player, direction: 'right', delay: 0 },
  ],
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="SantiagoJourneySection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="santiago-journey-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoJourney.paragraph')"></p>
          <div ref="player">
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
