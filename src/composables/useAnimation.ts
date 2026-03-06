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

const WIDE_MEDIA = '(min-width: 48rem)'

let pinTriggers: ScrollTrigger[] = []

function setupSlidePinning(): void {
  const rail = document.querySelector('.block-viewport')
  if (!rail) return

  const panels = Array.from(rail.querySelectorAll<HTMLElement>('[data-block]'))
  if (panels.length === 0) return

  // Last section does not pin (like reference panels.pop())
  const panelsToPin = panels.slice(0, -1)

  pinTriggers = []

  panelsToPin.forEach((panel) => {
    const inner = panel.querySelector<HTMLElement>('[data-block-inner]')
    if (!inner) return

    const panelHeight = inner.offsetHeight
    const windowHeight = window.innerHeight
    const difference = panelHeight - windowHeight
    const fakeScrollRatio =
      difference > 0 ? difference / (difference + windowHeight) : 0

    if (fakeScrollRatio > 0) {
      panel.style.marginBottom = `${panelHeight * fakeScrollRatio}px`
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'bottom bottom',
        end: fakeScrollRatio
          ? `+=${inner.offsetHeight}`
          : 'bottom top',
        pinSpacing: false,
        pin: true,
        scrub: true,
      },
    })

    const st = tl.scrollTrigger
    if (st) pinTriggers.push(st)

    if (fakeScrollRatio > 0) {
      tl.to(inner, {
        yPercent: -100,
        y: windowHeight,
        duration: 1 / (1 - fakeScrollRatio) - 1,
        ease: 'none',
      })
    }
    tl.fromTo(
      panel,
      { scale: 1, opacity: 1 },
      { scale: 0.7, opacity: 0.5, duration: 0.9 },
    ).to(panel, { opacity: 0, duration: 0.1 })
  })
}

function killPinTriggers(): void {
  pinTriggers.forEach((st) => st.kill())
  pinTriggers = []
  // Clear marginBottom set by JS so layout is clean on narrow
  const rail = document.querySelector('.block-viewport')
  if (rail) {
    rail.querySelectorAll<HTMLElement>('[data-block]').forEach((el) => {
      el.style.marginBottom = ''
    })
  }
}

/**
 * Central place for animation setup. Call once after app mount (e.g. from main.ts).
 * On desktop (wide viewport), sets up GSAP ScrollTrigger slide pinning; on narrow, does nothing.
 * Resize is handled: switching to narrow kills triggers, switching to wide re-runs setup.
 */
export function initAnimation(): void {
  const mq = window.matchMedia(WIDE_MEDIA)

  function run(): void {
    if (mq.matches) {
      requestAnimationFrame(() => setupSlidePinning())
    } else {
      killPinTriggers()
    }
  }

  mq.addEventListener('change', run)

  run()
}
