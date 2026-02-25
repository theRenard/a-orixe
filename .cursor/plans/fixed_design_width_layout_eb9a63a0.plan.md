---
name: Fixed design width layout
overview: Make all proportions depend only on viewport width so font sizes, spacing, and horizontal dimensions scale with screen width and stay consistent relative to each other. Height is unchanged—blocks can scroll; no fixed block height or viewport height lock.
todos: []
isProject: false
---

# Fixed design width (proportions from viewport width only)

## Goal

**Proportions are based only on viewport width**: fonts, spacing, and horizontal sizes scale with screen width so the layout looks the same at any width (small screens redirect to another page). Current sizes in the codebase are already for a **1920px** screen; at 1920px the scale is 1 (no change), and at other widths everything scales proportionally (e.g. at 960px everything is half size). **Height is unchanged**: blocks can scroll; section heights, block scroll, and viewport height (100vh, innerHeight) stay as they are.

## Approach

- Introduce a **design width** (e.g. 1920px) and a **width-based scale**: `--scale-w: calc(100vw / 1920)` (or equivalent using a CSS variable for 1920).
- Express all **width-dependent** dimensions in terms of this scale: font sizes, horizontal padding/margins, max-widths, gaps, image widths. Use `calc(Xpx * var(--scale-w))` so at 1920px width scale is 1, at 960px scale is 0.5—same proportions.
- **Do not change** anything that depends on height: keep `min-height: 100vh`, `window.innerHeight` in useBlockScroll, hero vh-based height, etc. Blocks can scroll.

## Key files

- [src/styles/design-tokens.css](src/styles/design-tokens.css) – add `--design-width: 1920` (unitless for use in calc) and `--scale-w: calc(100vw / var(--design-width))`. Change font-size and line-height tokens from `calc(Npx * var(--font-scale))` to `calc(Npx * var(--font-scale) * var(--scale-w))` so they scale with viewport width.
- [src/styles/vars/styles.css](src/styles/vars/styles.css) – keep `.container { max-width: 70vw }` (already width-based) or switch to `calc(1344 * var(--scale-w))` for consistency. Replace horizontal spacing (e.g. `.centered { padding: 0 15rem }`) with width-scaled values (e.g. `padding: 0 calc(15rem * var(--scale-w))` or express in px and scale). Spacing utilities (margin/padding in rem) that affect horizontal rhythm can use the same scale. **Leave vertical spacing as rem/px if desired**, or scale it too so “spaces” are uniform; the user said “spaces” same size—if they mean all spaces, scale both; if only horizontal, scale only horizontal. Plan: scale all spacing (margins, paddings, gaps) with `--scale-w` so proportions are width-based.
- [src/styles/vars/typography.css](src/styles/vars/typography.css) – typography already uses tokens; once tokens use `--scale-w`, this scales. Any hardcoded px (e.g. `8rem`, `1.5rem`) in typography that affect size should use the scale or stay rem (rem is tied to root; if root font-size is also scaled by width, rem scales). Simpler: keep `html { font-size: 16px }` and use `--scale-w` only in the token calcs and in layout (container, padding, gap), so rem stays fixed and only explicit “width-scaled” values change. That way font and spacing scale via tokens and layout vars.
- **Height-related code** – no change: [src/composables/useBlockScroll.ts](src/composables/useBlockScroll.ts) (keep `window.innerHeight`), [src/components/sections/HeroIllustration.vue](src/components/sections/HeroIllustration.vue) (keep vh if desired), section min-heights (keep 100vh / 50vh).
- Component-level styles that set widths, font-size, or horizontal padding in px/rem – convert to `calc(... * var(--scale-w))` where they should scale with viewport width. Leave height-related values as is.

## Implementation steps

1. **Design width and scale** – In `design-tokens.css`, add `:root { --design-width: 1920; --scale-w: calc(100vw / var(--design-width)); }`. Use a unitless number so `100vw / 1920` yields a dimensionless scale (valid in calc for multiplying px).
2. **Font and line-height tokens** – In `design-tokens.css`, update each font-size and line-height from `calc(Xpx * var(--font-scale))` to `calc(Xpx * var(--font-scale) * var(--scale-w))`. So all typography scales with viewport width.
3. **Global layout (width only)** – In `styles.css`, keep or set `.container { max-width: 70vw }` (already proportional to width). For `.centered { padding: 0 15rem }`, either keep rem or change to e.g. `padding: 0 calc(240px * var(--scale-w))` (240 = 15*16) so horizontal padding scales. Apply `--scale-w` to horizontal margins/paddings and gaps that should keep proportion with width. Leave vertical spacing as-is or scale with `--scale-w` too for uniform “same size” spacing (user said “spaces” same size—interpret as scaling with width so proportions hold).
4. **Spacing utilities** – In `styles.css`, margin/padding utilities (mt-1, mr-1, etc.) are in rem. To make “spaces” scale with width, either (a) replace with `calc(Nrem * var(--scale-w))` or (b) set `html { font-size: calc(16px * var(--scale-w)) }` so all rem scale with width. Option (b) is one line but scales everything in rem. Option (a) is explicit. Prefer (b) for simplicity: set `html { font-size: calc(16px * var(--scale-w)); }` in reset or vars, and keep all rem as-is; then fonts in tokens should not double-scale, so revert tokens to `calc(Xpx * var(--font-scale))` without `--scale-w` if html already scales. So: **either** scale at root (html font-size) **or** in tokens and layout; not both. Clean approach: **html { font-size: calc(16px * var(--scale-w)); }** and keep design-tokens as px * font-scale (no scale-w in tokens), so rem and token-based sizes all scale with width in one place.
5. **Images and component widths** – Where image or element widths are set in px/rem, use `calc(... * var(--scale-w))` or leave as % of container (container already width-based). No change to height (e.g. height: 600px can stay or become scaled; user said they don’t care about height, so optional).
6. **No height changes** – Do not modify useBlockScroll, section min-height (100vh), or hero height logic. Blocks can scroll.

## Notes

- **Design is for 1920px** – The sizes currently in the codebase (fonts, spacing, layout) are already intended for a 1920px-wide screen. Scaling should use 1920 as the reference: at 1920px viewport width the scale factor is 1 (sizes stay as designed); at 960px scale is 0.5 (everything half size); at 2560px scale is ~1.33. So the layout always looks the same proportionally.
- **ScrollTrigger / GSAP** – No change; scroll and block height stay viewport-based.
- **Redirect** – Small screens redirect elsewhere; this layout only needs to work at supported widths.
- **Design width** – 1920 is the reference; change `--design-width` in one place to match design.
