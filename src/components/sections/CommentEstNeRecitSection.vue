<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRevealAnimation } from '@/composables/useRevealAnimation'
import { getBlockIndexFromElement } from '@/composables/useBlockIndex'
import { isMobileViewport } from '@/composables/useMobileDetection'
import { useMobileDetection } from '@/composables/useMobileDetection'

const { isMobile } = useMobileDetection()
const sectionRoot = ref<HTMLElement | null>(null)
const author = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const registerBlockEnter = inject<((index: number, play: () => void) => void) | undefined>('blockScroll/registerBlockEnter')
const unregisterBlockEnter = inject<((index: number) => void) | undefined>('blockScroll/unregisterBlockEnter')
const scrollToTop = inject<(() => void) | undefined>('scrollToTop')
const faviconUrl = `${import.meta.env.BASE_URL}favicon.svg`
const { run, setInitialState } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: author, direction: 'left', delay: 0 },
    { el: content, direction: 'right', delay: 0.12 },
  ],
  offset: 44,
  ease: 'power3.out',
  runOnMount: false,
})
let myBlockIndex = -1
let mobileRevealCleanup: (() => void) | void
onMounted(() => {
  setInitialState()
  myBlockIndex = getBlockIndexFromElement(sectionRoot.value)
  registerBlockEnter?.(myBlockIndex, () => run())
  if (isMobileViewport()) mobileRevealCleanup = run()
})
onUnmounted(() => {
  unregisterBlockEnter?.(myBlockIndex)
  mobileRevealCleanup?.()
})
</script>

<template>
<div data-block data-component="CommentEstNeRecitSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="section--full-viewport comment-est-ne-section" :class="{ 'pb-10': isMobile }">
      <div class="container">
        <div class="comment-est-ne-section__inner paragraph-spacing">
          <div class="comment-est-ne-section__grid">
            <aside ref="author" class="comment-est-ne-section__author">
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
            <div ref="content" class="comment-est-ne-section__content mt-4">
              <h2 class="comment-est-ne-section__title heading-spacing">
                {{ $t('commentEstNeRecit.title') }}
              </h2>
              <p class="comment-est-ne-section__paragraph paragraph-spacing" v-html="$t('commentEstNeRecit.paragraph')">
              </p>
            </div>
          </div>
          <div class="comment-est-ne-section__back-wrap">
            <button
              type="button"
              class="comment-est-ne-section__back-btn"
              :aria-label="$t('backToTop.label')"
              @click="scrollToTop?.()"
            >
              <img
                :src="faviconUrl"
                alt=""
                class="comment-est-ne-section__back-icon"
                width="48"
                height="48"
              >
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
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

.comment-est-ne-section__back-wrap {
  margin-top: 3rem;
  text-align: center;
}

.comment-est-ne-section__back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  padding: 0;
  background: var(--color-cream);
  border: 3px solid var(--color-teal-medium);
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0.35rem 1rem rgb(45 75 75 / 0.14);
  transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.comment-est-ne-section__back-btn:hover {
  background: var(--color-teal-light);
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 0.5rem 1.25rem rgb(45 75 75 / 0.2);
}

.comment-est-ne-section__back-btn:focus-visible {
  outline: 2px solid var(--color-teal-dark);
  outline-offset: 4px;
}

.comment-est-ne-section__back-icon {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
