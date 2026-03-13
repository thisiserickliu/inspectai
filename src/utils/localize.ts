import type { Locale } from '../i18n'

/**
 * Picks the locale-specific value for a field from a data object.
 * For 'zh-TW' → looks for `fieldZh`, falls back to `field`.
 * For 'ja'    → looks for `fieldJa`, falls back to `field`.
 * For 'en'    → returns `field` directly.
 */
export function lf(locale: Locale, item: Record<string, unknown>, field: string): string {
  if (locale === 'zh-TW') {
    const zh = item[field + 'Zh']
    if (typeof zh === 'string' && zh) return zh
  }
  if (locale === 'ja') {
    const ja = item[field + 'Ja']
    if (typeof ja === 'string' && ja) return ja
  }
  return String(item[field] ?? '')
}

/** Maps an English team/owner string to a t.teams key. */
export function teamKey(owner: string): string {
  const map: Record<string, string> = {
    'Mechanical Team': 'mechanical',
    'Electrical Team': 'electrical',
    'Engineering Team': 'engineering',
    'Chemical Team': 'chemical',
    'Utility Team': 'utility',
    'Production Team': 'production',
  }
  return map[owner] ?? 'mechanical'
}
