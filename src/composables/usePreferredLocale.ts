/**
 * Detects the user's preferred locale from the browser.
 * Returns 'es' if the navigator prefers Spanish, otherwise 'fr' (main language).
 * Safe for SSR (returns 'fr' when navigator is undefined).
 */
export type SupportedLocale = 'fr' | 'es'

const SUPPORTED_LOCALES: SupportedLocale[] = ['fr', 'es']

function getNavigatorLocale(): string {
  if (import.meta.env.SSR || typeof navigator === 'undefined') return 'fr'
  const lang =
    navigator.language ||
    (navigator.languages?.[0]) ||
    (navigator as { userLanguage?: string }).userLanguage ||
    ''
  const code = (lang ?? '').toLowerCase().split('-')[0]
  return code ?? ''
}

/**
 * Returns the preferred locale for the app based on browser language.
 * Always checks navigator; use when redirecting from / or when no locale is in the URL.
 */
export function getPreferredLocale(): SupportedLocale {
  const browser = getNavigatorLocale()
  if (SUPPORTED_LOCALES.includes(browser as SupportedLocale)) return browser as SupportedLocale
  return 'fr'
}
