<script setup lang="ts">
import { ref } from 'vue'
import { useBlockScroll } from '@/composables/useBlockScroll'
import mouseIcon from '@/assets/icons/computer-mouse-icon.svg'
import HeroIllustration from '@/components/sections/HeroIllustration.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import CaminoSection from '@/components/sections/CaminoSection.vue'
import EtapesClesSection from '@/components/sections/EtapesClesSection.vue'
import RessentirLieuxSection from '@/components/sections/RessentirLieuxSection.vue'
import RessentirLieuxClosingSection from '@/components/sections/RessentirLieuxClosingSection.vue'
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
import SantiagoStepsSection from '@/components/sections/SantiagoStepsSection.vue'
import SantiagoJourneyPhotoGrid from '@/components/sections/SantiagoJourneyPhotoGrid.vue'
import SantiagoJourneySection from '@/components/sections/SantiagoJourneySection.vue'
import ReconnaissanceSection from '@/components/sections/ReconnaissanceSection.vue'
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

const mainRef = ref<HTMLElement | null>(null)
const railRef = ref<HTMLElement | null>(null)
useBlockScroll({
  containerRef: mainRef,
  railRef,
  options: { transitionDuration: 0.5 },
})
</script>

<template>
<main ref="mainRef" class="block-viewport">
  <div ref="railRef" class="blocks-rail">
    <div data-block class="block block--first">
      <div data-block-inner class="block-inner">
        <HeroIllustration />
        <div class="scroll-indicator" aria-hidden="true">
          <img :src="mouseIcon" alt="" class="scroll-indicator__icon" />
        </div>
      </div>
    </div>
    <div data-block class="block"><div data-block-inner class="block-inner"><HeroSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><CaminoSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><FirstTestimonial /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><EtapesClesSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><SecondTestimonial /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><RessentirLieuxSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><RessentirLieuxClosingSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><FifthTestimonial /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><AssociationSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><ReconstitutionTracSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><ThirdTestimonial /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><ElementsJacquaireSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><ParcoursPraticableSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><MapIllustration /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><SantiagoStepsSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><ConcentreGaliceSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><SantiagoJourneyPhotoGrid /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><SantiagoJourneySection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><ReconnaissanceSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><FourthTestimonial /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><FlechageSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><SignalisationSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><CoupDeCoeurSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><JoyauSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><DeconnexionSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><CapsuleSonoreSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><PilgrimsStatsSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><TraceRouteSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><SlowTourismeSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><OrixeInterviewSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><ExperienceDestineeSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><EnBrefSection /></div></div>
    <div data-block class="block"><div data-block-inner class="block-inner"><CommentEstNeRecitSection /></div></div>
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

.block {
  height: 100vh;
  flex-shrink: 0;
}

.block-inner {
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.block--first .block-inner {
  position: relative;
}

.scroll-indicator {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.scroll-indicator__icon {
  display: block;
  width: 2rem;
  height: auto;
  animation: scroll-jump 1.2s cubic-bezier(0.33, 1, 0.68, 1) infinite;
}

@keyframes scroll-jump {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.6rem);
  }
}
</style>
