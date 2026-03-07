import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Ref } from 'vue'
import { DEFAULT_ANIMATION_DURATION, REVEAL_ANIMATION_ENABLED } from '@/config'

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
    const el = getElement(tween.el)
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
    start: 'top 70%',
    end: 'top 60%',
    once: false,
    onEnter: () => tl.play(),
    // onEnterBack: () => tl.restart(),
    // markers: true,
  })

  return () => {
    st.kill()
    tl.kill()
  }
}
