<script setup lang="ts">
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import pronunciationMp3 from '@/assets/audio/audio_prononciation_a_orixe.mp3'
import pronunciationImage from '@/assets/audio-photos/pastille-photo-saturio.webp'

defineProps<{ sectionIndex: number }>()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: question, direction: 'down', delay: 0 }, { el: player, direction: 'down', delay: 0.1 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section :class="['section', `section-${sectionIndex}`, 'association-section', 'section--full-viewport']" data-block data-component="AssociationSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('association.paragraph1')"></p>
            <p class="type__question paragraph-spacing" v-html="$t('association.blockquote')"></p>
          </div>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('association.paragraph2')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('association.paragraph3')"></p>
          <div>
            <SoundPlayer :src="pronunciationMp3" :text="$t('association.soundPlayerText')" :image="pronunciationImage"
              class="paragraph-spacing align-center" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.association-section {
  overflow-x: hidden;
}
</style>
