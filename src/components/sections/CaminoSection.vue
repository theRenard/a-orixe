<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimation } from '@/composables/useAnimation'


const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      {
        el: title,
        from: { x: -80, opacity: 0 },
        to: { x: 0, opacity: 1, ease: 'power3.out' },
      },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }]
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'camino-section', 'section--full-viewport']" data-block
  data-component="CaminoSection">
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
</section>
</template>
