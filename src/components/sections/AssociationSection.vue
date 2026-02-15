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
      <div class="association-section__row mt-3">
        <p class="type__section-paragraph association-section__paragraph paragraph-spacing">
          {{ $t('association.paragraph2') }}
        </p>
        <SoundPlayer
          :src="pronunciationMp3"
          :text="$t('association.soundPlayerText')"
          class="association-section__player" />
      </div>
      <p class="type__section-paragraph paragraph-spacing">
        {{ $t('association.paragraph3') }}
      </p>
    </div>
  </div>
</section>
</template>

<style scoped>
.association-section__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1.5rem;
}

.association-section__paragraph {
  flex: 1;
  min-width: 0;
}

.association-section__player {
  flex-shrink: 0;
}
</style>
