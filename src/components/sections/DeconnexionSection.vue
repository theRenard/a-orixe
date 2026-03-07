<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimation } from '@/composables/useAnimation'


const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
      { el: content, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.1, ease: 'power3.out' } },
      { el: question, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'deconnexion-section', 'section--full-viewport']" data-block data-component="DeconnexionSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('deconnexion.title') }}
          </h2>
          <div ref="content">
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('deconnexion.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('deconnexion.paragraph2')"></p>
            <p ref="question" class="type__question paragraph-spacing" v-html="$t('deconnexion.highlight')"></p>
          </div>
        </div>
      </div>
    </div>
</section>
</template>

<style scoped>
.deconnexion-section {
  overflow-x: hidden;
}
</style>
