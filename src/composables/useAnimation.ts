import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Ref } from 'vue'
import { DEFAULT_ANIMATION_DURATION, REVEAL_ANIMATION_ENABLED, REVEAL_ANIMATION_MARKERS } from '@/config'

gsap.registerPlugin(ScrollTrigger)

export interface UseAnimationTween {
  el: Ref<HTMLElement | null> | HTMLElement
  from?: gsap.TweenVars
  to: gsap.TweenVars
}

export interface UseAnimationConfig {
  tweens: UseAnimationTween[]
  trigger?: Ref<HTMLElement | null> | HTMLElement
}

function getElement(el: Ref<HTMLElement | null> | HTMLElement): HTMLElement | null {
  if (el && typeof (el as Ref<HTMLElement | null>).value !== 'undefined') {
    return (el as Ref<HTMLElement | null>).value
  }
  return el as HTMLElement
}

function getTweenElement(
  el: Ref<HTMLElement | null> | HTMLElement,
  triggerEl: HTMLElement,
): HTMLElement | null {
  const resolvedEl = getElement(el)
  if (!resolvedEl) return null

  // The outer section may be pinned by ScrollTrigger, which also uses transforms.
  // Animate the stable inner wrapper instead so reveal tweens do not fight the pin transform.
  if (resolvedEl === triggerEl && triggerEl.classList.contains('section')) {
    return triggerEl.querySelector<HTMLElement>('.section-inner') ?? resolvedEl
  }

  return resolvedEl
}

/**
 * Wrapper for a GSAP timeline with ScrollTrigger.
 * Trigger = config.trigger or first tween's el. Tweens use full gsap.TweenVars for from/to.
 * Returns cleanup to call in onUnmounted.
 */
export function useAnimation(config: UseAnimationConfig): () => void {
  if (!REVEAL_ANIMATION_ENABLED) return () => { }

  const tweens = config.tweens
  const triggerEl = config.trigger
    ? getElement(config.trigger)
    : tweens[0]
      ? getElement(tweens[0].el)
      : null
  if (!triggerEl) return () => { }

  const tl = gsap.timeline({ paused: true })

  for (const tween of tweens) {
    const el = getTweenElement(tween.el, triggerEl)
    if (!el) continue
    const from = tween.from ?? {}
    gsap.set(el, from)
    const to =
      tween.to.duration === undefined
        ? { ...tween.to, duration: DEFAULT_ANIMATION_DURATION }
        : tween.to
    tl.fromTo(el, from, to, 0)
  }

  // gsap.set(triggerEl, { opacity: 0 })

  const st = ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top 50%',
    end: 'top -20%',
    once: false,
    invalidateOnRefresh: true,
    refreshPriority: -10,
    onEnter: () => tl.play(),
    onEnterBack: () => tl.restart(),
    markers: REVEAL_ANIMATION_MARKERS,
  })

  return () => {
    st.kill()
    tl.kill()
  }
}
