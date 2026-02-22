<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import heroImage from '@/assets/illustrations/illu_principale_ok.webp'
import mouseIcon from '@/assets/icons/computer-mouse-icon.svg'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const bg = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [{ el: bg, direction: 'left' }],
  duration: 0.8,
  offset: 40,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block class="block block--first">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="hero-illustration section--full-viewport">
      <div
        ref="bg"
        class="hero-illustration__bg"
        :style="{ backgroundImage: `url(${heroImage})` }"
        role="img"
        :aria-label="$t('hero.illustrationAlt')"
      />
    </section>
    <div class="scroll-indicator" aria-hidden="true">
      <img :src="mouseIcon" alt="" class="scroll-indicator__icon" />
    </div>
  </div>
</div>
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

.block--first .block-inner {
  position: relative;
}

.scroll-indicator {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.scroll-indicator__icon {
  display: block;
  width: 2rem;
  height: auto;
  animation: scroll-jump 1.2s cubic-bezier(0.33, 1, 0.68, 1) infinite;
}

@keyframes scroll-jump {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.6rem);
  }
}
</style>
