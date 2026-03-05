<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Ref to the scroll container that wraps the blocks (e.g. viewport). Observer root. */
    viewportRef?: { value: HTMLElement | null } | null
    /** Ref to the rail that contains [data-block] elements. If not set, uses document. */
    railRef?: { value: HTMLElement | null } | null
  }>(),
  {},
)

const fillPercent = ref(0)
let observer: IntersectionObserver | null = null
let blockElements: Element[] = []
/** For each block index, whether it is currently intersecting the viewport. */
const intersecting = ref<boolean[]>([])
const readCount = ref(0)

function getBlocks(): Element[] {
  const rail = props.railRef?.value
  if (rail) {
    return Array.from(rail.querySelectorAll('[data-block]'))
  }
  return Array.from(document.querySelectorAll('[data-block]'))
}

function updateProgress() {
  const total = blockElements.length
  if (total === 0) return
  // Stay at 0 until CaminoSection (second block, index 1) has been read
  if (readCount.value <= 1) {
    fillPercent.value = 0
    return
  }
  const segmentsAfterHero = total - 1
  fillPercent.value = Math.round(((readCount.value - 1) / segmentsAfterHero) * 100)
}

function setupObserver() {
  observer?.disconnect()
  const viewport = props.viewportRef?.value
  const root = viewport ?? null
  blockElements = getBlocks()
  if (blockElements.length === 0) return

  intersecting.value = blockElements.map(() => false)
  readCount.value = 0
  updateProgress()

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const index = blockElements.indexOf(entry.target)
        if (index === -1) continue
        intersecting.value[index] = entry.isIntersecting
      }
      const maxIntersectingIndex = intersecting.value.reduce(
        (max, isIn, i) => (isIn ? i : max),
        -1,
      )
      readCount.value = maxIntersectingIndex === -1 ? 0 : maxIntersectingIndex + 1
      updateProgress()
    },
    {
      root,
      rootMargin: '0px',
      threshold: 0.2,
    },
  )

  blockElements.forEach((el) => observer!.observe(el))
}

function teardown() {
  observer?.disconnect()
  observer = null
}

watch(
  () => [props.viewportRef?.value, props.railRef?.value] as const,
  () => {
    teardown()
    setupObserver()
  },
  { flush: 'post' },
)

onMounted(() => {
  setupObserver()
})
onUnmounted(teardown)
</script>

<template>
<div class="read-progress-bar" role="progressbar" :aria-valuenow="fillPercent" aria-valuemin="0" aria-valuemax="100">
  <div class="read-progress-bar__track">
    <div class="read-progress-bar__fill" :style="{ width: `${fillPercent}%` }" />
  </div>
</div>
</template>

<style scoped>
.read-progress-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  pointer-events: none;
}

.read-progress-bar__track {
  width: 100%;
  height: 5px;
  /* background: rgba(0, 0, 0, 0.08); */
}

.read-progress-bar__fill {
  height: 100%;
  background: var(--color-orange);
  transition: width 0.35s ease-out;
}
</style>
