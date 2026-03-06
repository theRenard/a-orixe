<script setup lang="ts">
defineProps<{ sectionIndex: number }>()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: leftCol, direction: 'left', delay: 0 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section :class="['section', `section-${sectionIndex}`, 'reconnaissance-section', 'section--full-viewport']" data-block data-component="ReconnaissanceSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <div class="paragraph-spacing reconnaissance-section__row">
            <h2 class="type__section-title type__section-title--with-line heading-spacing">
              {{ $t('reconnaissance.title') }}
            </h2>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconnaissance.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconnaissance.paragraph2')"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.reconnaissance-section {
  overflow-x: hidden;
}
</style>
