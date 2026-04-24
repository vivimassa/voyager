/**
 * Brand defaults — baked-in values read from NEXT_PUBLIC_* env vars.
 *
 * These represent the "out of the box" identity that every fresh browser sees
 * on first visit (or whenever the in-app Brand settings override is cleared).
 *
 * Split responsibility:
 *   • this module  — static defaults, safe on both server and client
 *   • brand-store  — runtime overrides, browser-only (zustand + localStorage)
 *   • use-brand    — React hook that merges the two, for use in components
 *
 * Why both?
 *   • SSR / Next metadata (tab titles, og tags, etc.) can't read browser state.
 *     The env default guarantees a sensible first paint and SEO title.
 *   • For anyone demoing the product pre-naming, the in-app modal lets you
 *     retitle the whole UI in two seconds without a rebuild.
 */

export type Brand = {
  /** User-facing product name, e.g. "Voyager" or "Enterprise". */
  name: string
  /** Short mark for the square logo tile — usually 1-2 letters. */
  mark: string
  /** Optional short tagline shown in hero / meta description. */
  tagline: string
}

export const BRAND_DEFAULTS: Brand = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Voyager',
  mark: process.env.NEXT_PUBLIC_BRAND_MARK || 'V',
  tagline:
    process.env.NEXT_PUBLIC_BRAND_TAGLINE || 'Vietnam, sorted — airport to adventure.',
}
