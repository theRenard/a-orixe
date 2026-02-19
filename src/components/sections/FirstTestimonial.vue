<template>
<section class="section--full-viewport with-background with-shadow">
  <div class="container">
    <blockquote class="centered">
      <div>
        <p class="type__testimonial-block relative">
          <span class="type__testimonial-quote">«</span>
          <span v-html="$t('camino.quote')"></span> »
        </p>
        <footer class="type__testimonial-name" v-html="$t('camino.quoteAuthor')"></footer>
      </div>
    </blockquote>
  </div>
</section>
</template>
