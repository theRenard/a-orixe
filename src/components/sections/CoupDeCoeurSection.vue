<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioSabela from '@/assets/audio/audio_sabela.mp3'
import chaptersSabela from '@/assets/audio-refs/Horodatage-Audio-Sabela.json'
import sabelaImage from '@/assets/audio-photos/pastille-photo-sabela.webp'
import { useAnimation } from '@/composables/useAnimation'


const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const player = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
      { el: player, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, delay: 0.08, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'coup-de-coeur-section', 'section--full-viewport']" data-block data-component="CoupDeCoeurSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('coupDeCoeur.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('coupDeCoeur.paragraph1')"></p>
            <div ref="player">
              <SoundPlayer :src="audioSabela" :text="$t('coupDeCoeur.soundPlayerText')" :image="sabelaImage"
                :chapters="chaptersSabela" class="align-center paragraph-spacing" />
            </div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('coupDeCoeur.quote')"></p>
          </div>
        </div>
      </div>
    </div>
</section>
</template>

<style scoped>
.coup-de-coeur-section {
  overflow-x: hidden;
}
</style>
