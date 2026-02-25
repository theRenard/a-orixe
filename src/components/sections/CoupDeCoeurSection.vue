<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioSabela from '@/assets/audio/audio_sabela.mp3'
import chaptersSabela from '@/assets/audio-refs/Horodatage-Audio-Sabela.json'
import sabelaImage from '@/assets/audio-photos/pastille-photo-sabela.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const player = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: title, direction: 'left', delay: 0 },
    { el: player, direction: 'left', delay: 0.08 },
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
<div data-block data-component="CoupDeCoeurSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="coup-de-coeur-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('coupDeCoeur.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('coupDeCoeur.paragraph1')"></p>
            <p class="type__section-paragraph col-left" v-html="$t('coupDeCoeur.quote')"></p>
          </div>
          <div ref="player">
            <SoundPlayer :src="audioSabela" :text="$t('coupDeCoeur.soundPlayerText')" :image="sabelaImage"
              :chapters="chaptersSabela" class="align-center paragraph-spacing" />
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.coup-de-coeur-section {
  overflow-x: hidden;
}
</style>
