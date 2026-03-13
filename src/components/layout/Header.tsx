import { useState } from 'react'
import { Bell, ChevronDown, User, Globe } from 'lucide-react'
import { useI18n, Locale } from '../../i18n'
import { useLocation } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/tasks': 'inspectionTasks',
  '/assets': 'assets',
  '/findings': 'findings',
  '/reports': 'reports',
  '/ai-insights': 'aiInsights',
  '/mobile': 'mobileInspection',
  '/settings': 'settings',
}

export default function Header() {
  const { t, locale, setLocale } = useI18n()
  const location = useLocation()
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const pathKey = Object.keys(pageTitles).find(k => location.pathname.startsWith(k)) ?? '/dashboard'
  const titleKey = pageTitles[pathKey] as keyof typeof t.nav
  const title = t.nav[titleKey] ?? ''

  const languages: { code: Locale; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'zh-TW', label: '繁體中文' },
    { code: 'ja', label: '日本語' },
  ]

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 sticky top-0 z-20">
      <h1 className="text-xl font-semibold text-gray-900 flex-1">{title}</h1>

      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => { setShowLangMenu(!showLangMenu); setShowNotifications(false); setShowProfile(false) }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{locale === 'zh-TW' ? t.languages.zhTW : t.languages[locale as 'en' | 'ja']}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {showLangMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-36 z-50">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { setLocale(lang.code); setShowLangMenu(false) }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    locale === lang.code
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowLangMenu(false); setShowProfile(false) }}
            className="relative w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-80 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">{t.notifications}</h3>
              </div>
              <div className="py-2">
                {[
                  { text: t.notif.n1, time: `5 ${t.notif.minAgo}`, dot: 'bg-red-500' },
                  { text: t.notif.n2, time: `1 ${t.notif.hrAgo}`, dot: 'bg-yellow-500' },
                  { text: t.notif.n3, time: `2 ${t.notif.hrsAgo}`, dot: 'bg-green-500' },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`}></div>
                    <div>
                      <p className="text-xs text-gray-800 leading-snug">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowLangMenu(false); setShowNotifications(false) }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{t.user.name}</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
          {showProfile && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-44 z-50">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{t.profile}</button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">{t.logout}</button>
            </div>
          )}
        </div>
      </div>

      {/* Close menus on outside click */}
      {(showLangMenu || showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowLangMenu(false); setShowNotifications(false); setShowProfile(false) }}
        />
      )}
    </header>
  )
}
