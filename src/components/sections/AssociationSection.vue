<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import pronunciationMp3 from '@/assets/audio/audio_prononciation_a_orixe.mp3'
import pronunciationImage from '@/assets/audio-photos/pastille-photo-saturio.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const block1 = ref<HTMLElement | null>(null)
const block2 = ref<HTMLElement | null>(null)
const block3 = ref<HTMLElement | null>(null)
const player = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: block1, direction: 'left', delay: 0 },
    { el: block2, direction: 'right', delay: 0.1 },
    { el: block3, direction: 'left', delay: 0.2 },
    { el: player, direction: 'right', delay: 0.3 },
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
<div data-block class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="association-section">
  <div class="container">
    <div class="centered">
      <div ref="block1">
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('association.paragraph1')"></p>
        <p class="type__question paragraph-spacing" v-html="$t('association.blockquote')"></p>
      </div>
      <p ref="block2" class="type__section-paragraph col-left" v-html="$t('association.paragraph2')"></p>
      <p ref="block3" class="type__section-paragraph paragraph-spacing" v-html="$t('association.paragraph3')"></p>
      <div ref="player">
        <SoundPlayer :src="pronunciationMp3" :text="$t('association.soundPlayerText')" :image="pronunciationImage"
          class="paragraph-spacing align-center" />
      </div>
    </div>
  </div>
</section>
  </div>
</div>
</template>

<style scoped>
.association-section {
  overflow-x: hidden;
}
</style>
