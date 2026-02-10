<script setup lang="ts">
/**
 * Style reference page: lists all typography/character classes from
 * src/styles/vars/styles.css for comparing mockup with the actual page.
 */
import { RouterLink } from 'vue-router'
// Ensure reset, tokens and typography classes are available on this route (avoids missing styles on direct load / code-split)
import '@/styles/reset.css'
import '@/styles/design-tokens.css'

interface StyleEntry {
  class: string
  description: string
  sample: string
}

const styleEntries: StyleEntry[] = [
  { class: 'text-questions', description: 'Question text (bold, brown-dark)', sample: 'Question sample' },
  { class: 'text-reponse', description: 'Answer / response text (normal, orange)', sample: 'Answer sample' },
  { class: 'text-legende-image', description: 'Image caption / legend (medium, teal)', sample: 'Caption sample' },
  { class: 'text-display-quote', description: 'Large display quote (light weight italic, teal-light)', sample: 'Display quote' },
  { class: 'text-m-intro', description: 'Small intro label (Helvetica, gray)', sample: 'Intro label' },
  { class: 'text-encadrement-fonce', description: 'Dark frame / box heading (bold, teal-dark)', sample: 'Frame heading' },
  { class: 'text-citation', description: 'Block quote / citation (italic bold, black)', sample: 'Citation text' },
  { class: 'text-citation-attribution', description: 'Citation attribution (italic, smaller)', sample: '— Author' },
  { class: 'text-sous-titre', description: 'Section subtitle (Fraunces, orange)', sample: 'Section subtitle' },
  { class: 'text-intro', description: 'Intro heading (bold, black)', sample: 'Intro heading' },
  { class: 'text-labeur', description: 'Body / paragraph (normal, black)', sample: 'Body paragraph text.' },
]

</script>

<template>
  <main class="styles-reference-page">
    <header class="styles-reference-page__header">
      <h1 class="styles-reference-page__title">Style reference</h1>
      <p class="styles-reference-page__subtitle">
        Classes from <code>src/styles/vars/styles.css</code> — use for mockup vs page comparison.
      </p>
      <RouterLink to="/" class="styles-reference-page__back">← Back to site</RouterLink>
    </header>

    <section class="styles-reference-page__list">
      <article
        v-for="entry in styleEntries"
        :key="entry.class"
        class="style-card"
      >
        <div class="style-card__meta">
          <code class="style-card__class">.{{ entry.class }}</code>
          <p class="style-card__desc">{{ entry.description }}</p>
        </div>
        <p :class="['style-card__sample', entry.class]">
          {{ entry.sample }}
        </p>
      </article>
    </section>
  </main>
</template>

<!-- Unscoped so layout applies even when route is code-split or loaded directly; wrapper class is unique to avoid conflicts -->
<style>
.styles-reference-page {
  padding: 2rem 1.5rem;
  max-width: 56rem;
  margin: 0 auto;
}

.styles-reference-page__header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-teal-light, #a2cfcd);
}

.styles-reference-page__title {
  font-family: var(--font-family-fraunces);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-orange);
  margin: 0 0 0.5rem;
}

.styles-reference-page__subtitle {
  font-family: var(--font-family-ubuntu);
  font-size: var(--font-size-sm);
  color: var(--color-gray);
  margin: 0 0 1rem;
}

.styles-reference-page__subtitle code {
  background: var(--color-tan, #f5dfbb);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.styles-reference-page__back {
  font-family: var(--font-family-ubuntu);
  font-size: var(--font-size-sm);
  color: var(--color-orange);
  text-decoration: none;
}

.styles-reference-page__back:hover {
  text-decoration: underline;
}

.styles-reference-page__list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.styles-reference-page .style-card {
  background: var(--color-cream, #fffdfa);
  border: 1px solid var(--color-teal-light, #a2cfcd);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
}

.styles-reference-page .style-card__meta {
  margin-bottom: 0.75rem;
}

.styles-reference-page .style-card__class {
  display: inline-block;
  font-family: ui-monospace, monospace;
  font-size: var(--font-size-sm);
  color: var(--color-teal-dark, #2d4b4b);
  background: var(--color-blue-tint, #f8fbff);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.25rem;
}

.styles-reference-page .style-card__desc {
  font-family: var(--font-family-ubuntu);
  font-size: var(--font-size-xs);
  color: var(--color-gray);
  margin: 0;
}

.styles-reference-page .style-card__sample {
  margin: 0;
  border-top: 1px dashed var(--color-teal-light, #a2cfcd);
  padding-top: 0.75rem;
}
</style>
