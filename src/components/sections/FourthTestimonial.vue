<script setup lang="ts">
</script>

<template>
  <section class="section--full-viewport section--half-viewport with-background fourth-testimonial">
    <div class="container fourth-testimonial__container">
      <img
        src="../../assets/illustrations/mouette.webp"
        :alt="$t('fourthTestimonial.quote')"
        class="fourth-testimonial__bird"
        loading="lazy"
      >
      <blockquote class="centered">
        <div>
          <p class="type__testimonial-block relative">
            <span class="type__testimonial-quote">«</span>
            {{ $t('fourthTestimonial.quote') }} »
          </p>
          <footer class="type__testimonial-name">
            {{ $t('fourthTestimonial.quoteAuthor') }}
          </footer>
        </div>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.fourth-testimonial__container {
  position: relative;
}

.fourth-testimonial__bird {
  position: absolute;
  top: 0;
  right: 2rem;
  width: 120px;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .fourth-testimonial__bird {
    width: 80px;
    right: 1rem;
  }
}
</style>
