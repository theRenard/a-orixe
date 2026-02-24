<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted, onUnmounted } from 'vue'
import ImageCrop from '@/components/tools/ImageCrop.vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

gsap.registerPlugin(ScrollTrigger)

const sectionRoot = ref<HTMLElement | null>(null)
const imageBlock = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const question = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: imageBlock, direction: 'left', delay: 0 },
    { el: title, direction: 'right', delay: 0.1 },
    { el: question, direction: 'down', delay: 0.2 },
  ],
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)

  const img = imageBlock.value?.querySelector<HTMLElement>('.image-crop img')
  const triggerEl = sectionRoot.value
  if (img && triggerEl) {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: triggerEl, start: 'top 70%', once: true },
    })
    tl.fromTo(
      img,
      { scale: 2, transformOrigin: '50% 0%' },
      { scale: 1, duration: 2, ease: 'power2.out', transformOrigin: '50% 100%' },
    )
    onUnmounted(() => tl.scrollTrigger?.kill())
  }
})
</script>

<template>
<div data-block data-component="ReconstitutionTracSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="reconstitution-trac-section">
      <div class="container">
        <div ref="imageBlock">
          <ImageCrop width="100%" height="320px" position="center 50%" :caption="$t('reconstitutionTrac.imageCaption')"
            caption-position="bottom">
            <img src="../../assets/photos/02_miguel_angel_soutullo_alvarez.webp"
              :alt="$t('reconstitutionTrac.imageCaption')" class="reconstitution-trac-section__image" loading="lazy">
          </ImageCrop>
        </div>
        <div class="centered">
          <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('reconstitutionTrac.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconstitutionTrac.paragraph2')"></p>
            <p ref="question" class="type__question paragraph-spacing" v-html="$t('reconstitutionTrac.question')"></p>
            <p class="type__section-paragraph travail-fourmi-paragraph paragraph-spacing"
              v-html="$t('travailFourmi.paragraph')"></p>
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
