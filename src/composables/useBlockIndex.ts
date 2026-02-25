import type { Ref } from 'vue'

/**
 * Resolves the block index of an element that lives inside a [data-block].
 * The index is the position of that block among its siblings in the rail.
 * Call from onMounted when the ref is set; returns -1 if not inside a block or rail not found.
 */
export function getBlockIndexFromElement(element: Element | null | undefined): number {
  if (!element) return -1
  const blockEl = element.closest('[data-block]')
  if (!blockEl) return -1
  const rail = blockEl.parentElement
  if (!rail) return -1
  const blocks = rail.querySelectorAll('[data-block]')
  return blocks ? Array.from(blocks).indexOf(blockEl as Element) : -1
}

/**
 * Composable that returns a function to resolve block index from a ref.
 * Use in sections: pass sectionRoot ref, call the returned function in onMounted to get myBlockIndex.
 */
export function useBlockIndex(rootRef: Ref<HTMLElement | null | undefined>): () => number {
  return () => getBlockIndexFromElement(rootRef.value ?? null)
}
