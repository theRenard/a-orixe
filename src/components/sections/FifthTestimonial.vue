<script setup lang="ts">
</script>

<template>
<section class="fifth-testimonial section--full-viewport with-background with-shadow">
  <div class="container">
    <blockquote class="centered">
      <div>
        <p class="type__testimonial-block relative">
          <span class="type__testimonial-quote">«</span>
          <span v-html="$t('fifthTestimonial.quote')"></span> »
        </p>
        <footer class="type__testimonial-name" v-html="$t('fifthTestimonial.quoteAuthor')"></footer>
      </div>
    </blockquote>
  </div>
</section>
</template>
