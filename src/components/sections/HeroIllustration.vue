<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import heroImage from '@/assets/illustrations/illu_principale_ok.webp'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const bg = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [{ el: bg, direction: 'left' }],
  duration: 0.8,
  offset: 40,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot, start: 'top 88%', once: true },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<section ref="sectionRoot" class="hero-illustration section--full-viewport">
  <div
    ref="bg"
    class="hero-illustration__bg"
    :style="{ backgroundImage: `url(${heroImage})` }"
    role="img"
    :aria-label="$t('hero.illustrationAlt')"
  />
</section>
</template>

<style scoped>
.hero-illustration {
  width: 100%;
  line-height: 0;
  overflow-x: hidden;
}

.hero-illustration__bg {
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
