<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioAdrian from '@/assets/audio/audio_adrian.mp3'
import chaptersAdrian from '@/assets/audio-refs/Horodatage-Audio-Adrian.json'
import adrianImage from '@/assets/audio-photos/pastille-photo-adrian.webp'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()

const sectionRoot = ref<HTMLElement | null>(null)
let cleanup: (() => void) | undefined

onMounted(() => {
  if (!sectionRoot.value) return
  cleanup = useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
    ],
  })
})
onUnmounted(() => cleanup?.())
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: player, direction: 'down', delay: 0 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'santiago-journey-section', 'section--full-viewport']" data-block data-component="SantiagoJourneySection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('santiagoJourney.paragraph')"></p>
          <div>
            <SoundPlayer :src="audioAdrian" :text="$t('santiagoJourney.soundPlayerQuote')" :image="adrianImage"
              :chapters="chaptersAdrian" class="paragraph-spacing align-center" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.santiago-journey-section {
  overflow-x: hidden;
}
</style>
