<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

defineProps<{ sectionIndex: number }>()
const { isMobile } = useMobileDetection()

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value) return
  useAnimation({
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
    ],
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: author, direction: 'left', delay: 0 }, { el: content, direction: 'right', delay: 0.12 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
</doc>

<template>
<section ref="sectionRoot" :class="['section', `section-${sectionIndex}`, 'section--full-viewport', 'comment-est-ne-section', { 'pb-10': isMobile }]" data-block data-component="CommentEstNeRecitSection">
  <div class="section-content">
    <div class="section-inner" data-block-inner>
      <div class="container">
        <div class="comment-est-ne-section__inner paragraph-spacing">
          <div class="comment-est-ne-section__grid">
            <aside class="comment-est-ne-section__author">
              <img src="@/assets/photos/florenceantunes-portrait.webp" alt="" class="comment-est-ne-section__avatar"
                style="width: calc(20rem * var(--scale-xlarge)); height: auto">
              <h3 class="comment-est-ne-section__author-name">
                {{ $t('commentEstNeRecit.authorName') }}
              </h3>
              <p class="comment-est-ne-section__author-role" v-html="$t('commentEstNeRecit.authorRole')"></p>
              <a href="mailto:florenceantunes@gmail.com" class="comment-est-ne-section__author-email">
                {{ $t('commentEstNeRecit.authorEmail') }}
              </a>
              <a href="https://www.florenceantunes.com" target="_blank" rel="noopener noreferrer"
                class="comment-est-ne-section__author-website">
                {{ $t('commentEstNeRecit.authorWebsite') }}
              </a>
            </aside>
            <div class="comment-est-ne-section__content mt-4">
              <h2 ref="title" class="comment-est-ne-section__title heading-spacing">
                {{ $t('commentEstNeRecit.title') }}
              </h2>
              <p class="comment-est-ne-section__paragraph paragraph-spacing" v-html="$t('commentEstNeRecit.paragraph')">
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.comment-est-ne-section {
  overflow-x: hidden;
  background-color: var(--color-white);
  /* padding: 4rem 0 5rem; */
}

.comment-est-ne-section__inner {
  /* max-width: 1000px; */
  margin: 0 auto;
  padding: 0 2rem;
}

/* Mobile: single column, content (title + paragraph) before author (presentation) */
.comment-est-ne-section__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: start;
}

.comment-est-ne-section__content {
  order: 1;
}

.comment-est-ne-section__author {
  order: 2;
}

@media (min-width: 48rem) {
  .comment-est-ne-section__grid {
    grid-template-columns: 17.5rem 1fr;
    gap: 3rem 4rem;
  }

  .comment-est-ne-section__content,
  .comment-est-ne-section__author {
    order: unset;
  }
}

.comment-est-ne-section__author {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.25rem;
}

.comment-est-ne-section__avatar {
  width: 17.5rem;
  height: 17.5rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.25rem;
}

/* Big green heading – Fraunces 35px/30px bold #2D4B4B */
.comment-est-ne-section__title {
  font: normal normal var(--font-weight-bold) calc(2.1875rem * var(--scale-xlarge)) / calc(1.875rem * var(--scale-xlarge)) var(--font-family-fraunces);
  letter-spacing: 0;
  color: var(--color-teal-dark);
  text-align: left;
}

/* Green paragraph – Ubuntu 18px/30px medium #2D4B4B, columnar width */
.comment-est-ne-section__paragraph {
  font: normal normal var(--font-weight-medium) calc(1.125rem * var(--scale-xlarge)) / calc(1.875rem * var(--scale-xlarge)) var(--font-family-ubuntu);
  letter-spacing: 0;
  color: var(--color-teal-dark);
  text-align: left;
  max-width: 65ch;
}

/* Author name – Ubuntu 28px/27px bold #2D4B4B, center */
.comment-est-ne-section__author-name {
  font: normal normal var(--font-weight-bold) calc(1.75rem * var(--scale-xlarge)) / calc(1.6875rem * var(--scale-xlarge)) var(--font-family-ubuntu);
  letter-spacing: 0;
  color: var(--color-teal-dark);
  text-align: center;
  margin: 0 0 0.5rem;
}

/* Author role – Ubuntu 19px/27px normal #609897, center */
.comment-est-ne-section__author-role {
  font: normal normal var(--font-weight-normal) calc(1.1875rem * var(--scale-xlarge)) / calc(1.6875rem * var(--scale-xlarge)) var(--font-family-ubuntu);
  letter-spacing: 0;
  color: var(--color-teal-medium);
  text-align: center;
}

/* Author email & website – bold, underline, dark greenish-grey #3C4C4A */
.comment-est-ne-section__author-email,
.comment-est-ne-section__author-website {
  font: normal normal var(--font-weight-bold) calc(1.1875rem * var(--scale-xlarge)) / calc(1.6875rem * var(--scale-xlarge)) var(--font-family-ubuntu);
  letter-spacing: 0;
  color: #3c4c4a;
  text-align: center;
  text-decoration: underline;
  margin: 0 0 0.25rem;
}

.comment-est-ne-section__author-email:hover,
.comment-est-ne-section__author-website:hover {
  color: var(--color-teal-bright);
}

.comment-est-ne-section__author-website {
  margin-bottom: 0;
}
</style>
