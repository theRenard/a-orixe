<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioForetOiseaux from '@/assets/audio/audio_foret_oiseaux.mp3'
import capsuleSonoreImage from '@/assets/photos/13_florence_antunes.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const imageBlock = ref<HTMLElement | null>(null)
const playerBlock = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: imageBlock, direction: 'left', delay: 0 },
    { el: playerBlock, direction: 'right', delay: 0.1 },
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
<div data-block data-component="CapsuleSonoreSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="capsule-sonore-section">
  <div class="container">
    <div ref="imageBlock">
      <ImageCrop width="100%" height="600px" position="center 50%">
        <img :src="capsuleSonoreImage" :alt="$t('capsuleSonore.imageCaption')" class="capsule-sonore-section__image mt-3"
          loading="lazy">
      </ImageCrop>
    </div>
    <div ref="playerBlock" class="centered">
      <div class="capsule-sonore-section__player-wrap mt-3 mb-3">
        <SoundPlayer :src="audioForetOiseaux" :text="$t('capsuleSonore.soundPlayerText')" :image="capsuleSonoreImage" />
      </div>
    </div>
  </div>
</section>
  </div>
</div>
</template>

<style scoped>
.capsule-sonore-section {
  overflow-x: hidden;
}

.capsule-sonore-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}

.capsule-sonore-section__player-wrap {
  display: flex;
  justify-content: center;
}
</style>
