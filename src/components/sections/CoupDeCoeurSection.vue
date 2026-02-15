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
        <div class="coup-de-coeur-section__row mt-3">
          <p class="type__section-paragraph coup-de-coeur-section__quote paragraph-spacing">
            {{ $t('coupDeCoeur.quote') }}
          </p>
          <SoundPlayer
            :src="audioSabela"
            :text="$t('coupDeCoeur.soundPlayerText')"
            class="coup-de-coeur-section__player"
          />
        </div>
        <p class="type__section-paragraph paragraph-spacing">
          {{ $t('coupDeCoeur.paragraph2') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.coup-de-coeur-section__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1.5rem;
}

.coup-de-coeur-section__quote {
  flex: 1;
  min-width: 0;
  font-style: italic;
}

.coup-de-coeur-section__player {
  flex-shrink: 0;
}
</style>
