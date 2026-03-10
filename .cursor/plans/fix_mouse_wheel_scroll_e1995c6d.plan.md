---
name: Fix mouse wheel scroll
overview: Address scroll issues where some users (especially mouse wheel users) cannot scroll past pinned sections, while trackpad scrolling works. The fix centers on enabling GSAP's normalizeScroll and optionally tuning scroll parameters.
todos: []
isProject: false
---

# Fix Mouse Wheel vs Trackpad Scroll Issues

## Problem

- Some users cannot scroll past certain blocks
- One user: mouse wheel does not advance scroll; trackpad works
- Root cause: mouse wheel and trackpad emit different `wheel` events (discrete lines vs continuous pixels), which ScrollSmoother/ScrollTrigger may handle inconsistently

## Solution

### 1. Enable normalizeScroll on ScrollSmoother

**File:** [src/composables/useScrollAnimation.ts](src/composables/useScrollAnimation.ts)

Add `normalizeScroll: true` to the ScrollSmoother config (around line 41):

```ts
ScrollSmoother.create({
  wrapper,
  content,
  smooth: SCROLL_SMOOTHER_DESKTOP_SMOOTH,
  smoothTouch: SCROLL_SMOOTHER_TOUCH_SMOOTH,
  effects: false,
  normalizeScroll: true,  // NEW: unifies wheel/trackpad handling on JS thread
})
```

**Why:** `normalizeScroll` moves scroll handling to the JavaScript thread, intercepts wheel events, and applies scroll in a consistent way. This addresses mouse vs trackpad differences and related sync issues.

**Caveat:** Uses `preventDefault()` on wheel events. Test on target browsers (Chrome, Firefox, Safari) to ensure no regressions.

---

### 2. Optional: Tune scroll parameters (if issue persists)

**File:** [src/config.ts](src/config.ts)

- **Reduce smoothing** so small deltas are not lost: lower `SCROLL_SMOOTHER_DESKTOP_SMOOTH` from `1.2` to `0.6`–`0.8`
- **Reduce section scroll distance** so users need fewer pixels to pass a block: lower `SECTION_SCROLL_DISTANCE_MULTIPLIER` from `0.5` to `0.35`–`0.4`

Apply only if step 1 is insufficient.

---

### 3. Verification

- Test with mouse wheel on Windows and macOS
- Test with trackpad
- Confirm no regression on mobile/touch
- Check that pinned sections still advance and release correctly

---

## Files to modify


| File                                                                           | Change                                                                                        |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| [src/composables/useScrollAnimation.ts](src/composables/useScrollAnimation.ts) | Add `normalizeScroll: true` to ScrollSmoother.create()                                        |
| [src/config.ts](src/config.ts)                                                 | Optional: adjust `SCROLL_SMOOTHER_DESKTOP_SMOOTH` and/or `SECTION_SCROLL_DISTANCE_MULTIPLIER` |


