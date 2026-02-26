import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Viewport-based detection for behavior (e.g. enabling block-scroll).
 * Uses min-width: 48rem (wide) — matches responsive.css breakpoint.
 * No user-agent sniffing for layout; safe to call during SSR (returns non-reactive defaults).
 */

/** Wide breakpoint in rem — must match @media (min-width: 48rem) in responsive.css */
export const BREAKPOINT_WIDE_REM = 48

const WIDE_MEDIA_QUERY = `(min-width: ${BREAKPOINT_WIDE_REM}rem)`

export interface MobileDetectionOptions {
  /** If true, also require touch for "mobile". Default false. */
  requireTouch?: boolean
}

/**
 * Returns whether the viewport is at least the wide breakpoint (48rem).
 * Only runs on client; in SSR or before mount, returns false.
 */
export function isWideViewport(): boolean {
  if (import.meta.env.SSR || typeof window === 'undefined') return false
  return window.matchMedia(WIDE_MEDIA_QUERY).matches
}

/**
 * Returns whether the viewport is below the wide breakpoint (narrow).
 * Only runs on client; in SSR or before mount, returns true (treat as narrow).
 */
export function isMobileViewport(): boolean {
  return !isWideViewport()
}

/**
 * Returns whether the device has touch capability.
 */
export function hasTouch(): boolean {
  if (import.meta.env.SSR || typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * @deprecated Prefer isMobileViewport() or useMobileDetection(). Kept for compatibility.
 */
export function isMobileUserAgent(): boolean {
  if (import.meta.env.SSR || typeof navigator === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
}

/**
 * Combined check: narrow if viewport is below wide breakpoint (no UA for layout).
 * @deprecated Redirect removed; use isWideViewport() / useMobileDetection() for behavior.
 */
export function shouldUseMobileVersion(_options: MobileDetectionOptions = {}): boolean {
  return isMobileViewport()
}

/**
 * Reactive composable: viewport is wide (≥ 48rem) or narrow.
 * Use only for behavior (e.g. whether to enable block-scroll), not for layout.
 */
export function useMobileDetection(_options: MobileDetectionOptions = {}) {
  const isWide = ref(false)
  const isMobile = computed(() => !isWide.value)

  onMounted(() => {
    if (import.meta.env.SSR || typeof window === 'undefined') return
    const mq = window.matchMedia(WIDE_MEDIA_QUERY)
    const update = () => {
      isWide.value = mq.matches
    }
    update()
    mq.addEventListener('change', update)
    onUnmounted(() => mq.removeEventListener('change', update))
  })

  return { isWide, isMobile }
}
