<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimation } from '@/composables/useAnimation'

const sectionRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }]
  - offset: 40
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="RessentirLieuxClosingSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="ressentir-lieux-closing-section section--full-viewport">
    <div class="container">
      <div class="centered">
        <p class="type__section-paragraph paragraph-spacing" v-html="$t('ressentirLieux.paragraph2')"></p>
      </div>
    </div>
    </section>
  </div>
</div>
</template>

