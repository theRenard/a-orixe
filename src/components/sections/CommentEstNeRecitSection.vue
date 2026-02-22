<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

const sectionRoot = ref<HTMLElement | null>(null)
const author = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: author, direction: 'left', delay: 0 },
    { el: content, direction: 'right', delay: 0.12 },
  ],
  duration: 0.6,
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot, start: 'top 88%', once: true },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
})
</script>

<template>
<section ref="sectionRoot" class="section--full-viewport comment-est-ne-section">
  <div class="container">
    <div class="comment-est-ne-section__inner paragraph-spacing">
      <div class="comment-est-ne-section__grid">
        <aside ref="author" class="comment-est-ne-section__author">
          <img src="@/assets/photos/florenceantunes-portrait.webp" alt="" class="comment-est-ne-section__avatar"
            width="280" height="280">
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
        <div ref="content" class="comment-est-ne-section__content mt-5">
          <h2 class="comment-est-ne-section__title heading-spacing">
            {{ $t('commentEstNeRecit.title') }}
          </h2>
          <p class="comment-est-ne-section__paragraph paragraph-spacing" v-html="$t('commentEstNeRecit.paragraph')">
          </p>
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

.comment-est-ne-section__grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem 4rem;
  align-items: start;
}

@media (max-width: 768px) {
  .comment-est-ne-section__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .comment-est-ne-section__content {
    text-align: left;
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
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.25rem;
}

/* Big green heading – Fraunces 35px/30px bold #2D4B4B */
.comment-est-ne-section__title {
  font: normal normal var(--font-weight-bold) calc(35px * var(--font-scale)) / calc(30px * var(--font-scale)) var(--font-family-fraunces);
  letter-spacing: 0px;
  color: var(--color-teal-dark);
  text-align: left;
}

/* Green paragraph – Ubuntu 18px/30px medium #2D4B4B, columnar width */
.comment-est-ne-section__paragraph {
  font: normal normal var(--font-weight-medium) calc(18px * var(--font-scale)) / calc(30px * var(--font-scale)) var(--font-family-ubuntu);
  letter-spacing: 0px;
  color: var(--color-teal-dark);
  text-align: left;
  max-width: 65ch;
}

/* Author name – Ubuntu 28px/27px bold #2D4B4B, center */
.comment-est-ne-section__author-name {
  font: normal normal var(--font-weight-bold) calc(28px * var(--font-scale)) / calc(27px * var(--font-scale)) var(--font-family-ubuntu);
  letter-spacing: 0px;
  color: var(--color-teal-dark);
  text-align: center;
  margin: 0 0 0.5rem;
}

/* Author role – Ubuntu 19px/27px normal #609897, center */
.comment-est-ne-section__author-role {
  font: normal normal var(--font-weight-normal) calc(19px * var(--font-scale)) / calc(27px * var(--font-scale)) var(--font-family-ubuntu);
  letter-spacing: 0px;
  color: var(--color-teal-medium);
  text-align: center;
}

/* Author email & website – bold, underline, dark greenish-grey #3C4C4A */
.comment-est-ne-section__author-email,
.comment-est-ne-section__author-website {
  font: normal normal var(--font-weight-bold) calc(19px * var(--font-scale)) / calc(27px * var(--font-scale)) var(--font-family-ubuntu);
  letter-spacing: 0px;
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
