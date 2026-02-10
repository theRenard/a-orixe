<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="camino" aria-labelledby="camino-heading">
    <div class="camino__inner">
      <p class="camino__lead text-labeur">
        {{ t('camino.paragraph') }}
      </p>
      <div class="camino__line-accent" aria-hidden="true" />
      <h2 id="camino-heading" class="camino__heading text-sous-titre">
        {{ t('camino.title') }}
      </h2>
      <p class="camino__paragraph text-labeur">
        {{ t('camino.paragraph1') }}
      </p>
      <p class="camino__paragraph text-labeur">
        {{ t('camino.paragraph2') }}
      </p>
      <blockquote class="camino__quote">
        <p class="camino__quote-text text-citation">
          « {{ t('camino.quote') }} »
        </p>
        <footer class="camino__quote-author text-citation-attribution">
          {{ t('camino.quoteAuthor') }}
        </footer>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.camino {
  width: 100%;
  margin-top: 3rem;
}

.camino__inner {
  max-width: 728px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.camino__lead {
  margin: 0 0 0.75rem;
}

.camino__line-accent {
  width: 30%;
  min-width: 8rem;
  height: 3px;
  background: var(--color-orange);
  margin: 0 0 1.5rem;
}

.camino__heading {
  margin: 0 0 1.5rem;
}

.camino__paragraph {
  margin: 0 0 1.5rem;
}

.camino__paragraph:last-of-type {
  margin-bottom: 2rem;
}

.camino__quote {
  margin: 0;
  padding: 0;
  border: none;
}

.camino__quote-text {
  margin: 0 0 0.5rem;
}

.camino__quote-author {
  margin: 0;
}
</style>
