<script setup lang="ts">
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isMobile } = useMobileDetection()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: imageBlock, direction: 'up', delay: 0, scale: 4, duration: 4, transformOrigin: 'bottom center' }, { el: image, direction: 'down', delay: 0.1, scale: 3, duration: 4, transformOrigin: 'top center' }, { el: title, direction: 'left', delay: 0.1 }, { el: question, direction: 'down', delay: 0.2 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="ReconstitutionTracSection" class="block">
  <div data-block-inner class="block-inner">
    <section class="reconstitution-trac-section" :class="{ 'mt-8': isMobile }">
      <div class="container">
        <div>
          <ImageCrop width="100%" height="320px" position="center 50%"
            :caption="$t('reconstitutionTrac.imageCaption')" caption-position="bottom">
            <img src="../../assets/photos/02_miguel_angel_soutullo_alvarez.webp"
              :alt="$t('reconstitutionTrac.imageCaption')" class="reconstitution-trac-section__image" loading="lazy">
          </ImageCrop>
        </div>
        <div class="centered">
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('reconstitutionTrac.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph2')"></p>
            <p class="type__question paragraph-spacing" v-html="$t('reconstitutionTrac.question')"></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.reconstitution-trac-section {
  overflow-x: hidden;
}

.reconstitution-trac-section__image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
