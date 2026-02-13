<script setup lang="ts">
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioDonManuel from '@/assets/audio/audio_don_manuel.mp3'
</script>

<template>
  <section class="trace-route-section">
    <div class="container">
      <div class="centered">
        <h2 class="type__section-title type__section-title--with-line mt-5">
          {{ $t('traceRoute.title') }}
        </h2>
        <p class="type__section-paragraph mt-3">
          {{ $t('traceRoute.paragraph1') }}
        </p>
        <p class="type__section-paragraph mt-3">
          {{ $t('traceRoute.paragraph2') }}
        </p>
        <p class="type__section-paragraph mt-3">
          {{ $t('traceRoute.paragraph3') }}
        </p>
        <div class="trace-route-section__player-wrap mt-4 mb-5">
          <SoundPlayer :src="audioDonManuel">
            <span class="trace-route-section__player-line1">{{ $t('traceRoute.soundPlayerText') }}</span>
            <span class="trace-route-section__player-line2">{{ $t('traceRoute.soundPlayerSubtitle') }}</span>
          </SoundPlayer>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trace-route-section__player-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.trace-route-section__player-wrap :deep(.sound-player__text) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.trace-route-section__player-wrap :deep(.trace-route-section__player-line2) {
  font-size: 0.875em;
  font-weight: var(--font-weight-normal);
  color: var(--color-gray);
}
</style>
