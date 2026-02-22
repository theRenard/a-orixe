<template>
<section class="section--full-viewport comment-est-ne-section">
  <div class="container">
    <div class="comment-est-ne-section__inner paragraph-spacing">
      <div class="comment-est-ne-section__grid">
        <aside class="comment-est-ne-section__author">
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
        <div class="comment-est-ne-section__content mt-5">
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
  background-color: var(--color-white);
  /* padding: 4rem 0 5rem; */
}

.comment-est-ne-section__inner {
  margin: 0 auto;
  padding: 0 var(--space-3);
}

.comment-est-ne-section__grid {
  display: grid;
  grid-template-columns: 17.5rem 1fr;
  gap: var(--space-4) var(--space-5);
  align-items: start;
}

@media (max-width: 768px) {
  .comment-est-ne-section__grid {
    grid-template-columns: 1fr;
    gap: var(--space-3);
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
  gap: var(--space-1);
}

.comment-est-ne-section__avatar {
  width: 17.5rem;
  height: 17.5rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: var(--space-3);
}

.comment-est-ne-section__title {
  font: normal normal var(--font-weight-bold) var(--text-xxl) / 1.2 var(--font-family-fraunces);
  letter-spacing: var(--letter-spacing-normal);
  color: var(--color-teal-dark);
  text-align: left;
}

.comment-est-ne-section__paragraph {
  font: normal normal var(--font-weight-medium) var(--text-sm) / 1.4 var(--font-family-ubuntu);
  letter-spacing: var(--letter-spacing-normal);
  color: var(--color-teal-dark);
  text-align: left;
  max-width: 65ch;
}

.comment-est-ne-section__author-name {
  font: normal normal var(--font-weight-bold) var(--text-xl) / 1.35 var(--font-family-ubuntu);
  letter-spacing: var(--letter-spacing-normal);
  color: var(--color-teal-dark);
  text-align: center;
  margin: 0 0 var(--space-1);
}

.comment-est-ne-section__author-role {
  font: normal normal var(--font-weight-normal) var(--text-sm) / 1.35 var(--font-family-ubuntu);
  letter-spacing: var(--letter-spacing-normal);
  color: var(--color-teal-medium);
  text-align: center;
}

.comment-est-ne-section__author-email,
.comment-est-ne-section__author-website {
  font: normal normal var(--font-weight-bold) var(--text-sm) / 1.35 var(--font-family-ubuntu);
  letter-spacing: var(--letter-spacing-normal);
  color: #3c4c4a;
  text-align: center;
  text-decoration: underline;
  margin: 0 0 var(--space-1);
}

.comment-est-ne-section__author-email:hover,
.comment-est-ne-section__author-website:hover {
  color: var(--color-teal-bright);
}

.comment-est-ne-section__author-website {
  margin-bottom: 0;
}
</style>
