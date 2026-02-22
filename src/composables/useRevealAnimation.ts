import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export type RevealDirection = 'left' | 'right'

/** When the timeline should start relative to the trigger element entering the viewport. */
export interface ScrollTriggerRevealOptions {
  /** Element that triggers the animation when it enters the viewport. Defaults to the first animated element's parent. */
  trigger?: Ref<Element | null | undefined> | Element
  /** When to start the animation. Default "top 70%" = when trigger's top hits 70% down the viewport. */
  start?: string
  /** When to end the scrub (only used if scrub is set). */
  end?: string
  /** If true, animation plays once and does not reverse when scrolling back. Default true. */
  once?: boolean
}

export interface RevealElementConfig {
  /** Template ref or raw element to animate */
  el: Ref<Element | null | undefined> | Element
  /** Direction from which the element enters */
  direction?: RevealDirection
  /** Delay in seconds before this element starts */
  delay?: number
  /** Override duration for this element (seconds) */
  duration?: number
}

export interface UseRevealAnimationOptions {
  /** Elements to reveal (order defines sequence when using stagger) */
  elements: RevealElementConfig[]
  /** Duration of each reveal animation in seconds */
  duration?: number
  /** Horizontal distance (px) to animate from */
  offset?: number
  /** Stagger (seconds) between elements when no per-element delay is set */
  stagger?: number
  /** Ease string or array for GSAP */
  ease?: string
  /** If true, run the animation on mount; otherwise call run() manually. Ignored when scrollTrigger is set. */
  runOnMount?: boolean
  /** When set, the reveal runs when the user scrolls to the trigger element instead of on mount. */
  scrollTrigger?: boolean | ScrollTriggerRevealOptions
}

const DEFAULT_DURATION = 0.6
const DEFAULT_OFFSET = 60
const DEFAULT_EASE = 'power2.out'

function resolveEl(
  config: RevealElementConfig,
): Element | null {
  const raw = config.el
  if (raw instanceof Element) return raw
  const ref = raw as Ref<Element | null | undefined>
  return ref?.value ?? null
}

function resolveTrigger(
  scrollTriggerOpts: ScrollTriggerRevealOptions,
  firstElement: Element | null,
): Element | null {
  const raw = scrollTriggerOpts.trigger
  if (!raw) return firstElement?.parentElement ?? firstElement ?? null
  if (raw instanceof Element) return raw
  return (raw as Ref<Element | null | undefined>).value ?? null
}

/**
 * Composable for GSAP reveal animations: elements enter from left or right
 * and fade in from opacity 0. Run only on the client (use inside onMounted).
 * Use scrollTrigger to start the animation when the section enters the viewport.
 */
export function useRevealAnimation(options: UseRevealAnimationOptions) {
  const {
    elements,
    duration = DEFAULT_DURATION,
    offset = DEFAULT_OFFSET,
    stagger = 0,
    ease = DEFAULT_EASE,
    runOnMount = true,
    scrollTrigger: scrollTriggerOpt,
  } = options

  /**
   * Builds and runs the reveal animation. When scrollTrigger is set, the timeline
   * is tied to ScrollTrigger and returns a cleanup function for onUnmounted.
   */
  function run(): (() => void) | void {
    if (typeof window === 'undefined') return

    const targets: Array<{ el: Element; direction: RevealDirection; delay?: number; duration?: number }> = []
    for (const config of elements) {
      const el = resolveEl(config)
      if (!el) continue
      targets.push({
        el,
        direction: config.direction ?? 'left',
        delay: config.delay,
        duration: config.duration,
      })
    }

    if (targets.length === 0) return

    const stConfig =
      scrollTriggerOpt === true
        ? { once: true, start: 'top 70%' as const }
        : scrollTriggerOpt
          ? {
              once: scrollTriggerOpt.once ?? true,
              start: scrollTriggerOpt.start ?? 'top 70%',
              end: scrollTriggerOpt.end,
              trigger: scrollTriggerOpt.trigger,
            }
          : null

    const timelineVars: gsap.TimelineVars = { defaults: { ease } }
    if (stConfig) {
      const firstTarget = targets[0]
      const triggerEl = firstTarget
        ? resolveTrigger(
            { ...stConfig, trigger: stConfig.trigger },
            firstTarget.el,
          )
        : null
      if (triggerEl) {
        timelineVars.scrollTrigger = {
          trigger: triggerEl,
          start: stConfig.start,
          end: stConfig.end,
          toggleActions: stConfig.once ? 'play none none none' : 'play none reverse none',
        }
      }
    }

    const timeline = gsap.timeline(timelineVars)

    targets.forEach(({ el, direction, delay: elDelay, duration: elDuration }, i) => {
      const fromX = direction === 'left' ? -offset : offset
      const d = elDuration ?? duration
      const startAt = elDelay != null ? elDelay : i * stagger
      timeline.fromTo(
        el,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 1, duration: d },
        startAt,
      )
    })

    if (stConfig && timeline.scrollTrigger) {
      return () => timeline.scrollTrigger?.kill()
    }
  }

  return { run, runOnMount }
}
