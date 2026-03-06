---
name: GSAP slide pinning overscroll
overview: "Implement the same pin-and-scrub section behavior as the CodePen \"Slides Pinning - Overscroll Solution\" (bGRdvMy) on desktop: each section pins when its bottom hits the viewport bottom, scrubs through a scale/fade-out (and optional inner \"fake scroll\" when content is taller than the viewport), then releases. Mobile keeps normal scroll unchanged."
todos: []
isProject: false
---

# Plan: GSAP slide pinning and overscroll (CodePen bGRdvMy behavior)

## Reference

Implementation is a **port of the extracted reference** to the project using the DOM mapping below. Use these files as the source of truth:

- **[docs/codepen-bGRdvMy-reference/reference.html](docs/codepen-bGRdvMy-reference/reference.html)** — DOM structure: `.slides-wrapper` wrapping `.section` elements, each with a `.section-inner`. Section 2 in the reference shows the “tall content” pattern (many paragraphs inside one section).
- **[docs/codepen-bGRdvMy-reference/reference.css](docs/codepen-bGRdvMy-reference/reference.css)** — Scroll container (body), section height, inner overflow. Key rules: `body` (lines 7–18), `.section` (46–59), `.section-inner` (66–72); tall section override `.section-2 .section-inner` (74–77).
- **[docs/codepen-bGRdvMy-reference/reference.js](docs/codepen-bGRdvMy-reference/reference.js)** — Full pin/scrub logic: `panels.pop()`, `fakeScrollRatio`, `marginBottom`, timeline with ScrollTrigger and optional fake-scroll tween, then scale/fade (lines 11–57).

See reference.html, reference.css, and reference.js for the exact structure and code.

## Target behavior (from the CodePen)

- **Scroll**: Normal document scroll (body scrolls).
- **Per section (all but the last)**: When the section’s bottom hits the viewport bottom, the section **pins** and a **scrubbed** timeline runs:
  1. If the section’s inner content is **taller than the viewport**: a “fake scroll” phase moves the inner content up (so the user effectively scrolls inside the section).
  2. Then the section **scales down** (1 → 0.7) and **fades** (1 → 0.5 → 0).
- **Last section**: No pin; it just scrolls into view.
- **Overscroll**: For tall sections, extra bottom margin is added so the total scroll distance matches the combined “fake scroll” + “scale/fade” distance.

## Scope and constraints

- **Desktop only (wide viewport, 48rem)**: Pinning/scrub runs only when `min-width: 48rem`. Below that, keep current normal scroll (no JS pinning).
- **Single place for logic**: All ScrollTrigger/slide-pinning logic lives in [src/composables/useAnimation.ts](src/composables/useAnimation.ts); no new composables. Section components stay as they are (no per-component animation code).
- **DOM mapping (reference → project)**:
  - reference.html: `.section` → our `[data-block]`; `.section-inner` → our `[data-block-inner]`.
  - reference.html: `.slides-wrapper` is the rail that wraps sections. In the project ([src/views/DesktopView.vue](src/views/DesktopView.vue)), `.block-viewport` contains `.slides-wrapper`, and section roots (`[data-block]`) are direct children of `.slides-wrapper`. To get all panels: query `.block-viewport [data-block]` (or `.slides-wrapper [data-block]`).

## Implementation steps

### 1. Desktop CSS for pinning

**Source:** [docs/codepen-bGRdvMy-reference/reference.css](docs/codepen-bGRdvMy-reference/reference.css)

Match reference.css scroll and section behavior, adapted to our selectors and breakpoint. Apply only inside `@media (min-width: 48rem)` in [src/styles/desktop.css](src/styles/desktop.css).

- **From reference.css:** body `overflow-x: hidden; overflow-y: scroll` (lines 15–18); `.section` fixed height `calc(100vh - 64px)` (48) and `overflow: hidden` (57); `.section-inner` `height: 100%`, `overflow: hidden` (66–71). Tall section: `.section-2 .section-inner` has `height: auto` and `padding-bottom: 20vh` (74–77).
- **Adapt for project:** (1) Ensure body scroll (same as reference). (2) `[data-block]`: fixed height `100dvh` (no nav offset), `overflow: hidden`. (3) `[data-block-inner]`: `height: 100%`, `overflow: hidden`, `overflow-x: hidden`. (4) For blocks that can be tall, allow inner to grow (e.g. `min-height` or a utility class) so JS can measure and apply fake scroll — reference uses `.section-2 .section-inner { height: auto; padding-bottom: 20vh }` for the long section.
- Leave `.block-viewport` and `.slides-wrapper` as they are (height auto, visible overflow) so the page can scroll normally.
- **Do not copy** from reference.css: `.nav`, `.image`, or section-specific colors; only the scroll/section/inner layout rules.

Result: On desktop, each block is a full-height box with a possibly taller inner; on mobile, existing rules stay unchanged.

### 2. Slide-pinning logic in useAnimation

**Source:** [docs/codepen-bGRdvMy-reference/reference.js](docs/codepen-bGRdvMy-reference/reference.js)

Port the logic from reference.js into [src/composables/useAnimation.ts](src/composables/useAnimation.ts).

- **Keep** existing: `gsap.registerPlugin(ScrollTrigger)`, the dev-only `ScrollTrigger.create` marker patch, and `initAnimation()`.
- **Extend** `initAnimation()` (or add a function called from it) so that after the DOM is ready:
  1. **matchMedia:** Run the reference’s logic only when `window.matchMedia('(min-width: 48rem)').matches` (reference has no media check).
  2. **Panels:** Reference uses `gsap.utils.toArray(".section")` and `panels.pop()` (reference.js 11–12). In project: get panels with `document.querySelectorAll('.block-viewport [data-block]')` (or `.slides-wrapper [data-block]`), convert to array, pop last.
  3. **Per panel:** For each panel, get inner with `panel.querySelector('[data-block-inner]')` (reference uses `".section-inner"`). Then copy the reference’s math and timeline exactly:
    - `panelHeight`, `windowHeight`, `difference`, `fakeScrollRatio` (reference.js 18–26); `marginBottom` (28–31).
    - Timeline with `scrollTrigger: { trigger: panel, start: "bottom bottom", end: fakeScrollRatio ? \`+={inner.offsetHeight} : "bottom top", pinSpacing: false, pin: true, scrub: true }` (33–43).
    - If `fakeScrollRatio > 0`: `tl.to(inner, { yPercent: -100, y: windowHeight, duration: 1 / (1 - fakeScrollRatio) - 1, ease: "none" })` (46–52).
    - Then `tl.fromTo(panel, { scale: 1, opacity: 1 }, { scale: 0.7, opacity: 0.5, duration: 0.9 }).to(panel, { opacity: 0, duration: 0.1 })` (53–56).
    - Use TypeScript and project variable names where appropriate; keep formulas identical.
  4. **Cleanup:** Store ScrollTrigger instances (e.g. from each timeline’s `scrollTrigger` property). On matchMedia change to narrow: kill all stored instances. On change to wide: re-run setup (after `requestAnimationFrame` or short delay). Reference has no resize handling — this is project-only.
  5. **Timing:** Run setup inside `requestAnimationFrame` (or after a short delay) when wide; [src/main.ts](src/main.ts) already calls `initAnimation()` — no change there.
- **Dev demo trigger:** Remove the current dev-only full-page ScrollTrigger when slide pinning is active (Option A); the real pin triggers already get markers in dev from the existing patch.

### 3. Dev demo trigger

- **Option A (preferred):** Remove the current dev-only “demo” ScrollTrigger when slide pinning is active so it doesn’t conflict with the real pin triggers.
- **Option B:** Keep it but only run when viewport is narrow. Prefer Option A for simplicity.

### 4. No changes to section components or DesktopView

- Section Vue components stay as they are: no new refs, no animation imports, no `useAnimation` usage inside sections. Structure already matches reference: each section root has `data-block` and contains a single `data-block-inner`.
- [DesktopView.vue](src/views/DesktopView.vue) is unchanged; it only renders the list of sections inside `.slides-wrapper` (within `.block-viewport`).

## Flow summary

Wide branch = logic from reference.js, with matchMedia and our selectors (`.block-viewport [data-block]`, `[data-block-inner]`).

```mermaid
flowchart LR
  subgraph init [Init after mount]
    A[initAnimation called from main.ts]
    B[matchMedia wide?]
    A --> B
  end
  subgraph wide [Wide viewport]
    B -->|yes| C[Query block-viewport and data-block]
    C --> D[Exclude last block]
    D --> E[For each block: measure inner height]
    E --> F[Compute fakeScrollRatio and marginBottom]
    F --> G[Create timeline with pin and scrub]
    G --> H[Add fake-scroll tween if tall]
    H --> I[Add scale and fade tweens]
  end
  subgraph narrow [Narrow viewport]
    B -->|no| J[Do not create pin triggers]
  end
  subgraph resize [On resize]
    K[matchMedia change] --> L{narrow now?}
    L -->|yes| M[Kill stored ScrollTriggers]
    L -->|no| N[Re-run setup]
  end
```



## Files to touch


| File                                                               | Change                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [src/styles/desktop.css](src/styles/desktop.css)                   | Body scroll; fixed height and overflow for `[data-block]` / `[data-block-inner]` on desktop (from [reference.css](docs/codepen-bGRdvMy-reference/reference.css)).                                                                              |
| [src/composables/useAnimation.ts](src/composables/useAnimation.ts) | Port slide-pinning from [reference.js](docs/codepen-bGRdvMy-reference/reference.js) (matchMedia, loop over blocks, timelines with pin/scrub and optional fake scroll); store and kill triggers on resize; remove dev demo when pinning active. |
| [src/main.ts](src/main.ts)                                         | No change (already calls `initAnimation()`).                                                                                                                                                                                                   |


**Reference (implementation source):** [reference.html](docs/codepen-bGRdvMy-reference/reference.html), [reference.css](docs/codepen-bGRdvMy-reference/reference.css), [reference.js](docs/codepen-bGRdvMy-reference/reference.js).

## Testing

- **Desktop**: Scroll the page; each section (except the last) should pin when its bottom hits the viewport bottom, scrub through scale/fade (and inner “scroll” when content is tall), then release. Last section scrolls in normally.
- **Mobile**: No pinning; normal scroll. Resizing from desktop to mobile should remove pinning; resizing back should restore it.
- **Dev**: ScrollTrigger markers (if kept) should show on the pin triggers when markers are enabled.

## Optional follow-ups (out of scope for this plan)

- Expose a way to **opt out** a specific section from pinning (e.g. `data-pin="false"`) if one section should behave like the “last” section.
- Tune **scale/opacity** values or **ease** to match design (pen uses 0.7, 0.5, 0.1 durations).

