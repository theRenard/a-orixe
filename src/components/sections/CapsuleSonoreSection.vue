<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioForetOiseaux from '@/assets/audio/audio_foret_oiseaux.mp3'
import capsuleSonoreImage from '@/assets/photos/13_florence_antunes.webp'
</script>

<template>
<section class="capsule-sonore-section">
  <div class="container">
    <ImageCrop width="100%" height="600px" position="center 50%">
      <img :src="capsuleSonoreImage" :alt="$t('capsuleSonore.imageCaption')" class="capsule-sonore-section__image mt-3"
        loading="lazy">
    </ImageCrop>
    <div class="centered">
      <div class="capsule-sonore-section__player-wrap mt-3 mb-3">
        <SoundPlayer :src="audioForetOiseaux" :text="$t('capsuleSonore.soundPlayerText')" :image="capsuleSonoreImage" />
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
