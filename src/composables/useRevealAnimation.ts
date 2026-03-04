import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Ref } from 'vue'
import { isMobileViewport } from '@/composables/useMobileDetection'

gsap.registerPlugin(ScrollTrigger)

export type RevealDirection = 'left' | 'right' | 'up' | 'down'

/** When the timeline should start relative to the trigger element entering the viewport. */
export interface ScrollTriggerRevealOptions {
  /** Element that triggers the animation when it enters the viewport. Defaults to the first animated element's parent. */
  trigger?: Ref<Element | null | undefined> | Element
  /** When to start the animation. Default "top bottom" = when trigger's top hits the viewport bottom (section starts to be visible). */
  start?: string
  /** When to end the scrub (only used if scrub is set). */
  end?: string
  /** If true, animation plays once and does not reverse when scrolling back. Default true. */
  once?: boolean
}

/** One step in a multi-step reveal: animate to the given values over the given duration. */
export interface RevealStep {
  /** Target values for this step (e.g. scale, opacity, x, y, rotation). Omitted props keep previous step's end values. */
  to: gsap.TweenVars
  /** Duration of this step in seconds */
  duration: number
  /** Optional ease for this step (defaults to timeline ease) */
  ease?: string
  /** Delay in seconds before this step starts (gap after the previous step). */
  delay?: number
  /** Target opacity for this step (shorthand; same as including opacity in to). */
  opacity?: number
  /** Target scale for this step (shorthand; same as including scale in to). */
  scale?: number
  /** Target rotation in degrees for this step (shorthand; same as including rotation in to). */
  rotation?: number
  /** Target x in px for this step (shorthand; same as including x in to). */
  x?: number
  /** Target y in px for this step (shorthand; same as including y in to). */
  y?: number
  /** Transform origin for this step (overrides element default; e.g. '50% 50%', 'center bottom'). */
  transformOrigin?: string
}

export interface RevealElementConfig {
  /** Template ref or raw element to animate */
  el: Ref<Element | null | undefined> | Element
  /** Direction from which the element enters */
  direction?: RevealDirection
  /** Delay in seconds before this element starts */
  delay?: number
  /** Override duration for this element (seconds). Ignored when steps is set. */
  duration?: number
  /** Override horizontal offset (px) for this element */
  offset?: number
  /** Initial rotation in degrees; animates to 0 (e.g. -15 for slight counter-clockwise entrance) */
  rotation?: number
  /** Initial scale; animates to 1 (e.g. 0.7 for zoom-in entrance) */
  scale?: number
  /** Transform origin for this element (e.g. '50% 50%', 'center bottom', 'left top'). Defaults to '50% 50%' when rotation/scale are used. */
  transformOrigin?: string
  /** Initial opacity; animates to 1 (e.g. 0 for fade-in, 0.5 for subtle reveal). Default 0. */
  opacity?: number
  /** When set, run multiple sequential tweens for this element (e.g. scale 0.1 → 1.2 → 1). Each step has its own duration and optional ease. */
  steps?: RevealStep[]
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

const DEFAULT_DURATION = 2
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

function mergeTweenVars(
  base: gsap.TweenVars,
  overrides: gsap.TweenVars,
): gsap.TweenVars {
  return { ...base, ...overrides }
}

type ResolvedTarget = {
  el: Element
  direction: RevealDirection
  delay?: number
  duration?: number
  offset?: number
  rotation?: number
  scale?: number
  opacity?: number
  transformOrigin?: string
  steps?: RevealStep[]
}

function resolveTargets(
  elements: RevealElementConfig[],
  offsetPx: number,
): ResolvedTarget[] {
  const targets: ResolvedTarget[] = []
  for (const config of elements) {
    const el = resolveEl(config)
    if (!el) continue
    targets.push({
      el,
      direction: config.direction ?? 'left',
      delay: config.delay,
      duration: config.duration,
      offset: config.offset,
      rotation: config.rotation,
      scale: config.scale,
      opacity: config.opacity,
      transformOrigin: config.transformOrigin,
      steps: config.steps?.length ? config.steps : undefined,
    })
  }
  return targets
}

function applyInitialFromState(
  targets: ResolvedTarget[],
  offsetPx: number,
): void {
  targets.forEach((target) => {
    const {
      el,
      direction,
      offset: elOffset,
      rotation: elRotation,
      scale: elScale,
      opacity: elOpacity,
      transformOrigin: elTransformOrigin,
      steps: elSteps,
    } = target
    const dist = elOffset ?? offsetPx
    const origin = elTransformOrigin ?? '50% 50%'
    const hasScaleOrRotation =
      (elScale != null && elScale !== 1) ||
      (elRotation != null && elRotation !== 0) ||
      (elSteps?.some((s) => 'scale' in s.to || 'rotation' in s.to) ?? false)
    if (hasScaleOrRotation || elTransformOrigin != null || (elSteps?.some((s) => s.transformOrigin != null) ?? false)) {
      gsap.set(el, { transformOrigin: origin, force3D: !!hasScaleOrRotation })
    }
    const fromVars: gsap.TweenVars = { opacity: elOpacity ?? 0 }
    if (direction === 'left' || direction === 'right') {
      fromVars.x = direction === 'left' ? -dist : dist
    } else {
      fromVars.y = direction === 'up' ? -dist : dist
    }
    if (elRotation != null && elRotation !== 0) {
      fromVars.rotation = elRotation
      fromVars.transformOrigin = origin
    }
    if (elScale != null && elScale !== 1) {
      fromVars.scale = elScale
      fromVars.transformOrigin = origin
      fromVars.force3D = true
    }
    if (elTransformOrigin != null && elRotation == null && (elScale == null || elScale === 1)) {
      fromVars.transformOrigin = origin
    }
    gsap.set(el, fromVars)
  })
}

/**
 * Composable for GSAP reveal animations: elements enter from left, right, up, or down
 * and fade in from opacity 0. Run only on the client (use inside onMounted).
 * Use scrollTrigger to start the animation when the section enters the viewport.
 * When using registerBlockEnter (mobile), call setInitialState() in onMounted so
 * elements start hidden and don't flash in final position before the animation.
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
   * Applies the initial "from" state to all reveal elements so they are hidden until
   * run() plays. Call this in onMounted: on desktop before block-enter; on mobile
   * before run() sets up ScrollTrigger, so elements stay hidden until scroll triggers the reveal.
   */
  function setInitialState(): void {
    if (typeof window === 'undefined') return
    const targets = resolveTargets(elements, offset)
    if (targets.length === 0) return
    applyInitialFromState(targets, offset)
  }

  /**
   * Builds and runs the reveal animation. When scrollTrigger is set, the timeline
   * is tied to ScrollTrigger and returns a cleanup function for onUnmounted.
   */
  function run(): (() => void) | void {
    if (typeof window === 'undefined') return

    const targets = resolveTargets(elements, offset)

    if (targets.length === 0) return

    const isMobile = isMobileViewport()

    /** Apply initial "from" state so elements are hidden until timeline plays (desktop: block-enter; mobile: ScrollTrigger). */
    applyInitialFromState(targets, offset)

    /** On mobile: per-element ScrollTrigger so each element reveals when it reaches 80% viewport. */
    const MOBILE_START = 'top 90%'
    if (isMobile) {
      const killList: (() => void)[] = []
      targets.forEach((target, i) => {
        const {
          el,
          direction,
          delay: elDelay,
          duration: elDuration,
          offset: elOffset,
          rotation: elRotation,
          scale: elScale,
          opacity: elOpacity,
          transformOrigin: elTransformOrigin,
          steps: elSteps,
        } = target
        const dist = elOffset ?? offset
        const d = elDuration ?? duration
        const origin = elTransformOrigin ?? '50% 50%'
        const hasScaleOrRotation =
          (elScale != null && elScale !== 1) ||
          (elRotation != null && elRotation !== 0) ||
          (elSteps?.some((s) => 'scale' in s.to || 'rotation' in s.to) ?? false)
        const needsTransformOrigin =
          hasScaleOrRotation || elTransformOrigin != null || (elSteps?.some((s) => s.transformOrigin != null) ?? false)
        if (needsTransformOrigin) {
          gsap.set(el, { transformOrigin: origin, force3D: hasScaleOrRotation })
        }

        const fromVars: gsap.TweenVars = { opacity: elOpacity ?? 0 }
        if (direction === 'left' || direction === 'right') {
          fromVars.x = direction === 'left' ? -dist : dist
        } else {
          fromVars.y = direction === 'up' ? -dist : dist
        }
        if (elRotation != null && elRotation !== 0) {
          fromVars.rotation = elRotation
          fromVars.transformOrigin = origin
        }
        if (elScale != null && elScale !== 1) {
          fromVars.scale = elScale
          fromVars.transformOrigin = origin
          fromVars.force3D = true
        }
        if (elTransformOrigin != null && elRotation == null && (elScale == null || elScale === 1)) {
          fromVars.transformOrigin = origin
        }

        if (elSteps?.length) {
          const revealEndDefaults: gsap.TweenVars = {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
          }
          if (hasScaleOrRotation) {
            revealEndDefaults.transformOrigin = origin
            revealEndDefaults.force3D = true
          }
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: MOBILE_START,
              once: true,
              toggleActions: 'play none none none',
              // markers: true,
            },
            defaults: { ease },
          })
          killList.push(() => tl.scrollTrigger?.kill())
          let prevEndState: gsap.TweenVars = { ...revealEndDefaults }
          let position = 0
          for (const [stepIndex, step] of elSteps.entries()) {
            if (step.delay != null) position += step.delay
            const mergedTo = mergeTweenVars(
              stepIndex === 0 ? revealEndDefaults : prevEndState,
              step.to,
            )
            if (step.opacity != null) mergedTo.opacity = step.opacity
            if (step.scale != null) mergedTo.scale = step.scale
            if (step.rotation != null) mergedTo.rotation = step.rotation
            if (step.x != null) mergedTo.x = step.x
            if (step.y != null) mergedTo.y = step.y
            const stepOrigin = step.transformOrigin ?? origin
            mergedTo.transformOrigin = stepOrigin
            mergedTo.force3D = true
            const toVars: gsap.TweenVars = {
              ...mergedTo,
              duration: step.duration,
              ease: step.ease ?? ease,
            }
            if (stepIndex === 0) {
              tl.to(el, toVars, position)
            } else {
              tl.fromTo(el, { ...prevEndState, transformOrigin: stepOrigin, force3D: true }, toVars, position)
            }
            position += step.duration
            prevEndState = { ...mergedTo }
          }
        } else {
          const toVars: gsap.TweenVars = { opacity: 1, duration: d, ease }
          if (direction === 'left' || direction === 'right') {
            toVars.x = 0
          } else {
            toVars.y = 0
          }
          if (elRotation != null && elRotation !== 0) {
            toVars.rotation = 0
            toVars.transformOrigin = origin
          }
          if (elScale != null && elScale !== 1) {
            toVars.scale = 1
            toVars.transformOrigin = origin
            toVars.force3D = true
          }
          if (elTransformOrigin != null && elRotation == null && (elScale == null || elScale === 1)) {
            toVars.transformOrigin = origin
          }
          const tween = gsap.to(el, {
            ...toVars,
            scrollTrigger: {
              trigger: el,
              start: MOBILE_START,
              once: true,
              toggleActions: 'play none none none',
              // markers: true,
            },
          })
          killList.push(() => tween.scrollTrigger?.kill())
        }
      })
      return () => killList.forEach((kill) => kill())
    }

    /** Desktop: one timeline, one ScrollTrigger (or none for block-enter). */
    const stConfig = scrollTriggerOpt === true
      ? { once: true, start: 'top bottom' as const, end: undefined as undefined, trigger: undefined as undefined }
      : scrollTriggerOpt
        ? {
          once: scrollTriggerOpt.once ?? true,
          start: scrollTriggerOpt.start ?? 'top bottom',
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
          // markers: true,
        }
      }
    }

    const timeline = gsap.timeline(timelineVars)

    targets.forEach((target, i) => {
      const {
        el,
        direction,
        delay: elDelay,
        duration: elDuration,
        offset: elOffset,
        rotation: elRotation,
        scale: elScale,
        opacity: elOpacity,
        transformOrigin: elTransformOrigin,
        steps: elSteps,
      } = target
      const dist = elOffset ?? offset
      const d = elDuration ?? duration
      const startAt = elDelay != null ? elDelay : i * stagger
      const origin = elTransformOrigin ?? '50% 50%'
      const hasScaleOrRotation =
        (elScale != null && elScale !== 1) ||
        (elRotation != null && elRotation !== 0) ||
        (elSteps?.some((s) => 'scale' in s.to || 'rotation' in s.to) ?? false)
      const needsTransformOrigin =
        hasScaleOrRotation || elTransformOrigin != null || (elSteps?.some((s) => s.transformOrigin != null) ?? false)
      if (needsTransformOrigin) {
        gsap.set(el, { transformOrigin: origin, force3D: hasScaleOrRotation })
      }

      function buildInitialFrom(): gsap.TweenVars {
        const fromVars: gsap.TweenVars = { opacity: elOpacity ?? 0 }
        if (direction === 'left' || direction === 'right') {
          fromVars.x = direction === 'left' ? -dist : dist
        } else {
          fromVars.y = direction === 'up' ? -dist : dist
        }
        if (elRotation != null && elRotation !== 0) {
          fromVars.rotation = elRotation
          fromVars.transformOrigin = origin
        }
        if (elScale != null && elScale !== 1) {
          fromVars.scale = elScale
          fromVars.transformOrigin = origin
          fromVars.force3D = true
        }
        if (elTransformOrigin != null && elRotation == null && (elScale == null || elScale === 1)) {
          fromVars.transformOrigin = origin
        }
        return fromVars
      }

      function applyOriginAndForce3D(vars: gsap.TweenVars): void {
        if (hasScaleOrRotation) {
          vars.transformOrigin = origin
          vars.force3D = true
        }
      }

      if (elSteps?.length) {
        const revealEndDefaults: gsap.TweenVars = {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
        }
        applyOriginAndForce3D(revealEndDefaults)

        let position = startAt
        let prevEndState: gsap.TweenVars = { ...revealEndDefaults }

        for (const [stepIndex, step] of elSteps.entries()) {
          if (step.delay != null) position += step.delay
          const mergedTo = mergeTweenVars(
            stepIndex === 0 ? revealEndDefaults : prevEndState,
            step.to,
          )
          if (step.opacity != null) mergedTo.opacity = step.opacity
          if (step.scale != null) mergedTo.scale = step.scale
          if (step.rotation != null) mergedTo.rotation = step.rotation
          if (step.x != null) mergedTo.x = step.x
          if (step.y != null) mergedTo.y = step.y
          const stepOrigin = step.transformOrigin ?? origin
          const stepHasTransform =
            hasScaleOrRotation ||
            step.scale != null ||
            step.rotation != null ||
            step.transformOrigin != null
          if (stepHasTransform) {
            timeline.add(
              () => { gsap.set(el, { transformOrigin: stepOrigin, force3D: true }) },
              position,
            )
            mergedTo.transformOrigin = stepOrigin
            mergedTo.force3D = true
          } else {
            applyOriginAndForce3D(mergedTo)
          }
          const toVars: gsap.TweenVars = {
            ...mergedTo,
            duration: step.duration,
            ease: step.ease ?? ease,
          }
          if (stepIndex === 0) {
            timeline.to(el, toVars, position)
          } else {
            const fromVars: gsap.TweenVars = { ...prevEndState }
            if (stepHasTransform) {
              fromVars.transformOrigin = stepOrigin
              fromVars.force3D = true
            } else {
              applyOriginAndForce3D(fromVars)
            }
            timeline.fromTo(el, fromVars, toVars, position)
          }
          position += step.duration
          prevEndState = { ...mergedTo }
        }
      } else {
        const toVars: gsap.TweenVars = { opacity: 1, duration: d }
        if (direction === 'left' || direction === 'right') {
          toVars.x = 0
        } else {
          toVars.y = 0
        }
        if (elRotation != null && elRotation !== 0) {
          toVars.rotation = 0
          toVars.transformOrigin = origin
        }
        if (elScale != null && elScale !== 1) {
          toVars.scale = 1
          toVars.transformOrigin = origin
          toVars.force3D = true
        }
        if (elTransformOrigin != null && elRotation == null && (elScale == null || elScale === 1)) {
          toVars.transformOrigin = origin
        }
        timeline.to(el, toVars, startAt)
      }
    })

    if (stConfig && timeline.scrollTrigger) {
      return () => timeline.scrollTrigger?.kill()
    }
  }

  return { run, setInitialState, runOnMount }
}
