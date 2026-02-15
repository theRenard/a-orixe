<template>
  <section class="comment-est-ne-section">
    <div class="comment-est-ne-section__inner container">
      <div class="comment-est-ne-section__grid">
        <aside class="comment-est-ne-section__author">
          <img
            src="@/assets/illustrations/florence-antunes.png"
            alt=""
            class="comment-est-ne-section__avatar"
            width="200"
            height="200"
          >
          <h3 class="comment-est-ne-section__author-name">
            {{ $t('commentEstNeRecit.authorName') }}
          </h3>
          <p class="comment-est-ne-section__author-role">
            {{ $t('commentEstNeRecit.authorRole') }}
          </p>
          <a
            href="mailto:florenceantunes@gmail.com"
            class="comment-est-ne-section__author-email"
          >
            {{ $t('commentEstNeRecit.authorEmail') }}
          </a>
          <a
            href="https://www.florenceantunes.com"
            target="_blank"
            rel="noopener noreferrer"
            class="comment-est-ne-section__author-website"
          >
            {{ $t('commentEstNeRecit.authorWebsite') }}
          </a>
        </aside>
        <div class="comment-est-ne-section__content">
          <h2 class="comment-est-ne-section__title heading-spacing">
            {{ $t('commentEstNeRecit.title') }}
          </h2>
          <p class="comment-est-ne-section__paragraph paragraph-spacing">
            {{ $t('commentEstNeRecit.paragraph') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comment-est-ne-section {
  background-color: var(--color-white);
  padding: 4rem 0 5rem;
}

.comment-est-ne-section__inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.comment-est-ne-section__grid {
  display: grid;
  grid-template-columns: minmax(200px, 280px) 1fr;
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
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.25rem;
}

/* Big green heading – Fraunces 35px/30px bold #2D4B4B */
.comment-est-ne-section__title {
  font: normal normal var(--font-weight-bold) 35px/30px var(--font-family-fraunces);
  letter-spacing: 0px;
  color: var(--color-teal-dark);
  text-align: left;
}

/* Green paragraph – Ubuntu 18px/30px medium #2D4B4B */
.comment-est-ne-section__paragraph {
  font: normal normal var(--font-weight-medium) 18px/30px var(--font-family-ubuntu);
  letter-spacing: 0px;
  color: var(--color-teal-dark);
  text-align: left;
}

/* Author name – Ubuntu 28px/27px bold #2D4B4B, center */
.comment-est-ne-section__author-name {
  font: normal normal var(--font-weight-bold) 28px/27px var(--font-family-ubuntu);
  letter-spacing: 0px;
  color: var(--color-teal-dark);
  text-align: center;
  margin: 0 0 0.5rem;
}

/* Author role – Ubuntu 19px/27px normal #609897, center */
.comment-est-ne-section__author-role {
  font: normal normal var(--font-weight-normal) 19px/27px var(--font-family-ubuntu);
  letter-spacing: 0px;
  color: var(--color-teal-medium);
  text-align: center;
}

/* Author email & website – Ubuntu 19px/27px bold #2D4B4B, center, underline */
.comment-est-ne-section__author-email,
.comment-est-ne-section__author-website {
  font: normal normal var(--font-weight-bold) 19px/27px var(--font-family-ubuntu);
  letter-spacing: 0px;
  color: var(--color-teal-dark);
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
