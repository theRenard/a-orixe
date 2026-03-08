import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  SCROLL_ENABLED,
  SCROLL_PINNING_MARKERS,
  SECTION_HOLD_SCROLL_PX,
  SECTION_SCROLL_DISTANCE_MULTIPLIER,
  SNAP_ENABLED,
} from '@/config'

gsap.registerPlugin(ScrollTrigger)

let mediaQuery: gsap.MatchMedia | null = null

const SECTION_EXIT_DISTANCE_RATIO = 0.05
const SECTION_FADE_DISTANCE_RATIO = 0.12

/**
 * Section-by-section desktop scroll:
 * - Each section except the last pins at the top of the viewport
 * - Taller sections scroll their inner content while pinned
 * - At the end of the pinned distance, the current section slides away to reveal the next one
 */
export function initAnimation(): void {
  if (!SCROLL_ENABLED) return

  mediaQuery?.revert()
  mediaQuery = gsap.matchMedia()

  mediaQuery.add('(min-width: 48rem)', () => {
    const panels = gsap.utils.toArray<HTMLElement>('.section')
    const pinnedPanels = panels.slice(0, -1)

    pinnedPanels.forEach((panel, index) => {
      const innerPanel = panel.querySelector<HTMLElement>('.section-inner')
      if (!innerPanel) return

      const scaleScrollDistance = (distance: number) =>
        Math.round(Math.max(distance, 0) * SECTION_SCROLL_DISTANCE_MULTIPLIER)
      const getHoldDistance = () => scaleScrollDistance(SECTION_HOLD_SCROLL_PX)
      const getOverflowTravel = () =>
        Math.max(innerPanel.scrollHeight - window.innerHeight, 0)
      const getOverflowScrollDistance = () => scaleScrollDistance(getOverflowTravel())
      const getTransitionTravel = () => Math.round(window.innerHeight * SECTION_EXIT_DISTANCE_RATIO)
      const getTransitionScrollDistance = () => scaleScrollDistance(getTransitionTravel())
      const getFadeScrollDistance = () =>
        scaleScrollDistance(window.innerHeight * SECTION_FADE_DISTANCE_RATIO)
      const getPinDistance = () =>
        getHoldDistance()
        + getOverflowScrollDistance()
        + getTransitionScrollDistance()
        + getFadeScrollDistance()

      gsap.set(panel, {
        clearProps: 'transform,z-index',
      })
      gsap.set(innerPanel, { clearProps: 'transform' })

      const holdDistance = getHoldDistance()
      const overflowDistance = getOverflowScrollDistance()
      const transitionDistance = getTransitionScrollDistance()
      const fadeDistance = getFadeScrollDistance()
      const totalDistance = getPinDistance()
      const holdPortion =
        totalDistance === 0 ? 0 : holdDistance / totalDistance
      const scrollPortion =
        totalDistance === 0 ? 0 : overflowDistance / totalDistance
      const transitionPortion =
        totalDistance === 0 ? 0 : transitionDistance / totalDistance
      const fadePortion =
        totalDistance === 0 ? 0 : fadeDistance / totalDistance

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: panel,
          start: 'top top',
          end: () => `+=${getPinDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 10,
          markers: SCROLL_PINNING_MARKERS,
          snap: SNAP_ENABLED
            ? {
              snapTo: [0, 1],
              delay: 0.1,
              duration: 0.25,
              ease: 'power2.inOut',
            }
            : undefined,
        },
      })

      if (holdPortion > 0) {
        timeline.to({}, { duration: holdPortion })
      }

      if (overflowDistance > 0) {
        timeline.to(innerPanel, {
          y: () => -getOverflowTravel(),
          duration: scrollPortion,
        })
      }

      const transitionStart = holdPortion + scrollPortion

      timeline.to(innerPanel, {
        y: () => -(getOverflowTravel() + getTransitionTravel()),
        duration: transitionPortion,
      }, transitionStart)

      if (transitionPortion + fadePortion > 0) {
        timeline.to(panel, {
          opacity: 0,
          duration: transitionPortion + fadePortion,
          ease: 'none',
        }, transitionStart)
      }
    })

    const lastPanel = panels[panels.length - 1]
    if (lastPanel) {
      gsap.set(lastPanel, {
        clearProps: 'transform,opacity',
        zIndex: 0,
      })
    }

    ScrollTrigger.refresh()

    return () => {
      panels.forEach((panel) => {
        panel.style.removeProperty('margin-bottom')
        gsap.set(panel, { clearProps: 'transform,opacity,z-index' })
        const innerPanel = panel.querySelector<HTMLElement>('.section-inner')
        if (innerPanel) {
          gsap.set(innerPanel, { clearProps: 'transform' })
        }
      })
    }
  })
}
