import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Port of docs/codepen-bGRdvMy-reference/reference.js
 *
 * Animation type: scroll-driven section pinning with scrub
 * - Each section (except last) pins when its bottom hits viewport bottom
 * - Optional inner fake-scroll when content is taller than viewport
 * - Then scale down (1 → 0.7) and fade out (1 → 0.5 → 0)
 */
export function initAnimation(): void {
  const panels = gsap.utils.toArray<HTMLElement>('.section')
  panels.pop()

  panels.forEach((panel) => {
    // Get the element holding the content inside the panel
    const innerpanel = panel.querySelector<HTMLElement>('.section-inner')
    if (!innerpanel) return

    // Get the Height of the content inside the panel
    const panelHeight = innerpanel.offsetHeight
    // Get the window height
    const windowHeight = window.innerHeight
    const difference = panelHeight - windowHeight
    // ratio (between 0 and 1) representing the portion of the overall animation that's for the fake-scrolling. We know that the scale & fade should happen over the course of 1 windowHeight, so we can figure out the ratio based on how far we must fake-scroll
    const fakeScrollRatio =
      difference > 0 ? difference / (difference + windowHeight) : 0

    // if we need to fake scroll (because the panel is taller than the window), add the appropriate amount of margin to the bottom so that the next element comes in at the proper time.
    if (fakeScrollRatio) {
      panel.style.marginBottom = panelHeight * fakeScrollRatio + 'px'
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'bottom bottom',
        end: () =>
          fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : 'bottom top',
        pinSpacing: false,
        pin: true,
        scrub: true,
        // markers: true,
      },
    })

    // fake scroll. We use 1 because that's what the rest of the timeline consists of (0.9 scale + 0.1 fade)
    if (fakeScrollRatio) {
      tl.to(innerpanel, {
        yPercent: -100,
        y: window.innerHeight,
        duration: 1 / (1 - fakeScrollRatio) - 1,
        ease: 'none',
      })
    }
    tl.fromTo(
      panel,
      { scale: 1, opacity: 1 },
      { scale: 1, opacity: 0, duration: 0.5, yPercent: -100 },
    ).to(panel, { opacity: 0, duration: 0.1 })
  })
}
