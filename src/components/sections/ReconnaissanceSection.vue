<template>
  <section class="reconnaissance-section">
    <div class="container">
      <div class="centered">
      <div class="reconnaissance-section__row">
        <div class="reconnaissance-section__content">
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('reconnaissance.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing">
            {{ $t('reconnaissance.paragraph1') }}
          </p>
          <p class="type__section-paragraph paragraph-spacing">
            {{ $t('reconnaissance.paragraph2') }}
          </p>
          <p class="type__question paragraph-spacing">
            {{ $t('reconnaissance.quote') }}
          </p>
          <p class="type__section-paragraph reconnaissance-section__attribution paragraph-spacing">
            {{ $t('reconnaissance.attribution') }}
          </p>
          <p class="type__section-paragraph paragraph-spacing">
            {{ $t('reconnaissance.paragraph3') }}
          </p>
        </div>
        <div class="reconnaissance-section__document">
          <div class="reconnaissance-section__placeholder" aria-hidden="true">
            <span class="reconnaissance-section__placeholder-text">{{ $t('reconnaissance.placeholderLabel') }}</span>
          </div>
          <p class="reconnaissance-section__caption type__footnote paragraph-spacing">
            {{ $t('reconnaissance.documentCaption') }}
          </p>
        </div>
      </div>
      </div>
      <p class="type__footnote reconnaissance-section__footnote paragraph-spacing">
        {{ $t('reconnaissance.footnote') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.reconnaissance-section__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: start;
}

@media (max-width: 768px) {
  .reconnaissance-section__row {
    grid-template-columns: 1fr;
  }
}

.reconnaissance-section__content {
  min-width: 0;
}

.reconnaissance-section__attribution {
  font-style: italic;
}

.reconnaissance-section__document {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.reconnaissance-section__placeholder {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 3 / 4;
  background: var(--color-white-off, #f5f3f0);
  border: 1px dashed var(--color-gray, #999);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reconnaissance-section__placeholder-text {
  font: var(--font-style-italic) var(--font-weight-normal) var(--font-size-base)/1.4 var(--font-family-ubuntu);
  color: var(--color-teal-medium, #5a7d7d);
}

.reconnaissance-section__caption {
  text-align: center;
}

.reconnaissance-section__footnote {
  padding: 0 10rem;
}

@media (max-width: 768px) {
  .reconnaissance-section__footnote {
    padding: 0 1rem;
  }
}
</style>
