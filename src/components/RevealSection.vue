<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation, type RevealDirection } from '@/composables/useRevealAnimation'

const props = withDefaults(
  defineProps<{
    direction?: RevealDirection
    duration?: number
    offset?: number
  }>(),
  {
    direction: 'left',
    duration: 0.65,
    offset: 48,
  },
)

const root = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [{ el: root, direction: props.direction }],
  duration: props.duration,
  offset: props.offset,
  ease: 'power3.out',
  scrollTrigger: { trigger: root },
})

onMounted(() => {
  const cleanup = run()
  if (cleanup) {
    onUnmounted(cleanup)
  }
})
</script>

<template>
  <div ref="root" class="reveal-section">
    <slot />
  </div>
</template>

<style scoped>
.reveal-section {
  overflow-x: hidden;
}
</style>
