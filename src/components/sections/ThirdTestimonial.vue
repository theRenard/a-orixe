<script setup lang="ts">
</script>

<template>
<section class="section--half-viewport with-background">
  <div class="container">
    <blockquote class="centered">
      <div>
        <p class="type__testimonial-block relative">
          <span class="type__testimonial-quote">«</span>
          {{ $t('thirdTestimonial.quote') }} »
        </p>
        <footer class="type__testimonial-name">
          {{ $t('thirdTestimonial.quoteAuthor') }}
        </footer>
      </div>
    </blockquote>
  </div>
</section>
</template>

<style scoped>
.second-testimonial__image {
  display: block;
  max-width: 100%;
  height: auto;
  align-self: flex-end;
  margin-left: auto;
}
</style>
