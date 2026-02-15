<script setup lang="ts">
import PilgrimsChart from '@/components/tools/PilgrimsChart.vue'
</script>

<template>
  <section class="pilgrims-stats-section">
    <div class="container">
      <div class="centered">
        <h2 class="type__section-title type__section-title--with-line heading-spacing">
          {{ $t('pilgrimsStats.title') }}
        </h2>
        <PilgrimsChart class="pilgrims-stats-section__chart mt-4" />
        <p class="type__section-paragraph paragraph-spacing">
          {{ $t('pilgrimsStats.paragraph1') }}
        </p>
        <p class="type__section-paragraph paragraph-spacing">
          {{ $t('pilgrimsStats.paragraph2') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pilgrims-stats-section__chart {
  display: block;
}
</style>
