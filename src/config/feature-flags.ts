/**
 * Feature flags for app behavior. Toggle here to enable/disable features without
 * touching component logic.
 */

/** When true, section reveal animations run on mobile when each block enters the viewport (each section fires once).
 * When false, all section animations are fired once on load so content is visible without scroll-triggered animation.
 * Desktop behavior is unchanged (block-scroll triggers on active block). */
export const MOBILE_ANIMATIONS_ENABLED = true
