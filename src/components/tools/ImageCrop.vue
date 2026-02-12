<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: string | number
    height?: string | number
    position?: string
  }>(),
  { width: '100%', height: '300px', position: 'center' }
)

function toCssSize(value: string | number): string {
  if (typeof value === 'number') return `${value}px`
  return value
}
</script>

<template>
  <div
    class="image-crop"
    :style="{
      width: toCssSize(width),
      height: toCssSize(height),
      '--image-crop-position': props.position,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.image-crop {
  overflow: hidden;
  display: block;
}

.image-crop :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: var(--image-crop-position, center);
}
</style>
