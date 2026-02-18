<template>
<section class="reconnaissance-section">
  <div class="container">
    <div class="centered">
      <div class="reconnaissance-section__row">
        <div class="reconnaissance-section__content">
          <h2 class="type__section-title type__section-title--with-line heading-spacing">
            {{ $t('reconnaissance.title') }}
          </h2>
          <p class="type__section-paragraph paragraph-spacing" v-html="$t('reconnaissance.paragraph1')"></p>
        </div>
        <div class="reconnaissance-section__document">
          <div class="reconnaissance-section__placeholder" aria-hidden="true">
            <span class="reconnaissance-section__placeholder-text">{{ $t('reconnaissance.placeholderLabel') }}</span>
          </div>
          <p class="reconnaissance-section__caption type__image-caption type__image-caption--with-line paragraph-spacing"
            v-html="$t('reconnaissance.documentCaption')"></p>
        </div>
      </div>
      <p class="type__footnote reconnaissance-section__footnote paragraph-spacing"
        v-html="$t('reconnaissance.footnote')">
      </p>
    </div>
  </div>
</section>
</template>
