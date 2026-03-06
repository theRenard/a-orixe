# CodePen bGRdvMy – reference source

Extracted HTML, CSS, and JavaScript from **GreenSock’s** CodePen:

**Slides Pinning - Overscroll Solution**  
https://codepen.io/GreenSock/pen/bGRdvMy

This folder is the reference implementation for the plan:

**`.cursor/plans/gsap_slide_pinning_overscroll_30ab3153.plan.md`**

## Files

| File             | Description                    |
|------------------|--------------------------------|
| `reference.html` | Markup: `.section`, `.section-inner`, `.slides-wrapper` |
| `reference.css`  | Styles for body scroll, sections, and inner overflow     |
| `reference.js`   | GSAP ScrollTrigger pin + scrub + optional fake-scroll     |

## DOM mapping (pen → a-orixe)

- CodePen `.section` → `[data-block]`
- CodePen `.section-inner` → `[data-block-inner]`
- CodePen `.slides-wrapper` (rail) → `.block-viewport` / `.slides-wrapper` in [DesktopView.vue](../../src/views/DesktopView.vue)

## Running the reference locally

The pen relies on:

- **GSAP**: https://unpkg.com/gsap@3/dist/gsap.min.js
- **ScrollTrigger**: https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js

Load those before `reference.js` if you want to run a standalone demo.
