<script setup lang="ts">
defineProps<{ sectionIndex: number }>()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }]
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section :class="['section', `section-${sectionIndex}`, 'camino-section', 'section--full-viewport']" data-block data-component="CaminoSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <p class="type__hero-synopsis paragraph-spacing" v-html="$t('camino.paragraph')"></p>
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('camino.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('camino.paragraph1')"></p>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('camino.paragraph2')"></p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.camino-section {
  overflow-x: hidden;
}
</style>
