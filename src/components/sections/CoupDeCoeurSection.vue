<script setup lang="ts">
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioSabela from '@/assets/audio/audio_sabela.mp3'
import chaptersSabela from '@/assets/audio-refs/Horodatage-Audio-Sabela.json'
import sabelaImage from '@/assets/audio-photos/pastille-photo-sabela.webp'

defineProps<{ sectionIndex: number }>()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }, { el: player, direction: 'down', delay: 0.08 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section :class="['section', `section-${sectionIndex}`, 'coup-de-coeur-section', 'section--full-viewport']" data-block data-component="CoupDeCoeurSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('coupDeCoeur.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('coupDeCoeur.paragraph1')"></p>
            <div>
              <SoundPlayer :src="audioSabela" :text="$t('coupDeCoeur.soundPlayerText')" :image="sabelaImage"
                :chapters="chaptersSabela" class="align-center paragraph-spacing" />
            </div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('coupDeCoeur.quote')"></p>
          </div>
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
