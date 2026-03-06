<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SoundPlayer from '@/components/tools/SoundPlayer.vue'
import audioDonManuel from '@/assets/audio/audio_don_manuel.mp4'
import chaptersDonManuel from '@/assets/audio-refs/Horodatage-Audio-DonManuel.json'
import donManuelImage from '@/assets/audio-photos/pastille-photo-don-manuel.webp'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }, { el: player, direction: 'down', delay: 0.08 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'trace-route-section', 'section--full-viewport']" data-block data-component="TraceRouteSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('traceRoute.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('traceRoute.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('traceRoute.paragraph2')"></p>
          </div>
          <div class="trace-route-section__player-wrap mt-4 mb-5">
            <SoundPlayer :src="audioDonManuel" :image="donManuelImage" :chapters="chaptersDonManuel">
              <span class="trace-route-section__player-line1">{{ $t('traceRoute.soundPlayerText') }}</span>
              <span class="trace-route-section__player-line2">{{ $t('traceRoute.soundPlayerSubtitle') }}</span>
            </SoundPlayer>
          </div>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('traceRoute.paragraph3')"></p>
        </div>
      </div>
    </div>
</section>
</template>

<style scoped>
.trace-route-section {
  overflow-x: hidden;
}

.trace-route-section__player-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.trace-route-section__player-wrap :deep(.sound-player__text) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
}

.trace-route-section__player-wrap :deep(.trace-route-section__player-line2) {
  font-size: 0.875em;
  font-weight: var(--font-weight-normal);
}
</style>
