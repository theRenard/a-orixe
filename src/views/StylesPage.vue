<script setup lang="ts">
/**
 * Style reference page: lists all typography/character classes from
 * src/styles/vars/typography.css (BEM block: type) for mockup vs page comparison.
 */
import { RouterLink } from 'vue-router'

interface StyleEntry {
  class: string
  description: string
  sample: string
}

const styleEntries: StyleEntry[] = [
  { class: 'type__hero-title', description: 'Hero title (bold, 106px, Fraunces)', sample: 'Hero title' },
  { class: 'type__hero-subtitle', description: 'Hero subtitle (bold, 63px, Fraunces, orange)', sample: 'Hero subtitle' },
  { class: 'type__hero-synopsis', description: 'Hero synopsis (bold, xl, Ubuntu, black)', sample: 'Hero synopsis text.' },
  { class: 'type__credits', description: 'Credits (normal, 16px, Ubuntu, orange)', sample: 'Credits line' },
  { class: 'type__credits-link', description: 'Credits link (bold, underlined, orange)', sample: 'Credits link' },
  { class: 'type__credits-bold', description: 'Credits bold (bold, 16px, orange)', sample: 'Credits bold' },
  { class: 'type__section-title', description: 'Section title (bold, 3xl, Fraunces, orange)', sample: 'Section title' },
  { class: 'type__section-title type__section-title--with-line', description: 'Section title with orange line above', sample: 'Section title with line' },
  { class: 'type__section-paragraph', description: 'Section paragraph (normal, lg, Ubuntu, black)', sample: 'Section paragraph text.' },
  { class: 'type__testimonial-block', description: 'Testimonial block (italic bold, 2xl, Ubuntu, black)', sample: 'Testimonial quote' },
  { class: 'type__testimonial-name', description: 'Testimonial name (normal, lg, Ubuntu, black)', sample: 'Testimonial author' },
  { class: 'type__question', description: 'Question (bold, lg, Ubuntu, teal-dark)', sample: 'Question text' },
  { class: 'type__interview-title', description: 'Interview title (bold, 3xl, Fraunces, brown-dark)', sample: 'Interview title' },
  { class: 'type__interview-subtitle', description: 'Interview subtitle (bold, xl, Ubuntu, brown-dark)', sample: 'Interview subtitle' },
  { class: 'type__interview-question', description: 'Interview question (bold, lg, brown-dark)', sample: 'Interview question' },
  { class: 'type__interview-answer', description: 'Interview answer (normal, lg, Ubuntu, orange)', sample: 'Interview answer text.' },
]

</script>

<template>
  <main class="styles-reference-page">
    <header class="styles-reference-page__header">
      <h1 class="styles-reference-page__title type__section-title">Style reference</h1>
      <p class="styles-reference-page__subtitle">
        Classes from <code>src/styles/vars/typography.css</code> (BEM: type__*) — use for mockup vs page comparison.
      </p>
      <RouterLink to="/" class="styles-reference-page__back type__credits-link">← Back to site</RouterLink>
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
