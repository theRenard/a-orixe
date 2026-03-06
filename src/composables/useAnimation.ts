import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

if (import.meta.env.DEV) {
  const create = ScrollTrigger.create.bind(ScrollTrigger)
  ScrollTrigger.create = (vars: ScrollTrigger.Vars) => {
    const withMarkers =
      typeof vars === 'object' && vars !== null
        ? { ...vars, markers: vars.markers === false ? false : true }
        : vars
    return create(withMarkers)
  }
}

/**
 * Central place for animation setup. Call once after app mount (e.g. from main.ts).
 * In dev, creates a demo ScrollTrigger for the main scroll area so markers are visible.
 */
export function initAnimation(): void {
  if (!import.meta.env.DEV) return
  requestAnimationFrame(() => {
    const el = document.querySelector('.block-viewport') ?? document.body
    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      markers: true,
    })
  })
}
