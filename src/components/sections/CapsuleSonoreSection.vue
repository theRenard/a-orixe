<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioForetOiseaux from '@/assets/audio/audio_foret_oiseaux.mp3'
</script>

<template>
  <section class="capsule-sonore-section">
    <div class="container">
      <div class="centered">
        <ImageCrop width="100%" height="340px" position="center 50%">
          <img
            src="../../assets/photos/13_florence_antunes.webp"
            :alt="$t('capsuleSonore.imageCaption')"
            class="capsule-sonore-section__image"
            loading="lazy"
          >
        </ImageCrop>
        <div class="capsule-sonore-section__player-wrap mt-3 mb-5">
          <SoundPlayer
            :src="audioForetOiseaux"
            :text="$t('capsuleSonore.soundPlayerText')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
