<script setup lang="ts">
import PilgrimsHorizontalChart from '@/components/tools/PilgrimsHorizontalChart.vue'
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
<div data-block data-component="PilgrimsStatsSection" class="block">
  <div data-block-inner class="block-inner">
    <section class="pilgrims-stats-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
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
