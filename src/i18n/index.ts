import { createContext, useContext } from 'react'
import en from './en'
import zhTW from './zh-TW'
import ja from './ja'

export type Locale = 'en' | 'zh-TW' | 'ja'
export const locales: Record<Locale, typeof en> = { en, 'zh-TW': zhTW as typeof en, ja: ja as typeof en }
export const LocaleContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void; t: typeof en }>({
  locale: 'en',
  setLocale: () => {},
  t: en,
})
export const useI18n = () => useContext(LocaleContext)
