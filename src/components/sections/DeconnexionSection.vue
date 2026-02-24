<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: title, direction: 'right', delay: 0 },
    { el: content, direction: 'left', delay: 0.1 },
    { el: question, direction: 'down', delay: 0.2 },
  ],
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<div data-block data-component="DeconnexionSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="deconnexion-section section--full-viewport">
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('deconnexion.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('deconnexion.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('deconnexion.paragraph2')"></p>
            <p ref="question" class="type__question paragraph-spacing" v-html="$t('deconnexion.highlight')"></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.deconnexion-section {
  overflow-x: hidden;
}
</style>
