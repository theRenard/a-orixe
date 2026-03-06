<script setup lang="ts">
</script>

<doc lang="text">
  Previous animation: GSAP timeline with ScrollTrigger.
  - scrollTrigger: { trigger: chart, start: 'top 80%', once: true }
  - Timeline: fill1 width 0% → 46% (duration 2, ease power2.out, position 0); fill2 width 0% → 19% (duration 2, ease power2.out, position 0.1); fill3 width 0 → 2 (duration 2, ease power2.out, position 0.2).
  - Refs: chartRef, fill1Ref, fill2Ref, fill3Ref. Bars shown at final widths via CSS below.
</doc>

<template>
<figure class="pilgrims-horizontal-chart" role="img" :aria-label="$t('pilgrimsStats.chart.ariaLabel')">
  <div class="pilgrims-horizontal-chart__row pilgrims-horizontal-chart__row--1">
    <div class="pilgrims-horizontal-chart__labels">
      <span class="pilgrims-horizontal-chart__name">{{ $t('pilgrimsStats.chart.bar1Label') }}</span>
      <span class="pilgrims-horizontal-chart__pct">{{ $t('pilgrimsStats.chart.bar1Pct') }}</span>
    </div>
    <div class="pilgrims-horizontal-chart__track">
      <div class="pilgrims-horizontal-chart__fill pilgrims-horizontal-chart__fill--animated" />
    </div>
  </div>
  <div class="pilgrims-horizontal-chart__row pilgrims-horizontal-chart__row--2">
    <div class="pilgrims-horizontal-chart__labels">
      <span class="pilgrims-horizontal-chart__name">{{ $t('pilgrimsStats.chart.bar2Label') }}</span>
      <span class="pilgrims-horizontal-chart__pct">{{ $t('pilgrimsStats.chart.bar2Pct') }}</span>
    </div>
    <div class="pilgrims-horizontal-chart__track">
      <div class="pilgrims-horizontal-chart__fill pilgrims-horizontal-chart__fill--animated" />
    </div>
  </div>
  <div class="pilgrims-horizontal-chart__row pilgrims-horizontal-chart__row--3">
    <div class="pilgrims-horizontal-chart__labels">
      <span class="pilgrims-horizontal-chart__name">{{ $t('pilgrimsStats.chart.bar3Label') }}</span>
      <span class="pilgrims-horizontal-chart__pct">{{ $t('pilgrimsStats.chart.bar3Pct') }}</span>
    </div>
    <div class="pilgrims-horizontal-chart__track">
      <div
        class="pilgrims-horizontal-chart__fill pilgrims-horizontal-chart__fill--line pilgrims-horizontal-chart__fill--animated" />
    </div>
  </div>
</figure>
</template>

<style scoped>
.pilgrims-horizontal-chart {
  margin: 0;
  padding: 0;
  width: calc(500px * var(--chart-scale));
  margin: 0 auto;
}

.pilgrims-horizontal-chart__row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.pilgrims-horizontal-chart__row:last-child {
  margin-bottom: 0;
}

.pilgrims-horizontal-chart__labels {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: calc(8rem * var(--scale-xlarge));
  line-height: 1.1;
}

.pilgrims-horizontal-chart__name {
  font: var(--font-style-normal) var(--font-weight-bold) calc(1.3rem * var(--scale-xlarge))/calc(1.3rem * var(--scale-xlarge)) var(--font-family-ubuntu);
  color: var(--color-black, #2d4b4b);
}

.pilgrims-horizontal-chart__pct {
  font: var(--font-style-normal) var(--font-weight-bold) calc(1.3rem * var(--scale-xlarge))/calc(1.3rem * var(--scale-xlarge)) var(--font-family-ubuntu);
  color: var(--color-black, #2d4b4b);
  margin-top: 0.05rem;
}

.pilgrims-horizontal-chart__track {
  flex: 1;
  min-width: 0;
  max-width: calc(320px * var(--chart-scale));
  height: calc(60px * var(--chart-scale));
  background-color: #d9edee;
}

.pilgrims-horizontal-chart__fill {
  height: 100%;
  background-color: #345558;
}

/* Bar 1: 46% – previously animated from 0 by GSAP */
.pilgrims-horizontal-chart__row--1 .pilgrims-horizontal-chart__fill--animated {
  width: 46%;
  background-color: #345558;
}

/* Bar 2: 19% – previously animated from 0 by GSAP */
.pilgrims-horizontal-chart__row--2 .pilgrims-horizontal-chart__fill--animated {
  width: 19%;
  background-color: #5d979b;
}

/* Bar 3: thin vertical line (2px) – previously animated from 0 by GSAP */
.pilgrims-horizontal-chart__row--3 .pilgrims-horizontal-chart__fill--line.pilgrims-horizontal-chart__fill--animated {
  width: 2px;
  min-width: 0;
  background-color: #df5e3e;
}
</style>
