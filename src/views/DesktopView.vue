<script setup lang="ts">
import { ref } from 'vue'
import { useBlockScroll } from '@/composables/useBlockScroll'
import HeroIllustration from '@/components/sections/HeroIllustration.vue'
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

const mainRef = ref<HTMLElement | null>(null)
const railRef = ref<HTMLElement | null>(null)
useBlockScroll({
  containerRef: mainRef,
  railRef,
  options: {
    transitionDuration: 1,
    scrollThresholdPx: 240,
  },
})
</script>

<template>
<main ref="mainRef" class="block-viewport">
  <WindowWidthLabel />
  <ReadProgressBar :viewport-ref="(mainRef as unknown as { value: HTMLElement | null })"
    :rail-ref="(railRef as unknown as { value: HTMLElement | null })" />
  <div ref="railRef" class="blocks-rail">
    <!--
      -->
    <HeroIllustration />
    <CaminoSection />
    <FirstTestimonial />
    <EtapesClesSection />
    <SecondTestimonial data-validate="ok" />
    <RessentirLieuxSection data-validate="KO" />
    <FifthTestimonial data-validate="ok" />
    <AssociationSection data-validate="ok" />
    <ReconstitutionTracSection data-validate="KO" />
    <ThirdTestimonial data-validate="ok" />
    <ElementsJacquaireSection data-validate="ok" />
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

<style scoped>
.block-viewport {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.blocks-rail {
  will-change: transform;
}

/* Block and block-inner live inside each section component; rail only needs to stack them */
:deep([data-block]) {
  height: 100vh;
  flex-shrink: 0;
}

:deep([data-block-inner]) {
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
