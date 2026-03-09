<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import pronunciationMp3 from '@/assets/audio/audio_prononciation_a_orixe.mp3'
import pronunciationImage from '@/assets/audio-photos/pastille-photo-saturio.webp'
import { useAnimation } from '@/composables/useAnimation'


const sectionRoot = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)
const player = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: question, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, ease: 'power3.out' } },
      { el: player, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, delay: 0.1, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot"
  :class="['section', 'association-section', 'section--full-viewport']" data-block
  data-component="AssociationSection">
  <div class="section-inner" data-block-inner>
    <div class="container">
      <div class="centered">
        <div>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('association.paragraph1')"></p>
          <p ref="question" class="type__question paragraph-spacing" v-html="$t('association.blockquote')"></p>
        </div>
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('association.paragraph2')"></p>
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('association.paragraph3')"></p>
        <div ref="player">
          <SoundPlayer :src="pronunciationMp3" :text="$t('association.soundPlayerText')" :image="pronunciationImage"
            class="paragraph-spacing align-center" />
        </div>
      </div>
    </div>
  </div>
</section>
</template>

