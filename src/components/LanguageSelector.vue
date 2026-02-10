<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
  <div class="language-selector" role="group" aria-label="Language">
    <button
      type="button"
      class="language-selector__option"
      :class="{ 'language-selector__option--active': locale === 'fr' }"
      aria-label="Français"
      :aria-pressed="locale === 'fr'"
      @click="locale = 'fr'"
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
      @click="locale = 'es'"
    >
      ES
    </button>
  </div>
</template>

<style scoped>
.language-selector {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 35px;
  margin: 1rem 1rem 0 0;
  padding: 0;
  background: #ffffff;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-origin: padding-box;
  opacity: 1;
  font-family: var(--font-family-ubuntu);
  font-size: var(--font-size-sm);
  line-height: 1;
}

.language-selector__option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 4px;
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
  color: var(--color-black);
}

.language-selector__separator {
  padding: 0 2px;
  color: var(--color-gray);
}
</style>
