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
  <div class="language-selector" role="group" aria-label="Language">
    <button
      type="button"
      class="language-selector__option"
      :class="{ 'language-selector__option--active': locale === 'fr' }"
      aria-label="Français"
      :aria-pressed="locale === 'fr'"
      @click="goToLocale('fr')"
    >
      FR
    </button>
    <span class="language-selector__separator" aria-hidden="true">/</span>
    <button
      type="button"
      class="language-selector__option"
      :class="{ 'language-selector__option--active': locale === 'es' }"
      aria-label="Español"
      :aria-pressed="locale === 'es'"
      @click="goToLocale('es')"
    >
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
  font-family: var(--font-family-ubuntu);
  font-size: var(--font-size-base);
  line-height: 1;
  padding: 0.4375rem;
  gap: 0.4rem;
  height: 2.1875rem;
  width: 4.6875rem;
  border-bottom: 0.1875rem solid var(--color-orange);
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
</style>
