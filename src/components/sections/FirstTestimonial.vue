<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
<section class="section--full-viewport with-background with-shadow">
  <div class="container">
    <blockquote class="centered">
      <div>
        <p class="type__testimonial-block relative" :class="`type__testimonial-block--${locale}`">
          <span class="type__testimonial-quote">«</span>
          <span v-html="$t('camino.quote')"></span>
        </p>
        <footer class="type__testimonial-name" v-html="$t('camino.quoteAuthor')"></footer>
      </div>
    </blockquote>
  </div>
</section>
</template>
