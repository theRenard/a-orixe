<script setup lang="ts">
import { ref, provide, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useBlockScroll } from '@/composables/useBlockScroll'
import { useMobileDetection } from '@/composables/useMobileDetection'
import HeroIllustration from '@/components/sections/HeroIllustration.vue'
import HeroIllustrationMobile from '@/components/sections/HeroIllustrationMobile.vue'
import CaminoSection from '@/components/sections/CaminoSection.vue'
import EtapesClesSection from '@/components/sections/EtapesClesSection.vue'
import RessentirLieuxSection from '@/components/sections/RessentirLieuxSection.vue'
import FifthTestimonial from '@/components/sections/testimonials/FifthTestimonial.vue'
import FirstTestimonial from '@/components/sections/testimonials/FirstTestimonial.vue'
import SecondTestimonial from '@/components/sections/testimonials/SecondTestimonial.vue'
import AssociationSection from '@/components/sections/AssociationSection.vue'
import ReconstitutionTracSection from '@/components/sections/ReconstitutionTracSection.vue'
import ConcentreGaliceSection from '@/components/sections/ConcentreGaliceSection.vue'
import ThirdTestimonial from '@/components/sections/testimonials/ThirdTestimonial.vue'
import FourthTestimonial from '@/components/sections/testimonials/FourthTestimonial.vue'
import ElementsJacquaireSection from '@/components/sections/ElementsJacquaireSection.vue'
import ParcoursPraticableSection from '@/components/sections/ParcoursPraticableSection.vue'
import MapIllustration from '@/components/sections/MapIllustration.vue'
import SantiagoJourneyPhotoGrid from '@/components/sections/SantiagoJourneyPhotoGrid.vue'
import SantiagoJourneySection from '@/components/sections/SantiagoJourneySection.vue'
import ReconnaissanceSection from '@/components/sections/ReconnaissanceSection.vue'
import ReconnaissanceFootnoteSection from '@/components/sections/ReconnaissanceFootnoteSection.vue'
import FlechageSection from '@/components/sections/FlechageSection.vue'
import SignalisationSection from '@/components/sections/SignalisationSection.vue'
import CoupDeCoeurSection from '@/components/sections/CoupDeCoeurSection.vue'
import JoyauSection from '@/components/sections/JoyauSection.vue'
import DeconnexionSection from '@/components/sections/DeconnexionSection.vue'
import CapsuleSonoreSection from '@/components/sections/CapsuleSonoreSection.vue'
import PilgrimsStatsSection from '@/components/sections/PilgrimsStatsSection.vue'
import TraceRouteSection from '@/components/sections/TraceRouteSection.vue'
import SlowTourismeSection from '@/components/sections/SlowTourismeSection.vue'
import OrixeInterviewSection from '@/components/sections/OrixeInterviewSection.vue'
import ExperienceDestineeSection from '@/components/sections/ExperienceDestineeSection.vue'
import EnBrefSection from '@/components/sections/EnBrefSection.vue'
import CommentEstNeRecitSection from '@/components/sections/CommentEstNeRecitSection.vue'
import ReadProgressBar from '@/components/ReadProgressBar.vue'
import WindowWidthLabel from '@/components/WindowWidthLabel.vue'
// import BlockCounter from '@/components/BlockCounter.vue'
import { MOBILE_ANIMATIONS_ENABLED } from '@/config/feature-flags'

const mainRef = ref<HTMLElement | null>(null)
const railRef = ref<HTMLElement | null>(null)
const { isWide } = useMobileDetection()

const blockEnterCallbacks = new Map<number, () => void>()
function registerBlockEnter(index: number, play: () => void) {
  if (!isWide.value) return
  blockEnterCallbacks.set(index, play)
}
function unregisterBlockEnter(index: number) {
  if (!isWide.value) return
  blockEnterCallbacks.delete(index)
}
provide('blockScroll/registerBlockEnter', registerBlockEnter)
provide('blockScroll/unregisterBlockEnter', unregisterBlockEnter)

useBlockScroll({
  containerRef: mainRef,
  railRef,
  enabled: isWide,
  options: {
    transitionDuration: 1,
    scrollThresholdPx: 80,
    onBlockChange(index) {
      blockEnterCallbacks.get(index)?.()
    },
  },
})

// Desktop: animation = callback when block becomes active (onBlockChange above).
// Mobile: page scrolls normally; fire animation when [data-block] enters viewport.
// Use root: null so intersection is against the viewport (document scroll), not the main container.
// When MOBILE_ANIMATIONS_ENABLED is false, all block animations run once on load so content is visible.
let scrollRevealObserver: IntersectionObserver | null = null
function setupMobileViewportTrigger() {
  const rail = railRef.value
  if (!rail) return
  const blocks = rail.querySelectorAll<HTMLElement>('[data-block]')
  if (blocks.length === 0) return

  if (!MOBILE_ANIMATIONS_ENABLED) {
    requestAnimationFrame(() => {
      blocks.forEach((_, index) => blockEnterCallbacks.get(index)?.())
    })
    return
  }

  const fired = new Set<number>()
  const trigger = (index: number) => {
    if (fired.has(index)) return
    fired.add(index)
    blockEnterCallbacks.get(index)?.()
  }
  scrollRevealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        const index = Array.from(blocks).indexOf(el)
        if (index === -1) continue
        trigger(index)
      }
    },
    { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0 }
  )
  blocks.forEach((block) => scrollRevealObserver?.observe(block))
  requestAnimationFrame(() => requestAnimationFrame(() => trigger(0)))
}
function teardownMobileViewportTrigger() {
  scrollRevealObserver?.disconnect()
  scrollRevealObserver = null
}

onMounted(() => {
  nextTick(() => {
    if (isWide.value) setTimeout(() => blockEnterCallbacks.get(0)?.(), 0)
  })
  watch(
    isWide,
    (wide) => {
      if (wide) {
        teardownMobileViewportTrigger()
      } else {
        nextTick(() => {
          requestAnimationFrame(() => requestAnimationFrame(() => setupMobileViewportTrigger()))
        })
      }
    },
    { immediate: true }
  )
})
onUnmounted(() => {
  teardownMobileViewportTrigger()
})
</script>

<template>
<main ref="mainRef" class="block-viewport">
  <!-- <BlockCounter v-if="isWide" /> -->
  <WindowWidthLabel v-if="isWide" />
  <ReadProgressBar v-if="isWide" :viewport-ref="(mainRef as unknown as { value: HTMLElement | null })"
    :rail-ref="(railRef as unknown as { value: HTMLElement | null })" />
  <div ref="railRef" class="blocks-rail">
    <!--
      -->
    <HeroIllustration v-if="isWide" />
    <HeroIllustrationMobile v-else />
    <CaminoSection />
    <FirstTestimonial />
    <EtapesClesSection />
    <SecondTestimonial />
    <RessentirLieuxSection />
    <FifthTestimonial />
    <AssociationSection />
    <ReconstitutionTracSection />
    <ThirdTestimonial />
    <ElementsJacquaireSection />
    <ParcoursPraticableSection />
    <MapIllustration />
    <ConcentreGaliceSection />
    <SantiagoJourneyPhotoGrid />
    <SantiagoJourneySection />
    <ReconnaissanceSection />
    <ReconnaissanceFootnoteSection />
    <FourthTestimonial />
    <FlechageSection />
    <SignalisationSection />
    <CoupDeCoeurSection />
    <JoyauSection />
    <DeconnexionSection />
    <CapsuleSonoreSection />
    <PilgrimsStatsSection />
    <TraceRouteSection />
    <SlowTourismeSection />
    <OrixeInterviewSection />
    <ExperienceDestineeSection />
    <EnBrefSection />
    <CommentEstNeRecitSection />
  </div>
</main>
</template>
