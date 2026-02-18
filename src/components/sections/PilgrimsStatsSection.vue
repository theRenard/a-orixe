<script setup lang="ts">
import PilgrimsHorizontalChart from '@/components/tools/PilgrimsHorizontalChart.vue'
</script>

<template>
<section class="pilgrims-stats-section">
  <div class="container">
    <div class="centered">
      <h2 class="type__section-title type__section-title--with-line heading-spacing">
        {{ $t('pilgrimsStats.title') }}
      </h2>
      <PilgrimsHorizontalChart class="pilgrims-stats-section__chart mt-4 align-center" />
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('pilgrimsStats.paragraph1')"></p>
      <p class="type__section-paragraph paragraph-spacing" v-html="$t('pilgrimsStats.paragraph2')"></p>
    </div>
  </div>
</section>
</template>

<style scoped>
.pilgrims-stats-section__chart {
  display: block;
}
</style>
