---
name: unify_scroll_layout_plans
overview: Consolidate the three prior plans into one implementation path that preserves the new width-scaled layout work and fixes desktop mouse-wheel progression in the current custom block-scroll architecture.
todos:
  - id: audit-width-scaling
    content: Confirm the current width-based scaling system is coherent and identify any remaining fixed desktop spacing that should align with it.
    status: completed
  - id: inspect-wheel-flow
    content: Trace the discrete mouse-wheel path in useBlockScroll and identify why wheel progression can stall at block boundaries.
    status: completed
  - id: reduce-overflow-traps
    content: Review desktop overflow usage and switch purely visual clipping away from hidden overflow where safe.
    status: completed
  - id: tune-desktop-scroll
    content: Only after logic fixes, adjust threshold or transition timing for better mouse-wheel ergonomics if needed.
    status: completed
  - id: verify-input-modes
    content: Validate mouse, trackpad, and narrow-viewport behavior so the unified fix does not regress other interaction modes.
    status: completed
isProject: false
---

# Consolidated scroll + layout plan

## Goal

Merge the intent of the three prior plans into one focused change set:

- keep the new fixed-design-width scaling approach already present in the codebase,
- fix desktop mouse-wheel users getting stuck between full-viewport blocks,
- avoid reintroducing the older ScrollSmoother-based assumptions from the outdated drafts.

## Current state

The repo no longer uses the `ScrollSmoother.create(...)` path referenced by the older mouse-wheel plans. Desktop scrolling is now handled by the custom block-scroll composable in [src/composables/useBlockScroll.ts](/Users/daniele/Sites/Gits/a-orixe-legacy/src/composables/useBlockScroll.ts), wired from [src/views/DesktopView.vue](/Users/daniele/Sites/Gits/a-orixe-legacy/src/views/DesktopView.vue).

The width-based design plan is already partially implemented in [src/styles/design-tokens.css](/Users/daniele/Sites/Gits/a-orixe-legacy/src/styles/design-tokens.css), including:

```101:104:src/styles/design-tokens.css
html {
  font-size: calc(16 * 100vw / var(--design-width));
}
```

Desktop block scrolling currently depends on a full-height viewport wrapper and inner scrollable blocks:

```40:58:src/styles/desktop.css
.block-viewport {
  height: var(--app-height);
  overflow: hidden;
}

[data-block-inner] {
  height: 100%;
  min-height: var(--app-height);
  overflow-y: auto;
  overflow-x: hidden;
}
```

## Implementation plan

1. Audit and preserve the design-width system.

Verify the intended source of scaling is the root `html` font-size plus existing token multipliers in [src/styles/design-tokens.css](/Users/daniele/Sites/Gits/a-orixe-legacy/src/styles/design-tokens.css), and do not add a second width multiplier that would double-scale typography/spacing. Review wide-layout spacing in [src/styles/desktop.css](/Users/daniele/Sites/Gits/a-orixe-legacy/src/styles/desktop.css), [src/styles/reset.css](/Users/daniele/Sites/Gits/a-orixe-legacy/src/styles/reset.css), and [src/styles/vars/typography.css](/Users/daniele/Sites/Gits/a-orixe-legacy/src/styles/vars/typography.css) for any remaining fixed desktop values that should follow the same width-based system.

1. Reframe the mouse-wheel fix around `useBlockScroll` instead of ScrollSmoother.

Investigate the discrete-wheel path in [src/composables/useBlockScroll.ts](/Users/daniele/Sites/Gits/a-orixe-legacy/src/composables/useBlockScroll.ts), especially `scrollThresholdPx`, cooldown timing, boundary detection (`isScrollableAtBottom` / `isScrollableAtTop`), and the `preventDefault()` branches. The goal is to make wheel progression reliable when an inner block is at its boundary, without breaking trackpad or touch behavior.

1. Reduce scroll-trap risk in the desktop container structure.

Review whether desktop clipping should use `overflow: clip` instead of `overflow: hidden` where the element is only acting as a visual crop, especially in [src/styles/desktop.css](/Users/daniele/Sites/Gits/a-orixe-legacy/src/styles/desktop.css). Keep `overflow-y: auto` on `[data-block-inner]` where actual inner scrolling is required, but avoid unnecessary hidden-overflow ancestors that can swallow wheel intent on desktop browsers.

1. Tune desktop wheel ergonomics only if logic fixes are insufficient.

Because [src/views/DesktopView.vue](/Users/daniele/Sites/Gits/a-orixe-legacy/src/views/DesktopView.vue) currently initializes block scroll with `scrollThresholdPx: 80` and `transitionDuration: 1`, validate whether these values are still appropriate for physical mouse wheels after the logic/overflow adjustments. Only tune thresholds or transition timing after confirming the underlying event flow is correct.

1. Verify behavior across the two supported interaction models.

Test wide viewport desktop behavior with a discrete mouse wheel and a trackpad, and verify narrow viewport/mobile behavior still uses normal page scrolling. Confirm block enter callbacks, reveal animations, and inner scroll regions still behave correctly in [src/views/DesktopView.vue](/Users/daniele/Sites/Gits/a-orixe-legacy/src/views/DesktopView.vue) and [src/composables/useRevealAnimation.ts](/Users/daniele/Sites/Gits/a-orixe-legacy/src/composables/useRevealAnimation.ts).

## Scope guardrails

- Do not reintroduce GSAP ScrollSmoother unless a fresh investigation proves the current custom block-scroll approach cannot be stabilized.
- Do not change height-based behavior such as `--app-height`, full-viewport sections, or the mobile/narrow scroll model unless the mouse-wheel fix requires it.
- Keep the change set focused on scroll reliability and consistent width-based scaling, not a broad visual redesign.

