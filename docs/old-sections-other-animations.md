# Other animations (old_sections, not useRevealAnimation)

This document lists the **TypeScript animation logic** in `src/old_sections/` that does **not** use `useRevealAnimation`: GSAP timelines with ScrollTrigger, scroll-driven handlers, and supporting code. Each entry has file reference and the relevant code. See [old-sections-useRevealAnimation-elements.md](old-sections-useRevealAnimation-elements.md) for reveal elements.

---

## EnBrefSection

**Count-up timeline (ScrollTrigger):** when section enters view, animate two stat numbers from 0 to their target values.

@src/old_sections/EnBrefSection.vue (43-67)

```ts
  nextTick(() => {
    const triggerEl = sectionRoot.value
    const el1 = stat1El.value
    const el2 = stat2El.value
    if (!triggerEl || !el1 || !el2) return
    const target1 = parseInt(t('enBref.stat1Number'), 10) || 0
    const target2 = parseInt(t('enBref.stat2Number'), 10) || 0
    const obj1 = { value: 0 }
    const obj2 = { value: 0 }
    const tl = gsap.timeline({
      scrollTrigger: { trigger: triggerEl, start: 'top 70%', once: true },
    })
    tl.to(obj1, {
      value: target1,
      duration: 3,
      ease: 'power2.out',
      onUpdate: () => { el1.textContent = String(Math.round(obj1.value)) },
    }, 0.2)
    tl.to(obj2, {
      value: target2,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => { el2.textContent = String(Math.round(obj2.value)) },
    }, 0.35)
    onUnmounted(() => tl.scrollTrigger?.kill())
  })
```

---

## HeroIllustration

**Scroll-driven behavior (block-inner scroll):** illustration height and scroll indicator depend on scroll; reveal runs when scroll passes threshold.

@src/old_sections/HeroIllustration.vue (21-31)

```ts
/** Illustration height in vh: 100 at top, 50 after scrolling (over first ~600px). */
const illustrationHeightVh = ref(isWide.value ? 100 : 75)
const SCROLL_THRESHOLD_PX = 600

/** Hide mouse icon as soon as user scrolls. */
const showScrollIndicator = ref(true)
const SCROLL_INDICATOR_HIDE_PX = 10

/** Run the reveal animation when user has scrolled this far inside the hero block. */
const REVEAL_TRIGGER_PX = 50
let revealDone = false
```

@src/old_sections/HeroIllustration.vue (45-57)

```ts
function onBlockScroll() {
  const el = blockInnerRef.value
  if (!el) return
  const scrollTop = el.scrollTop
  const progress = Math.min(1, scrollTop / SCROLL_THRESHOLD_PX)
  illustrationHeightVh.value = 100 - progress * 50
  showScrollIndicator.value = scrollTop <= SCROLL_INDICATOR_HIDE_PX

  if (!revealDone && scrollTop >= REVEAL_TRIGGER_PX) {
    revealDone = true
    run()
  }
}
```

@src/old_sections/HeroIllustration.vue (67-71)

```ts
  const el = blockInnerRef.value
  if (el) {
    el.addEventListener('scroll', onBlockScroll, { passive: true })
    onUnmounted(() => el.removeEventListener('scroll', onBlockScroll))
  }
```

---

## MapIllustration

**Line width sync:** keep the line element’s width in sync with the map wrap (for the line-reveal animation).

@src/old_sections/MapIllustration.vue (24-30)

```ts
function setLineWidth() {
  const wrap = mapWrap.value
  const lineEl = line.value
  if (wrap && lineEl) {
    lineWidthPx.value = wrap.offsetWidth
  }
}
```

**Line-width timeline (ScrollTrigger):** on section enter, animate the line container from 27% to 100% width.

@src/old_sections/MapIllustration.vue (70-84)

```ts
  setLineWidth()
  const resizeObserver = new ResizeObserver(setLineWidth)
  const wrap = mapWrap.value
  if (wrap) resizeObserver.observe(wrap)
  onUnmounted(() => resizeObserver.disconnect())
  const containerEl = lineContainer.value
  const triggerEl = sectionRoot.value
  if (containerEl && triggerEl) {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: triggerEl, start: 'top 70%', once: true },
    })
    tl.to(containerEl, { width: '27%', duration: 0, ease: 'linear' }, 0)
    tl.to(containerEl, { width: '100%', duration: 5, ease: 'linear' }, 0.15)
    onUnmounted(() => tl.scrollTrigger?.kill())
  }
```
