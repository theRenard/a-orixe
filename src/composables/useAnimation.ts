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
    const innerpanel = panel.querySelector<HTMLElement>('.section-inner')
    if (!innerpanel) return

    const panelHeight = innerpanel.offsetHeight
    const windowHeight = window.innerHeight
    const difference = panelHeight - windowHeight
    const fakeScrollRatio =
      difference > 0 ? difference / (difference + windowHeight) : 0

    if (fakeScrollRatio) {
      panel.style.marginBottom = panelHeight * fakeScrollRatio + 'px'
    }

    /* Animation type: pin + scrub — section pins, timeline scrubs with scroll */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'bottom bottom',
        end: () =>
          fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : 'bottom top',
        pinSpacing: false,
        pin: true,
        scrub: true,
        markers: true,
      },
    })

    /* Animation type: fake-scroll — inner content scrolls up (tall sections only) */
    if (fakeScrollRatio) {
      tl.to(innerpanel, {
        yPercent: -100,
        y: window.innerHeight,
        duration: 1 / (1 - fakeScrollRatio) - 1,
        ease: 'none',
      })
    }
    /* Animation type: scale + fade — section scales down and fades out */
    tl.fromTo(
      panel,
      { scale: 1, opacity: 1 },
      { scale: 1, opacity: 0, duration: 0.5, yPercent: -100 },
    ).to(panel, { opacity: 0, duration: 0.1 })
  })
}
