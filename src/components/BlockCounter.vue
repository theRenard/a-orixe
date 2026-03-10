<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Static version number (e.g. 1 → "v1"). */
    version?: number
  }>(),
  { version: 4 }
)
</script>

<template>
  <div class="block-counter" aria-hidden="true">
    v{{ version }}
  </div>
</template>

<style scoped>
.block-counter {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  padding: 10px;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1;
  color: black;
  pointer-events: none;
}
</style>
