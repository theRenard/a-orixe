<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import pronunciationMp3 from '@/assets/audio/audio_prononciation_a_orixe.mp3'
import pronunciationImage from '@/assets/audio-photos/pastille-photo-saturio.webp'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()

const sectionRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: question, direction: 'down', delay: 0 }, { el: player, direction: 'down', delay: 0.1 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot"
  :class="['section', `section-${sectionIndex}`, 'association-section', 'section--full-viewport']" data-block
  data-component="AssociationSection">
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
</section>
</template>

<style scoped>
.association-section {
  overflow-x: hidden;
}
</style>
