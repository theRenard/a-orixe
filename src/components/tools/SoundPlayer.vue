<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    text?: string
  }>(),
  { text: '' }
)

const isPlaying = ref(false)
let audio: HTMLAudioElement | null = null

function ensureAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(props.src)
    // Debug: confirm URL and load/error
    console.log('[SoundPlayer] src URL:', props.src)
    audio.addEventListener('ended', () => {
      isPlaying.value = false
    })
    audio.addEventListener('canplay', () => {
      console.log('[SoundPlayer] canplay — audio ready')
    })
    audio.addEventListener('error', (e) => {
      console.error('[SoundPlayer] load/play error:', e, 'code:', audio?.error?.code, 'message:', audio?.error?.message)
    })
  }
  return audio
}

async function toggle() {
  const a = ensureAudio()
  if (isPlaying.value) {
    a.pause()
    a.currentTime = 0
    isPlaying.value = false
  } else {
    try {
      await a.play()
      isPlaying.value = true
    } catch (err) {
      // Often: NotAllowedError = browser autoplay policy (no user gesture or site not allowed)
      console.error('[SoundPlayer] play() failed:', err)
    }
  }
}

onUnmounted(() => {
  if (audio) {
    audio.pause()
    audio = null
  }
})
</script>

<template><button type="button" class="sound-player"
  :aria-label="isPlaying ? $t('soundPlayer.stopLabel') : $t('soundPlayer.playLabel')" :aria-pressed="isPlaying"
  @click="toggle">
  <span class="sound-player__icon" aria-hidden="true">
    <!-- Play: right-pointing triangle -->
    <svg v-if="!isPlaying" class="sound-player__svg sound-player__svg--play" viewBox="0 0 24 24" fill="currentColor"
      aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
    <!-- Stop: square -->
    <svg v-else class="sound-player__svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 6h12v12H6z" />
    </svg>
  </span>
  <span class="sound-player__text">
    <template v-if="text">{{ text }}</template>
    <slot v-else />
  </span>
</button></template>

<style scoped>
.sound-player {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem .5rem;
  background: var(--color-cream);
  border: 3px solid var(--color-teal-medium);
  border-radius: 9999px;
  font-family: var(--font-family-ubuntu);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-blue-dark);
  letter-spacing: var(--letter-spacing-normal);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.sound-player:hover {
  background: var(--color-tan);
}

.sound-player:focus-visible {
  outline: 2px solid var(--color-teal-medium);
  outline-offset: 2px;
}

.sound-player__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  flex-shrink: 0;
  border: 3px solid var(--color-teal-medium);
  border-radius: 50%;
  background: var(--color-cream);
  color: var(--color-teal-medium);
}

.sound-player__svg {
  width: 3.16rem;
  height: 3.16rem;
}

.sound-player__svg--play {
  margin-left: 3px;
}

.sound-player__text {
  line-height: 1.2;
  margin-right: 1rem;
}
</style>
