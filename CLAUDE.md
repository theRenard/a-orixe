# a-orixe

Single long-page website with Vue 3, programmatic animations, and bilingual content (French / Spanish). Hosted on GitHub Pages.

## Overview

- **Type**: Single long-scroll page (no multi-route SPA).
- **Content**: One page with sections; rich animations driven by scroll or programmatic libraries.
- **Languages**: French (fr) and Spanish (es) via vue-i18n.
- **Hosting**: GitHub Pages (repository `a-orixe`); live URL: `https://theRenard.github.io/a-orixe/`.

## Tech stack

- **Vue**: 3.5+ (Composition API only, `<script setup>`).
- **Build**: Vite.
- **i18n**: vue-i18n — locales `fr` and `es`; all user-facing text must use i18n.
- **Animations**: **GSAP** (timelines, ScrollTrigger for scroll-driven effects). Use in composables or inside `onMounted` / `<ClientOnly>` so it runs only on the client (GSAP relies on `window`).
- **Smooth scroll**: **Lenis** — smooth scrolling for the long page. Initialise in `onMounted` or a composable (client-only); integrate with GSAP ScrollTrigger via `lenis.on('scroll', () => ScrollTrigger.update())` if using both.
- **Styling**: To be decided (plain CSS/SCSS, or a light UI/CSS framework). No `@import` in SCSS — use `@use`.
- **TypeScript**: Preferred for `.ts`/`.vue` logic.
- **Tooling**: ESLint, Prettier (align with Vue/TS).

## Key directories

```
/
├── src/
│   ├── assets/          # Images, fonts, static assets
│   ├── components/      # Vue components (sections, UI bits)
│   ├── composables/     # Reusable logic (e.g. useScrollAnimation)
│   ├── locales/         # i18n: fr.json, es.json (or .ts)
│   ├── styles/          # Global SCSS (variables, mixins)
│   ├── App.vue
│   └── main.ts
├── public/
├── index.html
├── vite.config.ts
└── CLAUDE.md
```

## Conventions

- **Components**: PascalCase; one main component per section on the long page when it makes sense.
- **i18n**: Keys by feature/section (e.g. `hero.title`, `footer.copyright`). Never hardcode fr/es strings in templates or components.
- **Animations**: Prefer composables (e.g. `useScrollReveal`) that wrap the animation library; keep animation logic out of raw template code when possible.
- **Script/style**: `<script setup lang="ts">`; scoped styles; SCSS with `@use` only.
- **Naming**: camelCase for composables/utils; PascalCase for components.

## Pre-rendering (SSG)

The site is **pre-rendered at build time** so the initial HTML contains content (better SEO and first paint). Chosen approach: **vite-ssg in single-page mode** (no Vue Router).

- **Setup**: Use `vite-ssg/single-page` — one pre-rendered index page. Dependencies: `vite-ssg`, `@unhead/vue` (no `vue-router`).
- **Entry**: In `src/main.ts`, export `createApp` instead of mounting: `import { ViteSSG } from 'vite-ssg/single-page'` then `export const createApp = ViteSSG(App)`. Install plugins (i18n, etc.) inside the callback passed to `ViteSSG(App, { ... })` if using the extended form.
- **Build**: `"build": "vite-ssg build"` (replaces `vite build`). Output remains `dist/` with pre-rendered HTML.
- **Head**: Use `@unhead/vue` (e.g. `useHead({ title, meta })`) for title and meta; it works with SSG out of the box.
- **Client-only**: For DOM/scroll-dependent bits that must run only in the browser, wrap in `<ClientOnly>` (provided by vite-ssg); optional placeholder via `<template #placeholder>`.
- **Optional**: Critical CSS inlined in HTML via the `beasties` package (see vite-ssg docs) for faster first paint.

**Alternatives** (if requirements grow): **Vike** (vite-plugin-ssr) for multi-page SSG with more control; **Nuxt 3** with `target: 'static'` for a full-stack Vue framework with built-in SSG.

## GitHub Pages

- **Profile**: theRenard → site URL: `https://theRenard.github.io/a-orixe/`.
- **Base path**: In `vite.config.ts`, set `base: '/a-orixe/'` (required for non–`*.github.io` repos).
- **Deploy**: Workflow `.github/workflows/deploy-pages.yml` runs on push to `main`: installs deps, runs `npm run build` (vite-ssg build), and deploys via GitHub Actions. **First-time setup**: Repo → Settings → Pages → Source: **GitHub Actions** (not “Deploy from a branch”).
- **Branch**: Workflow triggers on `main`; change `branches: [main]` in the workflow if the default branch is different.

## Commands

| Command | Purpose |
|--------|--------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Pre-rendered build via vite-ssg (output in `dist/`) |
| `npm run preview` | Preview production build locally |
| (optional) `npm run deploy` | Build + push to GitHub Pages (if script added) |

## Gotchas / notes

- **GitHub Pages**: always set `base` in Vite to the repo name with leading/trailing slash: `'/a-orixe/'`.
- **i18n**: set initial locale and fallback (e.g. `fr` as default, `es` as second); ensure all UI strings go through `$t` / `useI18n().t`.
- **Pre-render**: Entry must export `createApp` (vite-ssg); do not call `app.mount('#app')` directly. Use `<ClientOnly>` for any block that breaks during SSG (e.g. heavy scroll/window usage) and provide a placeholder if needed.
- **GSAP**: Use in composables or `onMounted`; for scroll-driven animations use ScrollTrigger. Run only on the client (wrap in `<ClientOnly>` or call from `onMounted`) to avoid SSG errors. **Lenis**: Initialise smooth scroll in `onMounted` or a composable (e.g. `useLenis`); call `lenis.destroy()` in `onUnmounted`. If using GSAP ScrollTrigger, sync with `lenis.on('scroll', () => ScrollTrigger.update())`. Keep animations performant (prefer transform/opacity).
