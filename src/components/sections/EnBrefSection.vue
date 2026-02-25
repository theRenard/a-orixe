<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import phareCorrubedo from '@/assets/illustrations/phare.png'
import cathedrale from '@/assets/illustrations/cathedrale.png'
import { useRevealAnimation } from '@/composables/useRevealAnimation'

gsap.registerPlugin(ScrollTrigger)

const { locale, t } = useI18n()
const routeDetailUrl = computed(() => `https://aorixe.es/${locale.value === 'es' ? 'es' : 'fr'}`)
const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const statsRow = ref<HTMLElement | null>(null)
const linkWrap = ref<HTMLElement | null>(null)
const stat1El = ref<HTMLElement | null>(null)
const stat2El = ref<HTMLElement | null>(null)
const { run } = useRevealAnimation({
  elements: [
    { el: sectionRoot, direction: 'down', delay: 0, duration: 3 },
    { el: title, direction: 'left', delay: 0 },
    { el: statsRow, direction: 'right', delay: 0.1 },
    { el: linkWrap, direction: 'left', delay: 0.2 },
  ],
  offset: 44,
  ease: 'power3.out',
  scrollTrigger: { trigger: sectionRoot },
})
onMounted(() => {
  const cleanup = run()
  if (cleanup) onUnmounted(cleanup)
  nextTick(() => {
    const triggerEl = sectionRoot.value
    const el1 = stat1El.value
    const el2 = stat2El.value
    if (!triggerEl || !el1 || !el2) return
    const target1 = parseInt(t('enBref.stat1Number'), 10) || 0
    const target2 = parseInt(t('enBref.stat2Number'), 10) || 0
    const obj1 = { value: 0 }
    const obj2 = { value: 0 }
    const tl = gsap.timeline({
      scrollTrigger: { trigger: triggerEl, start: 'top 70%', once: true },
    })
    tl.to(obj1, {
      value: target1,
      duration: 3,
      ease: 'power2.out',
      onUpdate: () => { el1.textContent = String(Math.round(obj1.value)) },
    }, 0.2)
    tl.to(obj2, {
      value: target2,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => { el2.textContent = String(Math.round(obj2.value)) },
    }, 0.35)
    onUnmounted(() => tl.scrollTrigger?.kill())
  })
})
</script>

<template>
<div data-block data-component="EnBrefSection" class="block">
  <div data-block-inner class="block-inner">
    <section ref="sectionRoot" class="en-bref-section section--full-viewport">
      <div class="en-bref-section__inner container">
        <h2 ref="title" class="type__section-title type__section-title--with-line heading-spacing">
          <span class="">{{ $t('enBref.titlePrefix') }}</span>{{ $t('enBref.titleSuffix') }}
        </h2>

        <div ref="statsRow" class="en-bref-section__stats-row">
          <div class="en-bref-section__stat first-stat">
            <div ref="stat1El" class="type__enbref-big en-bref-section__stat-number">{{ $t('enBref.stat1Number') }}
            </div>
            <div class="type__enbref-small-orange">{{ $t('enBref.stat1Label') }}</div>
          </div>
          <div class="en-bref-section__stat second-stat">
            <div ref="stat2El" class="type__enbref-big en-bref-section__stat-number">{{ $t('enBref.stat2Number') }}
            </div>
            <div class="type__enbref-small-orange">{{ $t('enBref.stat2Label') }}</div>
          </div>
          <div class="en-bref-section__place first-place">
            <img :src="phareCorrubedo" :alt="$t('enBref.departurePlace')" class="en-bref-section__icon">
            <div>
              <div class="type__enbref-small-orange--left">{{ $t('enBref.departureLabel') }}</div>
              <div class="type__enbref-small-green">{{ $t('enBref.departurePlace') }}</div>
            </div>
          </div>
          <div class="en-bref-section__place second-place">
            <img :src="cathedrale" :alt="$t('enBref.arrivalPlace')" class="en-bref-section__icon">
            <div>
              <div class="type__enbref-small-orange--left">{{ $t('enBref.arrivalLabel') }}</div>
              <div class="type__enbref-small-green">{{ $t('enBref.arrivalPlace') }}</div>
            </div>
          </div>
        </div>

        <p ref="linkWrap" class="en-bref-section__link-wrap paragraph-spacing">
          <span class="type__enbref-small-green">{{ $t('enBref.detailLinkText') }}</span>
          <a :href="routeDetailUrl" target="_blank" rel="noopener noreferrer"
            class="type__enbref-small-green en-bref-section__link">{{ $t('enBref.detailLinkHere') }}</a>
        </p>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped>
.en-bref-section {
  background-color: var(--color-teal-enbref-bg);
  overflow-x: hidden;
}

.en-bref-section__inner {
  min-width: 70rem;
  margin: 0 auto;
}

.en-bref-section__title {
  font: normal var(--font-weight-bold) calc(2.375rem * var(--font-scale)) / 1.2 var(--font-family-fraunces);
  color: var(--color-orange);
  text-align: left;
}

.en-bref-section__title-underline {
  display: inline-block;
  border-bottom: 0.125rem solid var(--color-orange);
  padding-bottom: 0.125rem;
  margin-bottom: 0.125rem;
}

.en-bref-section__stats-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  gap: 6rem;
}

.en-bref-section__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.en-bref-section__place {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.en-bref-section__icon {
  flex-shrink: 0;
  width: 6.25rem;
  height: 6.25rem;
  object-fit: contain;
  margin-right: 1rem;
}

.first-stat {
  width: 8.5rem;
  justify-content: center;
}

.second-stat {
  width: 20.5rem;
  justify-content: center;
}

.first-place {
  width: 22.5rem;
  align-items: center;
}

.second-place {
  width: 22.5rem;
  align-items: center;
}

.en-bref-section__stat-number {
}

.en-bref-section__icon--svg {
  color: var(--color-orange);
}

.en-bref-section__icon--svg :deep(svg) {
  width: 3rem;
  height: 3rem;
}

.en-bref-section__link-wrap {
  font: normal var(--font-weight-normal) calc(1.25rem * var(--font-scale)) / calc(2.5rem * var(--font-scale)) var(--font-family-ubuntu);
  color: var(--color-teal-dark);
  text-align: center;
  margin: 0;
}

.en-bref-section__link {
  color: var(--color-orange);
  text-decoration: underline;
}
</style>
