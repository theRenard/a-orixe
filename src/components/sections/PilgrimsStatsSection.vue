<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PilgrimsHorizontalChart from '@/components/tools/PilgrimsHorizontalChart.vue'
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
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
  Note: PilgrimsHorizontalChart has its own ScrollTrigger timeline (trigger chart, start 'top 80%', once: true).
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'pilgrims-stats-section', 'section--full-viewport']" data-block data-component="PilgrimsStatsSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('pilgrimsStats.title') }}
          </h2>
          <div>
            <PilgrimsHorizontalChart class="pilgrims-stats-section__chart mt-4 align-center" />
          </div>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('pilgrimsStats.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('pilgrimsStats.paragraph2')"></p>
          </div>
        </div>
      </div>
    </div>
</section>
</template>

<style scoped>
.pilgrims-stats-section {
  overflow-x: hidden;
}

.pilgrims-stats-section__chart {
  display: block;
}
</style>
