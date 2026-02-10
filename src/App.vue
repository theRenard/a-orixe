<script setup lang="ts"></script>

<template>
  <div class="app-root">
    <h1 class="text-intro">A Orixe</h1>
    <p class="text-labeur">
      Design tokens from
      <a
        href="https://xd.adobe.com/view/cfc3d8df-bdf8-4d75-ab82-e32cb595b6dd-9a90/specs/"
        target="_blank"
        rel="noopener noreferrer"
      >Adobe XD</a>
      are loaded in <code>src/styles/design-tokens.css</code>.
    </p>
  </div>
</template>

<style scoped>
.app-root {
  max-width: 40rem;
  margin: 0 auto;
  padding: 2rem;
  background: var(--color-cream);
  min-height: 100vh;
}

.app-root :deep(a) {
  color: var(--color-orange);
}
</style>
