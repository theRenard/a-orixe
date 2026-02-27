import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export interface UseBlockScrollOptions {
  /** Duration (s) for transition to next block. Default 0.8 */
  transitionDuration?: number
  /** Ease for block transition. Default 'power2.out' */
  transitionEase?: string
  /** Wheel delta (px) to accumulate before advancing to next block. Default 120 */
  scrollThresholdPx?: number
  /** Cooldown (ms) after advancing during which wheel is ignored. Default 500 */
  cooldownMs?: number
  /** Called when the block changes (next or previous) with the new block index. */
  onBlockChange?: (index: number) => void
}

export interface UseBlockScrollInput {
  /** Viewport element: contains the blocks rail and has [data-block] children. */
  containerRef: { value: HTMLElement | null }
  /** Optional ref to the rail element (the one that gets translateY). If not set, first child of container is used. */
  railRef?: { value: HTMLElement | null }
  /** When provided and false, block-scroll is disabled (no wheel handling). Used for narrow viewports. */
  enabled?: { value: boolean }
  options?: UseBlockScrollOptions
}

/**
 * Block-based navigation: scroll (wheel) is only a trigger.
 * - User can scroll within a block if it has [data-block-inner] with overflow (content taller than viewport).
 * - At the end of a block, scroll down advances to the next block.
 * - Scrolling up (when at top of block) goes to the previous block.
 * Call only on the client (e.g. after mount).
 */
export function useBlockScroll(input: UseBlockScrollInput) {
  const { containerRef, railRef, enabled, options: opts = {} } = input
  const isEnabled = () => enabled === undefined || enabled.value
  const {
    transitionDuration = 0.8,
    transitionEase = 'power2.out',
    scrollThresholdPx = 120,
    cooldownMs = 500,
    onBlockChange,
  } = opts

  const currentBlockIndex = ref(0)
  /** Cached scroll position so the proxy returns the value from the current frame during the rail tween (ScrollTrigger then fires when section enters viewport). */
  let currentScrollTop = 0
  let rafId: number | undefined
  let teardownProxy: (() => void) | null = null
  let accumulatedDelta = 0
  let cooldownUntil = 0

  function getRail(): HTMLElement | null {
    const rail = railRef?.value
    if (rail) return rail
    return containerRef.value?.firstElementChild as HTMLElement | null
  }

  function getBlockElements(): HTMLElement[] {
    const container = containerRef.value
    if (!container) return []
    const rail = getRail()
    const parent = rail ?? container
    return Array.from(parent.querySelectorAll<HTMLElement>('[data-block]'))
  }

  function getCurrentBlock(): HTMLElement | null {
    const blocks = getBlockElements()
    const idx = currentBlockIndex.value
    return blocks[idx] ?? null
  }

  /** Inner scrollable area inside a block ([data-block-inner]). */
  function getBlockInner(block: HTMLElement): HTMLElement | null {
    return block.querySelector<HTMLElement>('[data-block-inner]')
  }

  function isScrollableAtBottom(block: HTMLElement): boolean {
    const inner = getBlockInner(block)
    if (!inner) return true // no inner scroll → consider "at end"
    const { scrollTop, scrollHeight, clientHeight } = inner
    const atBottom = scrollTop + clientHeight >= scrollHeight - 2
    return atBottom
  }

  function isScrollableAtTop(block: HTMLElement): boolean {
    const inner = getBlockInner(block)
    if (!inner) return true
    return inner.scrollTop <= 2
  }

  function hasScrollableInner(block: HTMLElement): boolean {
    const inner = getBlockInner(block)
    if (!inner) return false
    return inner.scrollHeight > inner.clientHeight
  }

  function goToBlock(index: number) {
    const blocks = getBlockElements()
    if (index < 0 || index >= blocks.length) return
    currentBlockIndex.value = index
    const vh = window.innerHeight
    currentScrollTop = index * vh
    const rail = getRail()
    if (rail) gsap.set(rail, { y: -index * vh })
    nextTick(() => ScrollTrigger.update())
  }

  function applyRailTransform() {
    const rail = getRail()
    if (!rail) return
    const vh = window.innerHeight
    const y = -currentBlockIndex.value * vh
    ScrollTrigger.update()
    gsap.to(rail, {
      y,
      duration: transitionDuration,
      ease: transitionEase,
      onUpdate: function () {
        const railY = gsap.getProperty(rail, 'y') as number
        currentScrollTop = typeof railY === 'number' ? -railY : currentBlockIndex.value * vh
        ScrollTrigger.update()
      },
      onComplete: () => {
        currentScrollTop = currentBlockIndex.value * vh
        ScrollTrigger.refresh()
      },
    })
  }

  function onWheel(e: WheelEvent) {
    if (!isEnabled()) return
    const blocks = getBlockElements()
    if (blocks.length === 0) return

    const block = getCurrentBlock()
    if (!block) return

    const now = Date.now()
    if (now < cooldownUntil) {
      e.preventDefault()
      return
    }

    const deltaY = e.deltaY
    const scrollingDown = deltaY > 0
    const scrollingUp = deltaY < 0

    if (scrollingDown) {
      const canScrollWithin = hasScrollableInner(block) && !isScrollableAtBottom(block)
      if (canScrollWithin) {
        accumulatedDelta = 0
        return
      }
      // At end of block → accumulate then go to next
      if (accumulatedDelta < 0) accumulatedDelta = 0
      accumulatedDelta += deltaY
      if (accumulatedDelta >= scrollThresholdPx && currentBlockIndex.value < blocks.length - 1) {
        e.preventDefault()
        accumulatedDelta = 0
        cooldownUntil = now + cooldownMs
        currentBlockIndex.value++
        onBlockChange?.(currentBlockIndex.value)
        ScrollTrigger.update()
        applyRailTransform()
      } else if (currentBlockIndex.value >= blocks.length - 1) {
        e.preventDefault()
      }
      return
    }

    if (scrollingUp) {
      const canScrollWithin = hasScrollableInner(block) && !isScrollableAtTop(block)
      if (canScrollWithin) {
        accumulatedDelta = 0
        return
      }
      // At top of block: accumulate wheel delta, then go to previous block
      if (accumulatedDelta > 0) accumulatedDelta = 0
      accumulatedDelta += deltaY
      const prevBlockIndex = currentBlockIndex.value - 1
      if (accumulatedDelta <= -scrollThresholdPx && prevBlockIndex >= 0) {
        e.preventDefault()
        accumulatedDelta = 0
        cooldownUntil = now + cooldownMs
        currentBlockIndex.value = prevBlockIndex
        onBlockChange?.(currentBlockIndex.value)
        ScrollTrigger.update()
        applyRailTransform()
      } else if (currentBlockIndex.value > 0) {
        e.preventDefault()
      }
    }
  }

  function setupScrollProxy() {
    const container = containerRef.value
    if (!container) return
    // ScrollTrigger's default scroller is typically document.body (or window); proxy both so triggers see our block-based "scroll".
    // Use cached currentScrollTop (updated in tween onUpdate) so ScrollTrigger sees smooth scroll during the transition and fires when the section enters the viewport.
    const vh = window.innerHeight
    const getScrollTop = () => currentScrollTop
    const getScrollHeight = () => getBlockElements().length * vh
    const getRect = () => ({
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: vh,
    })
    const proxyVars = {
      scrollTop(value?: number) {
        if (arguments.length) return /* setter: no-op, we control scroll via block index */
        return getScrollTop()
      },
      scrollHeight: getScrollHeight,
      getBoundingClientRect: getRect,
    }
    ScrollTrigger.scrollerProxy(document.body, proxyVars)
    ScrollTrigger.scrollerProxy(document.documentElement, proxyVars)
    teardownProxy = () => {
      teardownProxy = null
    }
  }

  function setupBlockScroll() {
    if (typeof window === 'undefined' || !isEnabled()) return
    setupScrollProxy()
    window.addEventListener('wheel', onWheel, { passive: false })
    rafId = window.requestAnimationFrame(function raf() {
      if (!isEnabled()) return
      ScrollTrigger.update()
      rafId = window.requestAnimationFrame(raf)
    })
    nextTick(() => {
      const rail = getRail()
      const vh = window.innerHeight
      if (rail) {
        gsap.set(rail, { y: -currentBlockIndex.value * vh })
        currentScrollTop = currentBlockIndex.value * vh
      }
      ScrollTrigger.refresh()
      setTimeout(() => ScrollTrigger.refresh(), 0)
    })
  }

  function teardownBlockScroll() {
    window.removeEventListener('wheel', onWheel)
    if (rafId != null) {
      cancelAnimationFrame(rafId)
      rafId = undefined
    }
    teardownProxy?.()
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    if (enabled !== undefined) {
      watch(
        () => enabled.value,
        (v) => {
          if (v) setupBlockScroll()
          else teardownBlockScroll()
        },
        { immediate: true },
      )
    } else {
      setupBlockScroll()
    }
  })

  onUnmounted(() => {
    teardownBlockScroll()
  })

  watch(
    () => containerRef.value,
    (el) => {
      if (el) {
        nextTick(() => {
          teardownProxy?.()
          setupScrollProxy()
          ScrollTrigger.refresh()
        })
      }
    },
    { immediate: true },
  )

  return { currentBlockIndex, goToBlock }
}
