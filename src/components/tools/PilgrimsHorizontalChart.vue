<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted, onUnmounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const chartRef = ref<HTMLElement | null>(null)
const fill1Ref = ref<HTMLElement | null>(null)
const fill2Ref = ref<HTMLElement | null>(null)
const fill3Ref = ref<HTMLElement | null>(null)

onMounted(() => {
  const chart = chartRef.value
  const fill1 = fill1Ref.value
  const fill2 = fill2Ref.value
  const fill3 = fill3Ref.value
  if (!chart || !fill1 || !fill2 || !fill3) return
  const tl = gsap.timeline({
    scrollTrigger: { trigger: chart, start: 'top 80%', once: true },
  })
  tl.fromTo(fill1, { width: '0%' }, { width: '46%', duration: 2, ease: 'power2.out' }, 0)
  tl.fromTo(fill2, { width: '0%' }, { width: '19%', duration: 2, ease: 'power2.out' }, 0.1)
  tl.fromTo(fill3, { width: 0 }, { width: 2, duration: 2, ease: 'power2.out' }, 0.2)
  onUnmounted(() => tl.scrollTrigger?.kill())
})
</script>

<template>
<figure ref="chartRef" class="pilgrims-horizontal-chart" role="img" :aria-label="$t('pilgrimsStats.chart.ariaLabel')">
  <div class="pilgrims-horizontal-chart__row pilgrims-horizontal-chart__row--1">
    <div class="pilgrims-horizontal-chart__labels">
      <span class="pilgrims-horizontal-chart__name">{{ $t('pilgrimsStats.chart.bar1Label') }}</span>
      <span class="pilgrims-horizontal-chart__pct">{{ $t('pilgrimsStats.chart.bar1Pct') }}</span>
    </div>
    <div class="pilgrims-horizontal-chart__track">
      <div ref="fill1Ref" class="pilgrims-horizontal-chart__fill pilgrims-horizontal-chart__fill--animated" />
    </div>
  </div>
  <div class="pilgrims-horizontal-chart__row pilgrims-horizontal-chart__row--2">
    <div class="pilgrims-horizontal-chart__labels">
      <span class="pilgrims-horizontal-chart__name">{{ $t('pilgrimsStats.chart.bar2Label') }}</span>
      <span class="pilgrims-horizontal-chart__pct">{{ $t('pilgrimsStats.chart.bar2Pct') }}</span>
    </div>
    <div class="pilgrims-horizontal-chart__track">
      <div ref="fill2Ref" class="pilgrims-horizontal-chart__fill pilgrims-horizontal-chart__fill--animated" />
    </div>
  </div>
  <div class="pilgrims-horizontal-chart__row pilgrims-horizontal-chart__row--3">
    <div class="pilgrims-horizontal-chart__labels">
      <span class="pilgrims-horizontal-chart__name">{{ $t('pilgrimsStats.chart.bar3Label') }}</span>
      <span class="pilgrims-horizontal-chart__pct">{{ $t('pilgrimsStats.chart.bar3Pct') }}</span>
    </div>
    <div class="pilgrims-horizontal-chart__track">
      <div ref="fill3Ref"
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

/* Bar 1: 46% – width set by GSAP animation */
.pilgrims-horizontal-chart__row--1 .pilgrims-horizontal-chart__fill--animated {
  width: 0;
  background-color: #345558;
}

/* Bar 2: 19% – width set by GSAP animation */
.pilgrims-horizontal-chart__row--2 .pilgrims-horizontal-chart__fill--animated {
  width: 0;
  background-color: #5d979b;
}

/* Bar 3: thin vertical line – width set by GSAP animation */
.pilgrims-horizontal-chart__row--3 .pilgrims-horizontal-chart__fill--line.pilgrims-horizontal-chart__fill--animated {
  width: 0;
  min-width: 0;
  background-color: #df5e3e;
}
</style>
