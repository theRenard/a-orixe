---
name: gsap-scrolltrigger
description: Use GSAP ScrollTrigger for scroll-based animations: trigger, start/end, scroller, callbacks, pin, scrub. Use when implementing or debugging scroll-triggered animations, viewport reveals, or when the user mentions ScrollTrigger, scroll animations, or the ScrollTrigger docs/demos.
---

# GSAP ScrollTrigger

Use this skill when implementing or fixing scroll-driven animations. Official docs and demos: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) and [Demos](https://gsap.com/docs/v3/Plugins/ScrollTrigger/#demos).

## Core concepts

- **Trigger**: The element whose position defines when the ScrollTrigger activates. Use `trigger: element` or selector.
- **Start / End**: String like `"top center"` = when trigger’s top hits scroller’s center. Default start `"top bottom"` (trigger top hits viewport bottom). Use percentages (`"top 60%"`), pixels, or relative (`"+=300"`).
- **Scroller**: By default the viewport (window). For a scrollable div, set `scroller: element` (or selector) so ScrollTrigger uses that element’s scroll position.
- **Callbacks**: `onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack`, `onUpdate`, `onRefresh`. Receive the ScrollTrigger instance (e.g. `progress`, `direction`, `isActive`, `getVelocity()`).
- **once: true**: Fires at most one time (e.g. play animation once when scrolling forward); sets toggleActions to `"play none none none"`.

## Common patterns

**Trigger animation when element enters viewport (play once):**
```js
ScrollTrigger.create({
  trigger: el,
  start: 'top 80%',
  once: true,
  onEnter: () => timeline.play(),
});
```

**Link animation to timeline (shorthand):**
```js
gsap.to('.box', {
  scrollTrigger: '.box',
  x: 500,
});
```

**Custom scroller (e.g. scrollable container):**
```js
ScrollTrigger.create({
  trigger: el,
  scroller: document.querySelector('.scroll-container'),
  start: 'top 60%',
  onEnter: () => tl.play(),
});
```

**Scrubbing (animation tied to scroll position):**
```js
gsap.to('.box', {
  x: 500,
  scrollTrigger: {
    trigger: '.box',
    start: 'top center',
    end: '+=500',
    scrub: 1,
  },
});
```

**Pinning:**
```js
scrollTrigger: {
  trigger: '.section',
  pin: true,
  start: 'top top',
  end: '+=500',
}
```

## Important details

- ScrollTrigger does **not** use IntersectionObserver; it computes start/end scroll positions and listens to scroll. Call `ScrollTrigger.refresh()` after DOM/layout changes or when the scroller is not the window.
- For a **custom scroll container**, always set `scroller` to that element so start/end are correct.
- Use `invalidateOnRefresh: true` when the animation’s start values may change on resize.
- To avoid callbacks firing for elements already in view on load, use `ScrollTrigger.config({ limitCallbacks: true })`; otherwise `onEnter` can run immediately if the trigger is already past the start position.
- **Cleanup**: Call `st.kill()` (or `timeline.scrollTrigger?.kill()`) in component `onUnmounted` to remove listeners and avoid leaks.

## Demos and reference

- [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [ScrollTrigger demos](https://gsap.com/docs/v3/Plugins/ScrollTrigger/#demos) (CodePen collection)
- [scrollerProxy](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy/) for custom/fake scroll (e.g. block-scroll or smooth scroll libraries)

When debugging scroll animations, verify: (1) correct `scroller` if not the window, (2) `ScrollTrigger.refresh()` after layout, (3) elements already past the start position (consider playing immediately or `limitCallbacks`).
