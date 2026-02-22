<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioSabela from '@/assets/audio/audio_sabela.mp3'
import chaptersSabela from '@/assets/audio-refs/Horodatage-Audio-Sabela.json'
import sabelaImage from '@/assets/audio-photos/pastille-photo-sabela.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const block1 = ref<HTMLElement | null>(null)
const player = ref<HTMLElement | null>(null)
const block2 = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: title, direction: 'left', delay: 0 },
    { el: block1, direction: 'right', delay: 0.08 },
    { el: player, direction: 'left', delay: 0.18 },
    { el: block2, direction: 'right', delay: 0.26 },
  ],
  duration: 0.6,
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
<section ref="sectionRoot" class="coup-de-coeur-section">
  <div class="container">
    <div class="centered">
      <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
        {{ $t('coupDeCoeur.title') }}
      </h2>
      <div ref="block1">
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('coupDeCoeur.paragraph1')"></p>
        <p class="type__section-paragraph col-left" v-html="$t('coupDeCoeur.quote')"></p>
      </div>
      <div ref="player">
        <SoundPlayer :src="audioSabela" :text="$t('coupDeCoeur.soundPlayerText')" :image="sabelaImage"
          :chapters="chaptersSabela" class="align-center paragraph-spacing" />
      </div>
      <p ref="block2" class="type__section-paragraph paragraph-spacing" v-html="$t('coupDeCoeur.paragraph2')"></p>
    </div>
  </div>
</section>
</template>

<style scoped>
.coup-de-coeur-section {
  overflow-x: hidden;
}
</style>
