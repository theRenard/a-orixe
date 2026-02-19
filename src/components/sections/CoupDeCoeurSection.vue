<script setup lang="ts">
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioSabela from '@/assets/audio/audio_sabela.mp3'
import chaptersSabela from '@/assets/audio-refs/Horodatage-Audio-Sabela.json'
import sabelaImage from '@/assets/audio-photos/pastille-photo-sabela.webp'
</script>

<template>
<section class="coup-de-coeur-section">
  <div class="container">
    <div class="centered">
      <h2 class="type__section-title type__section-title--with-line heading-spacing">
        {{ $t('coupDeCoeur.title') }}
      </h2>
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('coupDeCoeur.paragraph1')"></p>
      <p class="type__section-paragraph col-left" v-html="$t('coupDeCoeur.quote')"></p>
      <SoundPlayer :src="audioSabela" :text="$t('coupDeCoeur.soundPlayerText')" :image="sabelaImage"
        :chapters="chaptersSabela" class="align-center paragraph-spacing" />
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('coupDeCoeur.paragraph2')"></p>
    </div>
  </div>
</section>
</template>
