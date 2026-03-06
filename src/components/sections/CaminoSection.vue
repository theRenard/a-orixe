<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)

let cleanup: (() => void) | undefined

onMounted(() => {
  if (!sectionRoot.value || !title.value) return
  cleanup = useAnimation({
    tweens: [
      {
        el: sectionRoot,
        from: { y: -80, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 5, ease: 'power3.out' },
      },
      {
        el: title,
        from: { x: -80, opacity: 0 },
        to: { x: 0, opacity: 1, duration: 5, ease: 'power3.out' },
      },
    ],
  })
})

onUnmounted(() => {
  cleanup?.()
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }]
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'camino-section', 'section--full-viewport']"
  data-block data-component="CaminoSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <p class="type__hero-synopsis paragraph-spacing" v-html="$t('camino.paragraph')"></p>
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('camino.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('camino.paragraph1')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('camino.paragraph2')"></p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
