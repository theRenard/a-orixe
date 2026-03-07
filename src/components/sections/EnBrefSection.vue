<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import phareCorrubedo from '@/assets/illustrations/phare.png'
import cathedrale from '@/assets/illustrations/cathedrale.png'
import { useMobileDetection } from '@/composables/useMobileDetection'
import { useAnimation } from '@/composables/useAnimation'

gsap.registerPlugin(ScrollTrigger)

const { isMobile } = useMobileDetection()
const { locale, t } = useI18n()
const routeDetailUrl = computed(() => `https://aorixe.es/${locale.value === 'es' ? 'es' : 'fr'}`)

const sectionRoot = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const statsRow = ref<HTMLElement | null>(null)
const linkWrap = ref<HTMLElement | null>(null)
const stat1El = ref<HTMLElement | null>(null)
const stat2El = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRoot.value || !title.value) return
  useAnimation({
    trigger: sectionRoot,
    tweens: [
      { el: sectionRoot, from: { y: -80, opacity: 0 }, to: { y: 0, opacity: 1, duration: 3, ease: 'power3.out' } },
      { el: title, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, ease: 'power3.out' } },
      { el: statsRow, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.08, ease: 'power3.out' } },
      { el: linkWrap, from: { x: -80, opacity: 0 }, to: { x: 0, opacity: 1, delay: 0.16, ease: 'power3.out' } },
    ],
  })
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
  })
})
</script>

<doc lang="text">
  Previous animation (useRevealAnimation):
  - elements: [{ el: sectionRoot, direction: 'down', delay: 0, duration: 3 }, { el: title, direction: 'left', delay: 0 }]
  - offset: 44
  - ease: 'power3.out'
  - runOnMount: false
  Count-up timeline (ScrollTrigger):
  - trigger: sectionRoot, start: 'top 70%', once: true
  - stat1El: tween value 0 -> t('enBref.stat1Number'), duration 3, ease power2.out, onUpdate sets el1.textContent
  - stat2El: tween value 0 -> t('enBref.stat2Number'), duration 2, ease power2.out, onUpdate sets el2.textContent
  - positions: 0.2 and 0.35
</doc>

<template>
<section ref="sectionRoot" :class="['section', 'en-bref-section', 'section--full-viewport', { 'pb-10': isMobile }]" data-block data-component="EnBrefSection">
  <div class="section-inner" data-block-inner>
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
            <img :src="phareCorrubedo" :alt="$t('enBref.departurePlace')" class="en-bref-section__icon"
              :class="{ 'paragraph-spacing': isMobile }">
            <div>
              <div class="type__enbref-small-orange--left">{{ $t('enBref.departureLabel') }}</div>
              <div class="type__enbref-small-green">{{ $t('enBref.departurePlace') }}</div>
            </div>
          </div>
          <div class="en-bref-section__place second-place">
            <img :src="cathedrale" :alt="$t('enBref.arrivalPlace')" class="en-bref-section__icon"
              :class="{ 'paragraph-spacing': isMobile }">
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
    </div>
</section>
</template>

<style scoped>
.en-bref-section {
  background-color: var(--color-teal-enbref-bg);
  overflow-x: hidden;
}

.en-bref-section__inner {
  margin: 0 auto;
  text-align: center;
  min-width: 0;
}

@media (min-width: 48rem) {
  .en-bref-section__inner {
    min-width: calc(70rem * var(--scale-xlarge));
    text-align: left;
  }
}

/* Mobile: four blocks in a single column, centered */
.en-bref-section__stats-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: calc(2.5rem * var(--scale-xlarge));
  gap: calc(2rem * var(--scale-xlarge));
}

@media (min-width: 48rem) {
  .en-bref-section__stats-row {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    gap: calc(6rem * var(--scale-xlarge));
  }
}

.en-bref-section__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.en-bref-section__place {
  display: flex;
  align-items: center;
  justify-content: center;
}

.en-bref-section__place>div {
  text-align: center;
}

@media (min-width: 48rem) {
  .en-bref-section__place {
    justify-content: space-between;
  }

  .en-bref-section__place>div {
    text-align: left;
  }
}

.en-bref-section__icon {
  flex-shrink: 0;
  width: calc(6.25rem * var(--scale-xlarge));
  height: calc(6.25rem * var(--scale-xlarge));
  object-fit: contain;
  margin-right: calc(1rem * var(--scale-xlarge));
}

/* Mobile: blocks centered in column, max 50vw per block; desktop: fixed widths */
.first-stat,
.second-stat,
.first-place,
.second-place {
  justify-content: center;
  max-width: 42vw;
  min-width: 42vw;
}

@media (min-width: 48rem) {

  .first-stat,
  .second-stat,
  .first-place,
  .second-place {
    max-width: unset;
    min-width: unset;
  }

  .first-stat {
    width: calc(8.5rem * var(--scale-xlarge));
  }

  .second-stat {
    width: calc(20.5rem * var(--scale-xlarge));
  }

  .first-place,
  .second-place {
    width: calc(22.5rem * var(--scale-xlarge));
    justify-content: space-between;
  }
}

.en-bref-section__link-wrap {
  font: var(--font-style-normal) var(--font-weight-normal) calc(1.25rem * var(--scale-xlarge)) / calc(2.5rem * var(--scale-xlarge)) var(--font-family-ubuntu);
  color: var(--color-teal-dark);
  text-align: center;
  margin: 0;
}

.en-bref-section__link {
  color: var(--color-orange);
  text-decoration: underline;
}

/* En bref section: infographic-style types (from design) */
.type__enbref-big {
  font: normal var(--font-weight-black, 900) calc(8.125rem * var(--scale-xlarge)) / calc(8.125rem * var(--scale-xlarge)) var(--font-family-fraunces);
  letter-spacing: 0;
  color: var(--color-teal-dark);
  text-align: center;
}

.type__enbref-small-green {
  font: normal var(--font-weight-bold) calc(1.5rem * var(--scale-xlarge)) / calc(1.875rem * var(--scale-xlarge)) var(--font-family-fraunces);
  letter-spacing: 0;
  color: var(--color-teal-dark);
  text-align: left;
}

.type__enbref-small-orange {
  font: normal var(--font-weight-bold) calc(1.25rem * var(--scale-xlarge)) / calc(2.5rem * var(--scale-xlarge)) var(--font-family-ubuntu);
  letter-spacing: 0;
  color: var(--color-orange);
  text-align: center;
}

.type__enbref-small-orange--left {
  font: normal var(--font-weight-bold) calc(1.25rem * var(--scale-xlarge)) / calc(2.5rem * var(--scale-xlarge)) var(--font-family-ubuntu);
  letter-spacing: 0;
  color: var(--color-orange);
  text-align: left;
}
</style>
