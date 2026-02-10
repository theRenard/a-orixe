<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="intro" aria-labelledby="intro-heading">
    <div class="intro__inner">
      <h2 id="intro-heading" class="intro__heading">
        {{ t('intro.heading') }}
      </h2>
      <p class="intro__paragraph text-labeur">
        {{ t('intro.paragraph') }}
      </p>
      <p class="intro__subheading text-sous-titre">
        {{ t('intro.subheading') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.intro {
  width: 100%;
  padding: 0 1.5rem 3rem;
}

.intro__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.intro__heading {
  font-family: var(--font-family-ubuntu);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-base);
  color: var(--color-black);
  margin: 0 0 1rem;
}

.intro__paragraph {
  margin: 0 0 1.5rem;
}

.intro__subheading {
  margin: 0;
}
</style>
