<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value) return
  useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: leftCol, direction: 'left', delay: 0.1 }, { el: rightCol, direction: 'right', delay: 0.1, rotation: 15, transformOrigin: 'left bottom' }, { el: question, direction: 'down', delay: 0.2 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'parcours-praticable-section', 'section--full-viewport']" data-block data-component="ParcoursPraticableSection">
  <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered parcours-praticable-section__first">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('parcoursPraticable.paragraph1')"></p>
        </div>
        <div class="centered--large">
          <div class="row-two-col paragraph-spacing">
            <div class="col-left">
              <p class="type__question" v-html="$t('parcoursPraticable.paragraph2')"></p>
            </div>
            <div class="col-right" :class="{ 'mt-6': isMobile }">
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
