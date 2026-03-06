<script setup lang="ts">
defineProps<{ sectionIndex: number }>()
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }, { el: content, direction: 'left', delay: 0.1 }, { el: question, direction: 'down', delay: 0.2 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section :class="['section', `section-${sectionIndex}`, 'deconnexion-section', 'section--full-viewport']" data-block data-component="DeconnexionSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="centered">
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('deconnexion.title') }}
          </h2>
          <div>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('deconnexion.paragraph1')"></p>
            <p class="type__section-paragraph paragraph-spacing" v-html="$t('deconnexion.paragraph2')"></p>
            <p class="type__question paragraph-spacing" v-html="$t('deconnexion.highlight')"></p>
          </div>
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
