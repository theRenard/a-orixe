# Skill: Modern Responsive Architecture (2026 Standard)

## Purpose

Refactor or build a frontend project using modern responsive best
practices aligned with modern browser capabilities and long-term
scalability standards.

This skill enforces:

-   Mobile-first architecture
-   Content-driven breakpoints
-   Fluid typography and spacing
-   Container queries
-   CSS-first responsiveness
-   Modern viewport units
-   Accessibility-aware media features
-   Clean layout architecture
-   Reduced breakpoint complexity

This skill is framework-agnostic and applies to:

-   SPA / MPA
-   Static sites
-   Design systems
-   Dashboards
-   Marketing sites

------------------------------------------------------------------------

# Core Principles

## 1. Mobile-First Strategy

-   Base styles target small screens first.
-   Only use `min-width` media queries.
-   Avoid `max-width` unless strictly required.
-   Remove device-based logic.

Example:

``` css
.component {
  display: block;
}

@media (min-width: 48rem) {
  .component {
    display: grid;
  }
}
```

------------------------------------------------------------------------

## 2. Content-Driven Breakpoints

Breakpoints must occur only when:

-   Layout visually breaks
-   Content becomes cramped
-   Columns require reflow

Rules:

-   Do not name breakpoints after devices.
-   Use `rem` units instead of `px`.
-   Keep total breakpoint count minimal.

Example baseline:

``` css
@media (min-width: 40rem) { }
@media (min-width: 64rem) { }
```

------------------------------------------------------------------------

## 3. Fluid Typography & Spacing

Replace fixed `px` values with `clamp()`.

Define a scalable system in `:root`:

``` css
:root {
  --step-0: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --step-1: clamp(1.25rem, 1rem + 1vw, 1.75rem);

  --space-1: clamp(0.5rem, 1vw, 1rem);
  --space-2: clamp(1rem, 2vw, 2rem);
}
```

Refactor:

-   Headings
-   Body text
-   Section padding
-   Gaps
-   Containers

Avoid hard jumps between breakpoints.

------------------------------------------------------------------------

## 4. Container Queries (Mandatory for Reusable Components)

Use container queries instead of viewport queries for internal component
layout changes.

Example:

``` css
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 30rem) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

Apply to:

-   Cards
-   Feature blocks
-   Modular UI components
-   Design system elements

------------------------------------------------------------------------

## 5. Modern Viewport Units

Replace `100vh` with `100dvh`.

``` css
height: 100dvh;
```

Use:

-   `dvh` (dynamic viewport height)
-   `svh` (small viewport height)
-   `lvh` (large viewport height)

Avoid mobile address bar layout bugs.

------------------------------------------------------------------------

## 6. Layout Architecture Standards

Prefer:

-   CSS Grid for macro layout
-   `auto-fit` + `minmax()`
-   Flexbox only for 1D alignment

Example:

``` css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
```

Avoid breakpoint-heavy grid switching.

------------------------------------------------------------------------

## 7. Accessibility & Capability Media Queries

Implement:

``` css
@media (hover: hover) { }
@media (pointer: fine) { }
@media (prefers-reduced-motion: reduce) { }
@media (prefers-color-scheme: dark) { }
```

Requirements:

-   Remove hover-only interactions on touch devices.
-   Respect reduced motion preference.
-   Avoid animation-heavy defaults.
-   Support dark mode if applicable.

------------------------------------------------------------------------

## 8. Responsive Images

Ensure usage of:

-   `srcset`
-   `sizes`
-   Proper intrinsic sizing

Example:

``` html
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1600.jpg 1600w
  "
  sizes="(max-width: 600px) 90vw, 50vw"
  alt=""
/>
```

Avoid serving oversized desktop images to small screens.

------------------------------------------------------------------------

## 9. Reduce JavaScript-Based Responsiveness

Rules:

-   CSS controls layout.
-   JavaScript controls behavior only.
-   Remove layout switching logic from JS.
-   No user-agent sniffing.
-   No separate mobile site.
-   Avoid breakpoint-driven rendering logic.

JavaScript may be used only for:

-   Behavioral changes
-   Interaction patterns
-   Feature toggling

------------------------------------------------------------------------

## 10. Responsive Foundation Layer

Project must include:

    /styles/responsive.css

It must contain:

-   Fluid type scale
-   Spacing scale
-   Grid utilities
-   Container utilities
-   Media helpers
-   Root CSS variables

It must be globally imported.

------------------------------------------------------------------------

# Anti-Patterns to Remove

-   Device-based breakpoints (e.g. 768px labeled as "tablet")
-   Overlapping and duplicated media queries
-   Fixed pixel typography
-   `100vh` mobile layouts
-   Layout logic controlled via JS
-   Massive breakpoint duplication across components
-   Excessive breakpoint counts
-   UA sniffing

------------------------------------------------------------------------

# Refactoring Workflow

When this skill is invoked:

1.  Audit existing responsive logic.
2.  Identify device-based breakpoints.
3.  Introduce fluid type and spacing scale.
4.  Replace layout media queries with container queries where
    appropriate.
5.  Refactor grid architecture.
6.  Reduce total breakpoint count.
7.  Replace `vh` with `dvh`.
8.  Implement capability media queries.
9.  Improve responsive image delivery.
10. Document architectural improvements.

------------------------------------------------------------------------

# Deliverables

-   Refactored CSS architecture
-   Reduced breakpoint strategy
-   Container-based component layouts
-   Modern viewport implementation
-   Removal of anti-patterns
-   Clear explanation of architectural decisions

------------------------------------------------------------------------

# Constraints

-   Do not change visual design intent.
-   Improve implementation only.
-   Maintain scalability.
-   Do not introduce unnecessary dependencies.
-   Explain major architectural changes before applying them.
