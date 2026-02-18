<template>
<figure class="pilgrims-horizontal-chart" role="img" :aria-label="$t('pilgrimsStats.chart.ariaLabel')">
  <div class="pilgrims-horizontal-chart__row pilgrims-horizontal-chart__row--1">
    <div class="pilgrims-horizontal-chart__labels">
      <span class="pilgrims-horizontal-chart__name">{{ $t('pilgrimsStats.chart.bar1Label') }}</span>
      <span class="pilgrims-horizontal-chart__pct">{{ $t('pilgrimsStats.chart.bar1Pct') }}</span>
    </div>
    <div class="pilgrims-horizontal-chart__track">
      <div class="pilgrims-horizontal-chart__fill" />
    </div>
  </div>
  <div class="pilgrims-horizontal-chart__row pilgrims-horizontal-chart__row--2">
    <div class="pilgrims-horizontal-chart__labels">
      <span class="pilgrims-horizontal-chart__name">{{ $t('pilgrimsStats.chart.bar2Label') }}</span>
      <span class="pilgrims-horizontal-chart__pct">{{ $t('pilgrimsStats.chart.bar2Pct') }}</span>
    </div>
    <div class="pilgrims-horizontal-chart__track">
      <div class="pilgrims-horizontal-chart__fill" />
    </div>
  </div>
  <div class="pilgrims-horizontal-chart__row pilgrims-horizontal-chart__row--3">
    <div class="pilgrims-horizontal-chart__labels">
      <span class="pilgrims-horizontal-chart__name">{{ $t('pilgrimsStats.chart.bar3Label') }}</span>
      <span class="pilgrims-horizontal-chart__pct">{{ $t('pilgrimsStats.chart.bar3Pct') }}</span>
    </div>
    <div class="pilgrims-horizontal-chart__track">
      <div class="pilgrims-horizontal-chart__fill pilgrims-horizontal-chart__fill--line" />
    </div>
  </div>
</figure>
</template>

<style scoped>
.pilgrims-horizontal-chart {
  margin: 0;
  padding: 0;
  width: 500px;
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
  width: 8rem;
  line-height: 1.1;
}

.pilgrims-horizontal-chart__name {
  font: var(--font-style-normal) var(--font-weight-bold) 1.3rem/1.3rem var(--font-family-ubuntu);
  color: var(--color-black, #2d4b4b);
}

.pilgrims-horizontal-chart__pct {
  font: var(--font-style-normal) var(--font-weight-bold) 1.3rem/1.3rem var(--font-family-ubuntu);
  color: var(--color-black, #2d4b4b);
  margin-top: 0.05rem;
}

.pilgrims-horizontal-chart__track {
  flex: 1;
  min-width: 0;
  max-width: 320px;
  height: 60px;
  background-color: #d9edee;
}

.pilgrims-horizontal-chart__fill {
  height: 100%;
  background-color: #345558;
}

/* Bar 1: 46% */
.pilgrims-horizontal-chart__row--1 .pilgrims-horizontal-chart__fill {
  width: 46%;
}

/* Bar 2: 19% */
.pilgrims-horizontal-chart__row--2 .pilgrims-horizontal-chart__fill {
  width: 19%;
  background-color: #5d979b;
}

/* Bar 3: 0,14% – thin vertical line */
.pilgrims-horizontal-chart__row--3 .pilgrims-horizontal-chart__fill--line {
  width: 2px;
  min-width: 2px;
  background-color: #df5e3e;
}
</style>
