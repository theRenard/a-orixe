<script setup lang="ts">
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import pronunciationMp3 from '@/assets/audio/audio_prononciation_a_orixe.mp3'
</script>

<template>
<section class="association-section">
  <div class="container">
    <div class="centered">
      <p class="type__section-paragraph paragraph-spacing">
        {{ $t('association.paragraph1') }}
      </p>
      <p class="type__question paragraph-spacing">
        {{ $t('association.blockquote') }}
      </p>
    </div>
    <div class="centered--large">
      <div class="row-two-col paragraph-spacing">
        <p class="type__section-paragraph col-left">
          {{ $t('association.paragraph2') }}
        </p>
        <SoundPlayer :src="pronunciationMp3" :text="$t('association.soundPlayerText')"
          class="col-right" />
      </div>
      <p class="type__section-paragraph paragraph-spacing">
        {{ $t('association.paragraph3') }}
      </p>
    </div>
  </div>
</section>
</template>

