<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const leftCol = ref<HTMLElement | null>(null)
const rightCol = ref<HTMLElement | null>(null)
const textBlock = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: leftCol, direction: 'left', delay: 0 },
    { el: rightCol, direction: 'right', delay: 0.1 },
    { el: textBlock, direction: 'left', delay: 0.2 },
  ],
  duration: 0.6,
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
<div data-block class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="reconnaissance-section">
  <div class="container">
    <div class="centered--large">
      <div class="row-two-col paragraph-spacing reconnaissance-section__row">
        <div ref="leftCol" class="col-left">
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('reconnaissance.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconnaissance.paragraph1')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconnaissance.paragraph2')"></p>
        </div>
        <div ref="rightCol" class="col-right">
          <ImageCrop width="100%" height="600px" position="center" :caption="$t('reconnaissance.documentCaption')"
            caption-position="bottom">
            <img class="paragraph-spacing" src="@/assets/photos/lettrereconnaissancechemin.webp"
              :alt="$t('reconnaissance.documentCaption')" loading="lazy">
          </ImageCrop>
        </div>
      </div>
    </div>
    <div ref="textBlock" class="centered reconnaissance-section__text">
      <p class="type__section-paragraph paragraph-spacing">{{ $t('reconnaissance.insertBetween') }}</p>
      <p class="type__footnote paragraph-spacing" v-html="$t('reconnaissance.footnote')"></p>
    </div>
  </div>
</section>
  </div>
</div>
</template>

<style scoped>
.reconnaissance-section {
  overflow-x: hidden;
}

.reconnaissance-section__text :deep(.paragraph-spacing) {
  margin-top: 0.75rem;
}

.reconnaissance-section__row+.centered {
  margin-top: 0.5rem;
}
</style>
