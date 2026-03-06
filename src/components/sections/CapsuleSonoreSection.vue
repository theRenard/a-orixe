<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioForetOiseaux from '@/assets/audio/audio_foret_oiseaux.mp3'
import capsuleSonoreImage from '@/assets/photos/13_florence_antunes.webp'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
let cleanup: (() => void) | undefined

onMounted(() => {
  if (!sectionRoot.value) return
  cleanup = useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
    ],
  })
})
onUnmounted(() => cleanup?.())
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: imageBlock, direction: 'up', delay: 0, scale: 3, duration: 4, transformOrigin: 'bottom center' }, { el: playerBlock, direction: 'down', delay: 0.1 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'capsule-sonore-section']" data-block data-component="CapsuleSonoreSection">
  <div class="section-content">
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
