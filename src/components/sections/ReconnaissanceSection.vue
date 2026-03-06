<script setup lang="ts">
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: leftCol, direction: 'left', delay: 0 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="ReconnaissanceSection" class="block">
  <div data-block-inner class="block-inner">
    <section class="reconnaissance-section section--full-viewport">
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
    </section>
  </div>
</div>
</template>

<style scoped>
.reconnaissance-section {
  overflow-x: hidden;
}
</style>
