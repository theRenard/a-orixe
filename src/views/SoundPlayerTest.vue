<script setup lang="ts">
/**
 * Test page for SoundPlayer: all usages from Association, Trace Route, Capsule Sonore, Coup de Cœur.
 */
import { RouterLink } from 'vue-router'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import pronunciationMp3 from '@/assets/audio/audio_prononciation_a_orixe.mp3'
import pronunciationImage from '@/assets/audio-photos/pastille-photo-saturio.jpg'
import audioDonManuel from '@/assets/audio/audio_don_manuel.mp3'
import audioForetOiseaux from '@/assets/audio/audio_foret_oiseaux.mp3'
import audioSabela from '@/assets/audio/audio_sabela.mp3'
</script>

<template>
  <main class="sound-player-test-page">
    <header class="sound-player-test-page__header">
      <h1 class="sound-player-test-page__title type__section-title">SoundPlayer test</h1>
      <p class="sound-player-test-page__subtitle">
        All <code>SoundPlayer</code> instances used across the site — for visual and playback testing.
      </p>
      <RouterLink to="/" class="sound-player-test-page__back type__credits-link">← Back to site</RouterLink>
    </header>

    <div class="sound-player-test-page__list">
      <article class="sound-player-test-page__card">
        <h2 class="sound-player-test-page__card-title">Association (pronunciation + image)</h2>
        <p class="sound-player-test-page__card-desc">
          <code>:src</code> + <code>:text</code> + <code>:image</code> (pastille Saturio)
        </p>
        <div class="sound-player-test-page__player-wrap">
          <SoundPlayer
            :src="pronunciationMp3"
            :text="$t('association.soundPlayerText')"
            :image="pronunciationImage"
          />
        </div>
      </article>

      <article class="sound-player-test-page__card">
        <h2 class="sound-player-test-page__card-title">Trace route (Don Manuel, slot with 2 lines)</h2>
        <p class="sound-player-test-page__card-desc">
          <code>:src</code> + default slot (line1 + line2)
        </p>
        <div class="sound-player-test-page__player-wrap sound-player-test-page__player-wrap--centered">
          <SoundPlayer :src="audioDonManuel">
            <span class="sound-player-test-page__line1">{{ $t('traceRoute.soundPlayerText') }}</span>
            <span class="sound-player-test-page__line2">{{ $t('traceRoute.soundPlayerSubtitle') }}</span>
          </SoundPlayer>
        </div>
      </article>

      <article class="sound-player-test-page__card">
        <h2 class="sound-player-test-page__card-title">Capsule sonore (forêt / oiseaux)</h2>
        <p class="sound-player-test-page__card-desc">
          <code>:src</code> + <code>:text</code> only
        </p>
        <div class="sound-player-test-page__player-wrap">
          <SoundPlayer :src="audioForetOiseaux" :text="$t('capsuleSonore.soundPlayerText')" />
        </div>
      </article>

      <article class="sound-player-test-page__card">
        <h2 class="sound-player-test-page__card-title">Coup de cœur (Sabela)</h2>
        <p class="sound-player-test-page__card-desc">
          <code>:src</code> + <code>:text</code> only
        </p>
        <div class="sound-player-test-page__player-wrap">
          <SoundPlayer :src="audioSabela" :text="$t('coupDeCoeur.soundPlayerText')" />
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.sound-player-test-page {
  padding: 2rem 1.5rem;
  max-width: 56rem;
  margin: 0 auto;
}

.sound-player-test-page__header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-teal-light, #a2cfcd);
}

.sound-player-test-page__title {
  margin: 0 0 0.5rem;
}

.sound-player-test-page__subtitle {
  font-family: var(--font-family-ubuntu);
  font-size: var(--font-size-sm);
  color: var(--color-gray);
  margin: 0 0 1rem;
}

.sound-player-test-page__subtitle code {
  background: var(--color-tan, #f5dfbb);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.sound-player-test-page__back {
  text-decoration: none;
}

.sound-player-test-page__back:hover {
  text-decoration: underline;
}

.sound-player-test-page__list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sound-player-test-page__card {
  background: var(--color-cream, #fffdfa);
  border: 1px solid var(--color-teal-light, #a2cfcd);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
}

.sound-player-test-page__card-title {
  font-family: var(--font-family-fraunces);
  font-size: 1.25rem;
  color: var(--color-teal-dark, #2d4b4b);
  margin: 0 0 0.5rem;
}

.sound-player-test-page__card-desc {
  font-family: var(--font-family-ubuntu);
  font-size: var(--font-size-sm);
  color: var(--color-gray);
  margin: 0 0 1rem;
}

.sound-player-test-page__card-desc code {
  background: var(--color-blue-tint, #f8fbff);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.sound-player-test-page__player-wrap {
  margin-top: 0.5rem;
}

.sound-player-test-page__player-wrap--centered {
  display: flex;
  justify-content: center;
}

.sound-player-test-page__player-wrap :deep(.sound-player__text) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
}

.sound-player-test-page__line2 {
  font-size: 0.875em;
  font-weight: var(--font-weight-normal);
}
</style>
