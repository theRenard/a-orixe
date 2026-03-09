/** Set to false to disable scroll pinning (normal scroll only). */
export const SCROLL_ENABLED = true

/** Set to false to disable snap-to-section when scroll pinning is active. */
export const SNAP_ENABLED = false

/** Seconds of smoothing applied to desktop page scrolling. */
export const SCROLL_SMOOTHER_DESKTOP_SMOOTH = 0.9

/** Lighter smoothing on touch devices so scrolling still feels responsive. */
export const SCROLL_SMOOTHER_TOUCH_SMOOTH = 0.1

/** Extra scroll distance to hold a section once it reaches the top of the viewport. */
export const SECTION_HOLD_SCROLL_PX = 500

/** Multiplier for desktop scroll distance so section progression feels slower. */
export const SECTION_SCROLL_DISTANCE_MULTIPLIER = 1.6

/** Seconds for pinned desktop sections to catch up to the scroll position. */
export const SECTION_SCROLL_SCRUB = 0.75

/** Set to false to disable section reveal animations (useAnimation). */
export const REVEAL_ANIMATION_ENABLED = true

/** Default duration (seconds) for reveal animation tweens when not specified. */
export const DEFAULT_ANIMATION_DURATION = 3

/** Start position for reveal ScrollTriggers on wide viewports. */
export const REVEAL_SCROLL_START_WIDE = 'top 50%'

/** Start position for reveal ScrollTriggers on narrow viewports so animations begin sooner. */
export const REVEAL_SCROLL_START_MOBILE = 'top 75%'

/** End position for section reveal ScrollTriggers; farther means slower reveal progression. */
export const REVEAL_SCROLL_END = 'top -50%'

/** When true, show ScrollTrigger markers for section reveal animations (useAnimation). */
export const REVEAL_ANIMATION_MARKERS = false

/** When true, show ScrollTrigger markers for section pinning (useScrollAnimation). */
export const SCROLL_PINNING_MARKERS = false

/** When true, show ScrollTrigger markers for EnBrefSection count-up timeline. */
export const EN_BREF_COUNTUP_MARKERS = false

/** When true, show ScrollTrigger markers for MapIllustration line-width timeline. */
export const MAP_LINE_ANIMATION_MARKERS = false
