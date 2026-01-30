---
name: a-orixe
description: Provides context for the a-orixe Vue 3 long-page site: pre-rendered with vite-ssg (single-page), GSAP + Lenis, fr/es i18n, GitHub Pages (theRenard). Use when working in this codebase or when editing Vue/i18n/animation/deploy files.
---

# a-orixe project

## Context

This skill applies when working in the **a-orixe** repository: a **single long-page website** with Vue 3, **pre-rendered** (vite-ssg single-page), **GSAP** for animations and **Lenis** for smooth scroll, and bilingual content (French / Spanish). Hosted on GitHub Pages at **https://theRenard.github.io/a-orixe/**. The agent should follow project conventions and structure defined in CLAUDE.md and Cursor rules.

## What to use

1. **CLAUDE.md** – Read the project root `CLAUDE.md` for:
   - Project overview and tech stack
   - Directory structure and key folders
   - Code style, naming, and testing conventions
   - Common commands and gotchas

2. **Cursor rules** – Apply rules in `.cursor/rules/` for file-specific or global standards (TypeScript, Vue, etc.).

3. **This skill** – Use when the user says "this project", "this repo", or "a-orixe", or when editing files in the workspace so the agent stays aligned with project context.

## Workflow

- Before suggesting structural or style changes, check `CLAUDE.md` and existing rules.
- Prefer patterns and tools already listed in the project config.
- If the repo is still a template, suggest concrete values for placeholders in `CLAUDE.md` when the user adds code.
