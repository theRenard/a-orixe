<script setup lang="ts">
defineProps<{
  quoteKey: string
  authorKey: string
}>()
</script>

<template>
  <section class="testimonial-section">
    <div class="container">

      <blockquote class="section">
        <div>
          <p class="type__testimonial-block relative">
            <span class="type__testimonial-quote">«</span>
            {{ $t(quoteKey) }} »
          </p>
          <footer class="type__testimonial-name">
            {{ $t(authorKey) }}
          </footer>
        </div>
      </blockquote>
    </div>
  </section>
</template>
