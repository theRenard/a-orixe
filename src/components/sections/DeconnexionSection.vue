<script setup lang="ts">
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }, { el: content, direction: 'left', delay: 0.1 }, { el: question, direction: 'down', delay: 0.2 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<div data-block data-component="DeconnexionSection" class="block">
  <div data-block-inner class="block-inner">
    <section class="deconnexion-section section--full-viewport">
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
    </section>
  </div>
</div>
</template>

<style scoped>
.deconnexion-section {
  overflow-x: hidden;
}
</style>
