<script setup lang="ts">
defineProps<{
  direction?: 'left' | 'right' | 'up' | 'down'
  offset?: number
}>()
</script>

<doc lang="text">
  Previous animation: useRevealAnimation with scrollTrigger.
  - Props: direction (default 'left'), offset (default 48).
  - elements: [{ el: root, direction: props.direction }]
  - offset: props.offset
  - ease: 'power3.out'
  - scrollTrigger: { trigger: root }
  - run() called in onMounted; cleanup in onUnmounted if returned.
</doc>

<template>
  <div class="reveal-section">
    <slot />
  </div>
</template>

