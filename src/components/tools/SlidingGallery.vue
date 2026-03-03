<script setup lang="ts">
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

defineProps<{
  /** List of images: src and optional alt. */
  images: Array<{ src: string; alt?: string }>
  /** Optional caption text (plain). Use the caption slot for HTML. */
  caption?: string
}>()
</script>

<template>
<div class="sliding-gallery paragraph-spacing" role="region" aria-label="Image gallery">
  <Carousel :autoplay="3000" :items-to-show="1" :wrap-around="true" :transition="400" :touch-drag="true"
    :mouse-drag="true" height="100vmin" class="sliding-gallery__carousel">
    <Slide v-for="(item, i) in images" :key="i">
      <div class="sliding-gallery__slide">
        <img :src="item.src" :alt="item.alt ?? ''" class="sliding-gallery__img" loading="lazy">
      </div>
    </Slide>
    <template #addons>
      <Pagination />
    </template>
  </Carousel>
  <p v-if="$slots.caption" class="sliding-gallery__caption type__image-caption type__image-caption--with-line">
    <slot name="caption" />
  </p>
  <p v-else-if="caption" class="sliding-gallery__caption type__image-caption type__image-caption--with-line">
    {{ caption }}
  </p>
</div>
</template>

<style scoped>
.sliding-gallery {
  width: 100%;
  overflow: hidden;
}

.sliding-gallery__carousel {
  --vc-clr-primary: var(--color-teal-dark, #2d4b4b);
  --vc-pgn-active-color: #fff;
  --vc-pgn-background-color: rgba(255, 255, 255, 0.6);
}

.sliding-gallery__slide {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/*
.sliding-gallery__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
} */

.sliding-gallery__caption {
  margin: 0;
  margin-top: 1rem;
  text-align: center;
}

/* Pagination dots: align with project spacing */
.sliding-gallery :deep(.carousel__pagination) {
  margin-top: 1rem;
}
</style>
