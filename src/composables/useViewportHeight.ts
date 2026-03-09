function getVisualViewportHeight(): number | null {
  if (typeof window === 'undefined') return null
  return window.visualViewport?.height ?? null
}

export function getViewportHeight(): number {
  if (typeof window === 'undefined') return 0
  return Math.round(getVisualViewportHeight() ?? window.innerHeight)
}

export function subscribeViewportHeight(onChange: (height: number) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  let rafId = 0
  const scheduleUpdate = () => {
    if (rafId) return
    rafId = window.requestAnimationFrame(() => {
      rafId = 0
      onChange(getViewportHeight())
    })
  }

  scheduleUpdate()
  window.addEventListener('resize', scheduleUpdate, { passive: true })
  window.visualViewport?.addEventListener('resize', scheduleUpdate, { passive: true })
  window.visualViewport?.addEventListener('scroll', scheduleUpdate, { passive: true })

  return () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId)
      rafId = 0
    }
    window.removeEventListener('resize', scheduleUpdate)
    window.visualViewport?.removeEventListener('resize', scheduleUpdate)
    window.visualViewport?.removeEventListener('scroll', scheduleUpdate)
  }
}

export function installViewportHeightVar(): () => void {
  if (typeof document === 'undefined') return () => {}

  return subscribeViewportHeight((height) => {
    document.documentElement.style.setProperty('--app-height', `${height}px`)
  })
}
