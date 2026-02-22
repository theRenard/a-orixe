import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { onMounted, onUnmounted, ref, type Ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export interface UseLenisOptions {
  /** Smooth wheel. Default true. */
  smoothWheel?: boolean
  /** Lerp intensity (0–1). Default 0.1 */
  lerp?: number
  /** Duration for programmatic scroll (seconds). Default 1 */
  duration?: number
}

/**
 * Use Lenis smooth scroll on the document (window).
 * Call only on the client (e.g. in onMounted).
 * Syncs with GSAP ScrollTrigger on each scroll.
 */
export function useLenis(options: UseLenisOptions = {}) {
  const { smoothWheel = true, lerp = 0.1, duration = 1 } = options

  const lenis = ref<Lenis | null>(null) as Ref<Lenis | null>
  let rafId: number

  function scrollTo(top: number, opts?: { duration?: number; immediate?: boolean }) {
    const instance = lenis.value
    if (!instance) return
    instance.scrollTo(top, {
      duration: opts?.immediate ? 0 : (opts?.duration ?? duration),
      programmatic: true,
    })
  }

  function getScroll(): number {
    return lenis.value?.scroll ?? 0
  }

  onMounted(() => {
    if (typeof window === 'undefined') return

    const instance = new Lenis({
      wrapper: window,
      content: document.documentElement,
      smoothWheel,
      lerp,
      duration,
    })

    instance.on('scroll', () => {
      ScrollTrigger.update()
    })

    function raf(time: number) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    lenis.value = instance
  })

  onUnmounted(() => {
    if (lenis.value) {
      lenis.value.destroy()
      lenis.value = null
    }
    if (rafId != null) {
      cancelAnimationFrame(rafId)
    }
  })

  return { lenis, scrollTo, getScroll }
}
