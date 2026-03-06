const BODY_CLASS = 'show-component-labels'

/**
 * In dev, adds a class to document.body so component labels (data-component)
 * are shown at the top-left of each section. Call once after app mount (e.g. from main.ts).
 */
export function initShowComponentLabels(): void {
  if (import.meta.env.DEV) {
    document.body.classList.add(BODY_CLASS)
  }
}
