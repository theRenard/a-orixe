<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()

function goToLocale(newLocale: 'fr' | 'es') {
  if (locale.value === newLocale) return
  router.push({ path: `/${newLocale}`, query: route.query })
}
</script>

<template>
<div class="language-selector type__language-selector" role="group" aria-label="Language">
  <button type="button" class="language-selector__option type__language-selector-option"
    :class="{ 'language-selector__option--active': locale === 'fr' }" aria-label="Français"
    :aria-pressed="locale === 'fr'" @click="goToLocale('fr')">
    FR
  </button>
  <span class="language-selector__separator" aria-hidden="true">/</span>
  <button type="button" class="language-selector__option type__language-selector-option"
    :class="{ 'language-selector__option--active': locale === 'es' }" aria-label="Español"
    :aria-pressed="locale === 'es'" @click="goToLocale('es')">
    ES
  </button>
</div>
</template>

<style scoped>
.language-selector {
  position: fixed;
  top: 0;
  right: 12.5rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  background-position: 0 0;
  background-origin: padding-box;
  opacity: 1;
  padding: calc(0.4375rem * var(--font-scale));
  gap: 0.4rem;
  height: calc(2.1875rem * var(--font-scale));
  width: calc(4.6875rem * var(--font-scale));
  border-bottom: calc(0.1875rem * var(--font-scale)) solid var(--color-orange);
}

.language-selector__option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  border: none;
  background: none;
  color: var(--color-black);
  cursor: pointer;
  font: inherit;
  -webkit-tap-highlight-color: transparent;
}

.language-selector__option:hover {
  color: var(--color-orange);
}

.language-selector__option--active {
  font-weight: var(--font-weight-bold);
  color: var(--color-orange);
}

.language-selector__separator {
  color: var(--color-black);
}

@media (max-width: 47.99rem) {
  .language-selector {
    transform: scale(2);
    transform-origin: top right;
  }
}
</style>
