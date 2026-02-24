<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import PilgrimsHorizontalChart from '@/components/tools/PilgrimsHorizontalChart.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const chart = ref<HTMLElement | null>(null)
const textBlock = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    // { el: title, direction: 'left', delay: 0 },
    // { el: chart, direction: 'right', delay: 0.1 },
    // { el: textBlock, direction: 'left', delay: 0.2 },
  ],
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="PilgrimsStatsSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="pilgrims-stats-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('pilgrimsStats.title') }}
          </h2>
          <div ref="chart">
            <PilgrimsHorizontalChart class="pilgrims-stats-section__chart mt-4 align-center" />
          </div>
          <div ref="textBlock">
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('pilgrimsStats.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('pilgrimsStats.paragraph2')"></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.pilgrims-stats-section {
  overflow-x: hidden;
}

.pilgrims-stats-section__chart {
  display: block;
}
</style>
