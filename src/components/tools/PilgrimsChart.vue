<script setup lang="ts">
// Bar heights: 46% → 100%, 19% → ~41%, 0.14% → min height (visible block)
const maxPercent = 46
const barHeights = [
  (46 / maxPercent) * 100,
  (19 / maxPercent) * 100,
  Math.max((0.14 / maxPercent) * 100, 6),
]
const barColors = [
  'var(--color-teal-dark)',
  'var(--color-teal-medium)',
  'var(--color-teal-light)',
]
</script>

<template>
  <figure class="pilgrims-chart" role="img" :aria-label="$t('pilgrimsStats.chart.ariaLabel')">
    <div class="pilgrims-chart__bars">
      <div
        v-for="(height, i) in barHeights"
        :key="i"
        class="pilgrims-chart__bar-wrap"
      >
        <div
          class="pilgrims-chart__bar"
          :style="{
            height: height + '%',
            backgroundColor: barColors[i],
          }"
        />
        <p class="pilgrims-chart__label">
          <span class="pilgrims-chart__name">{{ $t(`pilgrimsStats.chart.bar${i + 1}Label`) }}</span>
          <span class="pilgrims-chart__pct">{{ $t(`pilgrimsStats.chart.bar${i + 1}Pct`) }}</span>
        </p>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.pilgrims-chart {
  margin: 0;
  padding: 0;
}

.pilgrims-chart__bars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: var(--space-3);
  height: 12.5rem;
  padding: 0 var(--space-2);
}

.pilgrims-chart__bar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 8.75rem;
  height: 100%;
}

.pilgrims-chart__bar {
  width: 100%;
  max-width: 5rem;
  min-height: 0.25rem;
  border-radius: 0.125rem 0.125rem 0 0;
  transition: height 0.3s ease;
}

.pilgrims-chart__label {
  margin: var(--space-2) 0 0;
  font: var(--font-style-normal) var(--font-weight-normal) var(--text-md) / 1.4 var(--font-family-ubuntu);
  color: var(--color-black);
  text-align: center;
}

.pilgrims-chart__name {
  display: block;
  font-weight: var(--font-weight-bold);
}

.pilgrims-chart__pct {
  display: block;
  margin-top: var(--space-1);
}
</style>
