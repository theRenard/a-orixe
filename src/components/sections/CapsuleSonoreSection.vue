<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioForetOiseaux from '@/assets/audio/audio_foret_oiseaux.mp3'
import capsuleSonoreImage from '@/assets/photos/13_florence_antunes.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
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
<section ref="sectionRoot" :class="['section', 'capsule-sonore-section']" data-block data-component="CapsuleSonoreSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div>
          <ImageCrop :width="isMobile ? '100%' : '70rem'" :height="isMobile ? '70rem' : '50rem'" position="center 50%">
            <img :src="capsuleSonoreImage" :alt="$t('capsuleSonore.imageCaption')" class="capsule-sonore-section__image"
              loading="lazy">
          </ImageCrop>
        </div>
        <div class="centered">
          <div class="capsule-sonore-section__player-wrap mt-3 mb-3">
            <SoundPlayer :src="audioForetOiseaux" :text="$t('capsuleSonore.soundPlayerText')"
              :image="capsuleSonoreImage" />
          </div>
        </div>
      </div>
    </div>
</section>
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
