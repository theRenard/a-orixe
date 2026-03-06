<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const image = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value || !image.value) return
  useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
      { el: image, from: { y: -80, opacity: 0, scale: 0.7 }, to: { y: 0, opacity: 1, scale: 1, delay: 0.08, duration: 3, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }, { el: image, direction: 'down', delay: 0.08, scale: 0.7 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot"
  :class="['section', `section-${sectionIndex}`, 'etapes-cles-section', 'section--full-viewport']" id="etapes-cles"
  data-block data-component="EtapesClesSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('etapesCles.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('etapesCles.paragraph')"></p>
        </div>
        <img ref="image" class="ma mb-2" src="../../assets/illustrations/saint_jacques_ok.webp"
          :alt="$t('etapesCles.title')" :class="{ 'paragraph-spacing': isMobile }" loading="lazy"
          style="width: calc(50vw * var(--scale-xlarge));">
      </div>
    </div>
</section>
</template>
