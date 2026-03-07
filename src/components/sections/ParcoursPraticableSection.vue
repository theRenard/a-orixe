<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const leftCol = ref<HTMLElement | null>(null)
const rightCol = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: leftCol, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.1, ease: 'power3.out' } },
      { el: rightCol, from: { x: 80, opacity: 0, rotation: 15, transformOrigin: 'left bottom' }, to: { x: 0, opacity: 1, delay: 0.1, rotation: 0, ease: 'power3.out', transformOrigin: 'left bottom' } },
      { el: question, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, delay: 0.2, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'parcours-praticable-section', 'section--full-viewport']" data-block data-component="ParcoursPraticableSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered parcours-praticable-section__first">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('parcoursPraticable.paragraph1')"></p>
        </div>
        <div class="centered--large">
          <div class="row-two-col paragraph-spacing">
            <div ref="leftCol" class="col-left">
              <p ref="question" class="type__question" v-html="$t('parcoursPraticable.paragraph2')"></p>
            </div>
            <div ref="rightCol" class="col-right" :class="{ 'mt-6': isMobile }">
              <ImageCrop :width="isMobile ? '100%' : '30rem'" :height="isMobile ? '100%' : '40rem'"
                position="center 40%" :caption="$t('parcoursPraticable.photoCredit')" caption-position="bottom">
                <img src="../../assets/photos/03_florence_antunes.webp" :alt="$t('parcoursPraticable.imageCaption')"
                  loading="lazy">
              </ImageCrop>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
</template>

<style scoped>
.parcours-praticable-section {
  overflow-x: hidden;
}

.parcours-praticable-section__first {
  margin-top: 1rem;
}

.parcours-praticable-section__first :deep(.paragraph-spacing) {
  margin-top: 1rem !important;
}
</style>
