<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value) return
  useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: leftCol, direction: 'left', delay: 0 }, { el: rightCol, direction: 'right', delay: 0.1, rotation: 12 }, { el: question, direction: 'down', delay: 0.2 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'concentre-galice-section', 'section--full-viewport']" data-block data-component="ConcentreGaliceSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered--large">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing mb-0">
            {{ $t('concentreGalice.title') }}
          </h2>
          <div class="row-two-col paragraph-spacing">
            <div class="col-left">
              <p class="type__section-paragraph paragraph-spacing" v-html="$t('concentreGalice.paragraph1')"></p>
              <p class="type__question paragraph-spacing" v-html="$t('concentreGalice.paragraph2')"></p>
            </div>
            <div class="col-right">
              <ImageCrop width="100%" height="600px" position="center 30%" :caption="$t('concentreGalice.imageCaption')"
                caption-position="bottom">
                <img class="paragraph-spacing" src="@/assets/photos/04_florence_antunes.webp"
                  :alt="$t('concentreGalice.imageCaption')" loading="lazy">
              </ImageCrop>
            </div>
          </div>
        </div>
        <div class="centered">
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('concentreGalice.paragraph3')"></p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.concentre-galice-section {
  overflow-x: hidden;
}

.concentre-galice-section .centered--large+.centered :deep(.paragraph-spacing) {
  margin-top: 0.75rem !important;
}
</style>
