<script setup lang="ts">
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioSabela from '@/assets/audio/audio_sabela.mp3'
</script>

<template>
<section class="coup-de-coeur-section">
  <div class="container">
    <div class="centered">
      <h2 class="type__section-title type__section-title--with-line heading-spacing">
        {{ $t('coupDeCoeur.title') }}
      </h2>
      <p class="type__section-paragraph paragraph-spacing">
        {{ $t('coupDeCoeur.paragraph1') }}
      </p>
    </div>
    <div class="centered--large">
      <div class="row-two-col paragraph-spacing">
        <p class="type__section-paragraph--italic col-left">
          {{ $t('coupDeCoeur.quote') }}
        </p>
        <SoundPlayer :src="audioSabela" :text="$t('coupDeCoeur.soundPlayerText')" class="col-right" />
      </div>
    </div>
    <div class="centered">
      <p class="type__section-paragraph paragraph-spacing">
        {{ $t('coupDeCoeur.paragraph2') }}
      </p>
    </div>
  </div>
</section>
</template>
