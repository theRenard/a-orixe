<script setup lang="ts">
</script>

<template>
<section class="section--full-viewport section--half-viewport with-background">
  <div class="container">
    <blockquote class="centered">
      <div>
        <p class="type__testimonial-block relative">
          <span class="type__testimonial-quote">«</span>
          <span v-html="$t('thirdTestimonial.quote')"></span> »
        </p>
        <footer class="type__testimonial-name" v-html="$t('thirdTestimonial.quoteAuthor')"></footer>
      </div>
    </blockquote>
  </div>
</section>
</template>
