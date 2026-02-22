<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

/** One chapter: start time (MM:SS) and corresponding text (e.g. from Horodatage-Audio-*.json). */
export interface SoundPlayerChapter {
  timestamp: string
  text: string
}

const props = withDefaults(
  defineProps<{
    src: string
    text?: string
    subtitle?: string
    /** Image URL or imported asset for the circular portrait on the left */
    image?: string
    /** Optional timestamped chapters/transcript (e.g. from Horodatage-Audio-*.json). */
    chapters?: SoundPlayerChapter[]
  }>(),
  { text: '', subtitle: '', image: '', chapters: () => [] }
)

const { locale } = useI18n()
const isPlaying = ref(false)
/** Index of the chapter to show in the transcript strip; 0 when no chapters or not playing. */
const currentChapterIndex = ref(0)
let audio: HTMLAudioElement | null = null

const hasChapters = computed(() => (props.chapters?.length ?? 0) > 0)
/** Transcription (chapter strip) is disabled for Spanish. */
const transcriptionActive = computed(() => hasChapters.value && locale.value !== 'es')
const currentChapterText = computed(() =>
  hasChapters.value && props.chapters
    ? props.chapters[currentChapterIndex.value]?.text ?? ''
    : ''
)

/** Parse "MM:SS" to seconds. */
function timestampToSeconds(ts: string): number {
  const [m, s] = ts.trim().split(':').map(Number)
  return (m ?? 0) * 60 + (s ?? 0)
}

function ensureAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(props.src)
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
    if (transcriptionActive.value) {
      audio.addEventListener('timeupdate', updateChapterFromTime)
    }
  }
  return audio
}

function updateChapterFromTime() {
  if (!audio || !props.chapters?.length) return
  const t = audio.currentTime
  let index = 0
  for (let i = props.chapters.length - 1; i >= 0; i--) {
    const ch = props.chapters[i]
    if (ch && timestampToSeconds(ch.timestamp) <= t) {
      index = i
      break
    }
  }
  currentChapterIndex.value = index
}

async function toggle() {
  const a = ensureAudio()
  if (isPlaying.value) {
    a.pause()
    a.currentTime = 0
    isPlaying.value = false
    currentChapterIndex.value = 0
  } else {
    try {
      await a.play()
      isPlaying.value = true
      if (transcriptionActive.value) updateChapterFromTime()
    } catch (err) {
      // Often: NotAllowedError = browser autoplay policy (no user gesture or site not allowed)
      console.error('[SoundPlayer] play() failed:', err)
    }
  }
}

onUnmounted(() => {
  if (audio) {
    if (props.chapters?.length) {
      audio.removeEventListener('timeupdate', updateChapterFromTime)
    }
    audio.pause()
    audio = null
  }
})
</script>

<template>
<div class="sound-player-widget">
  <button type="button" class="sound-player" :class="{ 'sound-player--with-image': image }"
    :aria-label="isPlaying ? $t('soundPlayer.stopLabel') : $t('soundPlayer.playLabel')" :aria-pressed="isPlaying"
    @click="toggle">
    <span class="sound-player__icon" aria-hidden="true">
      <svg v-if="!isPlaying" class="sound-player__svg sound-player__svg--play" viewBox="0 0 24 24" fill="currentColor"
        aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
      <svg v-else class="sound-player__svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6 6h12v12H6z" />
      </svg>
    </span>
    <span class="sound-player__text">
      <template v-if="text">
        <span class="sound-player__line1" v-html="text"></span>
        <span v-if="subtitle" class="sound-player__line2" v-html="subtitle"></span>
      </template>
      <slot v-else />
    </span>
    <span v-if="image" class="sound-player__image-wrap" aria-hidden="true">
      <img :src="image" alt="" class="sound-player__image" />
    </span>
  </button>
  <div v-if="transcriptionActive && currentChapterText && isPlaying" class="sound-player__transcript" aria-live="polite">

    <span class="sound-player__transcript-chapter" v-html="currentChapterText"></span>
  </div>
</div>
</template>

<style scoped>
.sound-player {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-1);
  background: var(--color-cream);
  border: 0.1875rem solid var(--color-teal-medium);
  border-radius: 3.125rem;
  font-family: var(--font-family-ubuntu);
  font-size: var(--text-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-teal-dark);
  letter-spacing: var(--letter-spacing-normal);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  max-width: 30rem;
  height: calc(var(--fluid-base) * 3.2);
  position: relative;
  z-index: 1;
}

.sound-player:hover {
  background: var(--color-teal-light);
}

.sound-player:focus-visible {
  outline: 0.125rem solid var(--color-teal-medium);
  outline-offset: 0.125rem;
}

.sound-player__image-wrap {
  margin-left: auto;
  width: calc(var(--fluid-base) * 3.2);
  height: calc(var(--fluid-base) * 3.2);
  flex-shrink: 0;
  padding: 0;
  border: 0.1875rem solid var(--color-teal-dark);
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin-right: calc(-1 * (var(--space-1) + 0.1875rem));
}

.sound-player__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sound-player__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--fluid-base) * 2.2);
  height: calc(var(--fluid-base) * 2.2);
  flex-shrink: 0;
  border: 0.1875rem solid var(--color-teal-medium);
  border-radius: 50%;
  background: var(--color-cream);
  color: var(--color-teal-medium);
  position: relative;
}

.sound-player__svg {
  width: calc(var(--fluid-base) * 2);
  height: calc(var(--fluid-base) * 2);
}

.sound-player__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-1);
  line-height: 1.2;
  margin-right: var(--space-1);
  text-align: left;
}

.sound-player__line2 {
  font-size: 0.875em;
  font-weight: var(--font-weight-normal);
}

/* Wrapper when transcript is shown: single rounded card */
.sound-player-widget {
  display: block;
  max-width: 30rem;
  position: relative;
}

.sound-player-widget--with-chapters .sound-player {
  border-radius: 1.25rem 1.25rem 0 0;
  border: none;
  max-width: none;
}

/* Teal transcript strip (green part) */
.sound-player__transcript {
  background: var(--color-teal-medium);
  color: var(--color-white);
  font-family: var(--font-family-ubuntu);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-normal);
  line-height: 1.4;
  padding: var(--space-2) var(--space-3);
  text-align: left;
  border-radius: 3.125rem;
  border-bottom-left-radius: 1.875rem;
  border-bottom-right-radius: 1.875rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
  min-height: calc(var(--fluid-base) * 3.2);
  padding-top: calc(var(--fluid-base) * 3.8);
  padding-bottom: var(--space-2);
}

.sound-player__transcript-chapter {
  /* display: block;
  font-size: var(--text-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-white); */
  display: inline-block;
  /* padding-bottom: var(--space-2); */
}
</style>
