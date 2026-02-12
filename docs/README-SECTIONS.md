# How to add a new content section (AI guide)

This document describes how new long-page sections are added to a-orixe when given a design (e.g. mockup or image). Use it to keep patterns consistent and to onboard AI or new contributors.

## 1. Gather content and structure from the design

- **Text**: Extract all visible copy (headings, paragraphs, captions, blockquotes) in the order they appear.
- **Layout order**: Note the visual order: e.g. image first → caption → title → paragraphs → highlighted block.
- **Styling cues**: Identify which bits use:
  - Orange accent (title, separator line, small caption line)
  - Teal/green (left border for “question” or blockquote blocks)
  - Body text (section paragraphs)
  - Small/italic (footnotes, captions)

## 2. Add i18n keys (French + Spanish)

- **Location**: `src/locales/fr.json` and `src/locales/es.json`.
- **Convention**: One object per section, keyed by a short camelCase name (e.g. `reconstitutionTrac`, `ressentirLieux`).
- **Keys**: Use descriptive keys: `title`, `paragraph1`, `paragraph2`, `imageCaption`, `question`, `blockquote`, etc., as needed.
- Add the new block **in both files** in the same position (e.g. after `association`) so keys stay aligned.

## 3. Create the section component

- **Path**: `src/components/sections/<SectionName>Section.vue` (PascalCase), e.g. `ReconstitutionTracSection.vue`.
- **Structure**:
  - One `<section>` with a BEM block class (e.g. `reconstitution-trac-section`).
  - Inside: `<div class="container">`. For centered text blocks use `<div class="centered">` (same as other sections).
- **Typography**: Use existing classes from `src/styles/vars/typography.css`:
  - `type__section-title` + `type__section-title--with-line` for orange title with line above
  - `type__section-paragraph` for body text
  - `type__question` for the teal-bordered “question” block
  - `type__footnote` for small italic captions/credits
- **Spacing**: Use spacing utilities from `src/styles/vars/styles.css` (`mt-3`, `mt-4`, `mt-5`, `mb-5`, etc.).
- **Images**: Use `ImageCrop` from `@/components/tools/ImageCrop.vue` when you need a cropped hero image; pass `width`, `height`, `position`. Image paths are relative to the component, e.g. `../../assets/photos/<file>.webp`.
- **Scoped styles**: Only add what’s section-specific (e.g. caption with orange line `::before`, question block `border-left`). Reuse typography and tokens; avoid duplicating global patterns.

## 4. Wire the section into the page

- **File**: `src/views/HomeView.vue`.
- **Steps**:
  1. Import the new section component.
  2. Add the component in the desired order in the template (e.g. after `AssociationSection`).
- **Mobile**: If the site has a separate mobile view, add the section there too if the design applies (see `src/views/mobile/`).

## 5. Design tokens and assets

- **Colors**: Use CSS variables from `src/styles/design-tokens.css` (e.g. `var(--color-orange)`, `var(--color-teal-dark)`).
- **Assets**: Place images in `src/assets/photos/` (or `illustrations/`). Use lowercase, underscores, no spaces (e.g. `02_miguel_angel_soutullo_alvarez.webp`). Reference in the section with a path relative to the component or via alias `@/assets/...` if needed.

## Example: “Reconstitution du tracé” section

- **i18n**: New key `reconstitutionTrac` with `imageCaption`, `title`, `paragraph1`, `paragraph2`, `question` (fr + es).
- **Component**: `ReconstitutionTracSection.vue` — hero image (ImageCrop) → caption with short orange horizontal line (`::before`) → title with orange line → two paragraphs → question block with teal left border.
- **HomeView**: Import and render `<ReconstitutionTracSection />` after `<AssociationSection />`.

This keeps sections consistent in structure, i18n, typography, and placement.
