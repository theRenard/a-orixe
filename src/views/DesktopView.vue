<script setup lang="ts">
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

const { isWide } = useMobileDetection()
</script>

<template>
<main>
  <HeroIllustration v-if="isWide" :section-index="1" />
  <HeroIllustrationMobile v-else :section-index="1" />
  <CaminoSection :section-index="2" />
  <FirstTestimonial :section-index="3" />
  <EtapesClesSection :section-index="4" />
  <SecondTestimonial :section-index="5" />
  <RessentirLieuxSection :section-index="6" />
  <FifthTestimonial :section-index="7" />
  <AssociationSection :section-index="8" />
  <ReconstitutionTracSection :section-index="9" />
  <ThirdTestimonial :section-index="10" />
  <ElementsJacquaireSection :section-index="11" />
  <ParcoursPraticableSection :section-index="12" />
  <MapIllustration :section-index="13" />
  <ConcentreGaliceSection :section-index="14" />
  <SantiagoJourneyPhotoGrid :section-index="15" />
  <SantiagoJourneySection :section-index="16" />
  <ReconnaissanceSection :section-index="17" />
  <ReconnaissanceFootnoteSection :section-index="18" />
  <FourthTestimonial :section-index="19" />
  <FlechageSection :section-index="20" />
  <SignalisationSection :section-index="21" />
  <CoupDeCoeurSection :section-index="22" />
  <JoyauSection :section-index="23" />
  <DeconnexionSection :section-index="24" />
  <CapsuleSonoreSection :section-index="25" />
  <PilgrimsStatsSection :section-index="26" />
  <TraceRouteSection :section-index="27" />
  <SlowTourismeSection :section-index="28" />
  <OrixeInterviewSection :section-index="29" />
  <ExperienceDestineeSection :section-index="30" />
  <EnBrefSection :section-index="31" />
  <CommentEstNeRecitSection :section-index="32" />
</main>
</template>
