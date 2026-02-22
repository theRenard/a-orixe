import { onMounted } from 'vue'

const BODY_CLASS = 'show-component-labels'

/**
 * In Vite dev mode, adds a class to document.body so that component labels
 * (data-component) are shown at the top-left of each section. In production
 * the labels are never shown.
 */
export function useShowComponentLabels(): void {
  onMounted(() => {
    if (import.meta.env.DEV) {
      document.body.classList.add(BODY_CLASS)
    }
  })
}
