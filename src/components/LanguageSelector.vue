<script setup lang="ts">
</script>

<template>
  <div class="language-selector" role="group" aria-label="Language">
    <button
      type="button"
      class="language-selector__option"
      :class="{ 'language-selector__option--active': $i18n.locale === 'fr' }"
      aria-label="Français"
      :aria-pressed="$i18n.locale === 'fr'"
      @click="$i18n.locale = 'fr'"
    >
      FR
    </button>
    <span class="language-selector__separator" aria-hidden="true">/</span>
    <button
      type="button"
      class="language-selector__option"
      :class="{ 'language-selector__option--active': $i18n.locale === 'es' }"
      aria-label="Español"
      :aria-pressed="$i18n.locale === 'es'"
      @click="$i18n.locale = 'es'"
    >
      ES
    </button>
  </div>
</template>

<style scoped>
.language-selector {
  position: fixed;
  top: 0;
  right: 200px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  background-position: 0 0;
  background-origin: padding-box;
  opacity: 1;
  font-family: var(--font-family-ubuntu);
  font-size: var(--font-size-sm);
  line-height: 1;
  padding: 7px;
  gap: 0.4rem;
  height: 35px;
  width: 75px;
  border-bottom: 3px solid var(--color-orange);
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
