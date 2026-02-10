/**
 * Client-side mobile detection for redirect logic.
 * Uses viewport width (matchMedia) and optional touch capability.
 * Safe to call during SSR (returns false / non-reactive defaults).
 */

const DEFAULT_MOBILE_BREAKPOINT_PX = 768

export interface MobileDetectionOptions {
  /** Max width (px) to consider mobile. Default 768. */
  breakpoint?: number
  /** If true, also require touch capability for mobile. Default false. */
  requireTouch?: boolean
}

/**
 * Returns whether the current device should be treated as mobile.
 * Only runs on client; in SSR or before mount, returns false.
 */
export function isMobileUserAgent(): boolean {
  if (import.meta.env.SSR || typeof navigator === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
}

/**
 * Returns whether the viewport is within the mobile breakpoint.
 * Only runs on client; in SSR or before mount, returns false.
 */
export function isMobileViewport(breakpointPx: number = DEFAULT_MOBILE_BREAKPOINT_PX): boolean {
  if (import.meta.env.SSR || typeof window === 'undefined') return false
  return window.matchMedia(`(max-width: ${breakpointPx}px)`).matches
}

/**
 * Returns whether the device has touch capability.
 */
export function hasTouch(): boolean {
  if (import.meta.env.SSR || typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Combined check: treat as mobile if viewport is narrow OR (optional) user agent is mobile.
 * Use this in router guards for redirect logic.
 */
export function shouldUseMobileVersion(options: MobileDetectionOptions = {}): boolean {
  const { breakpoint = DEFAULT_MOBILE_BREAKPOINT_PX, requireTouch = false } = options
  if (import.meta.env.SSR || typeof window === 'undefined') return false

  const viewportMobile = isMobileViewport(breakpoint)
  const uaMobile = isMobileUserAgent()
  const touch = hasTouch()

  if (requireTouch) {
    return (viewportMobile || uaMobile) && touch
  }
  return viewportMobile || uaMobile
}
