import { useState } from 'react'
import { Bell, ChevronDown, Globe, Search, Filter, Download, Menu } from 'lucide-react'
import { useI18n, Locale } from '../../i18n'
import { useLocation } from 'react-router-dom'

const pageConfig: Record<string, { section: string; title: string }> = {
  '/dashboard':   { section: 'Workbench / Dashboard',  title: 'Executive Overview'    },
  '/tasks':       { section: 'Workbench / Tasks',       title: 'Inspection Log'        },
  '/assets':      { section: 'Workbench / Assets',      title: 'Asset Registry'        },
  '/findings':    { section: 'Workbench / Findings',    title: 'Findings Index'        },
  '/reports':     { section: 'Workbench / Reports',     title: 'Report Archive'        },
  '/ai-insights': { section: 'Workbench / AI Insights', title: 'Signal Analysis'       },
  '/mobile':      { section: 'Workbench / Mobile',      title: 'Field Inspection'      },
  '/settings':    { section: 'Workbench / Settings',    title: 'System Configuration'  },
}

const languages: { code: Locale; label: string; short: string }[] = [
  { code: 'en',    label: 'English',   short: 'EN' },
  { code: 'zh-TW', label: '繁體中文', short: '中'  },
  { code: 'ja',    label: '日本語',   short: '日'  },
]

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { locale, setLocale } = useI18n()
  const location = useLocation()
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const closeAll = () => { setShowLangMenu(false); setShowNotifications(false); setShowProfile(false) }
  const pathKey = Object.keys(pageConfig).find(k => location.pathname.startsWith(k)) ?? '/dashboard'
  const config = pageConfig[pathKey]
  const currentLang = languages.find(l => l.code === locale)

  return (
    <header className="sticky top-0 z-20" style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)' }}>
      <div className="flex items-stretch">

        {/* Hamburger — mobile only */}
        <button
          className="lg:hidden flex items-center justify-center px-4"
          onClick={onMenuClick}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', borderRight: '1px solid var(--rule)', color: 'var(--ink-2)' }}
        >
          <Menu size={18} />
        </button>

        {/* Title */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-5 flex items-end gap-4 sm:gap-6 min-w-0">
          <div className="min-w-0">
            <div className="section-label truncate">{config.section}</div>
            <h1 className="serif" style={{ fontSize: 'clamp(20px, 3vw, 28px)', letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 2, fontWeight: 500, color: 'var(--ink)' }}>
              {config.title}
            </h1>
          </div>
          <div className="mono hidden sm:block" style={{ fontSize: 11, color: 'var(--muted)', paddingBottom: 6, letterSpacing: '.08em', whiteSpace: 'nowrap' }}>
            W12 · MON 2024‑03‑11
          </div>
        </div>

        {/* Actions rail */}
        <div className="flex items-stretch" style={{ borderLeft: '1px solid var(--rule)' }}>

          {/* Utility buttons — hidden on small screens */}
          <div className="hidden md:flex items-center gap-2 px-4" style={{ borderRight: '1px solid var(--rule)' }}>
            <button className="btn-secondary"><Search size={12} /> <span className="hidden lg:inline">Search</span></button>
            <button className="btn-secondary hidden lg:inline-flex"><Filter size={12} /> Filter</button>
            <button className="btn-secondary hidden lg:inline-flex"><Download size={12} /> Export</button>
          </div>

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => { setShowLangMenu(!showLangMenu); setShowNotifications(false); setShowProfile(false) }}
              style={{ padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '.12em', color: 'var(--ink-2)', background: 'transparent', cursor: 'pointer', border: 'none', borderRight: '1px solid var(--rule)' } as React.CSSProperties}
            >
              <Globe size={13} /> {currentLang?.short} <ChevronDown size={11} />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full card z-50" style={{ width: 148, marginTop: -1 }}>
                {languages.map((lang, i) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLocale(lang.code); setShowLangMenu(false) }}
                    style={{
                      width: '100%', textAlign: 'left', padding: '10px 16px',
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '.1em',
                      color: locale === lang.code ? 'var(--rust)' : 'var(--ink-2)',
                      background: 'transparent', cursor: 'pointer', display: 'block',
                      borderBottom: i < languages.length - 1 ? '1px solid var(--rule-2)' : 'none',
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bell */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowLangMenu(false); setShowProfile(false) }}
              style={{ padding: '0 14px', height: '100%', display: 'flex', alignItems: 'center', background: 'transparent', cursor: 'pointer', border: 'none', borderRight: '1px solid var(--rule)', position: 'relative' } as React.CSSProperties}
            >
              <Bell size={16} style={{ color: 'var(--ink-2)' }} />
              <span style={{ position: 'absolute', top: 14, right: 8, width: 6, height: 6, background: 'var(--flag)' }} />
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-full card z-50" style={{ width: 'min(360px, calc(100vw - 32px))', marginTop: -1 }}>
                <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--rule)' }}>
                  <span className="section-label">Notifications · 3</span>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', cursor: 'pointer' }}>MARK ALL</span>
                </div>
                {[
                  { text: 'Critical finding on CP‑104 requires immediate attention', time: '5 MIN AGO', color: 'var(--flag)' },
                  { text: 'Inspection IT‑2024‑0311 is in progress (65%)',            time: '1 HR AGO',  color: 'var(--ochre)' },
                  { text: 'Report RPT‑2024‑Q1‑001 has been approved',                time: '2 HRS AGO', color: 'var(--moss)' },
                ].map((n, i, arr) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--rule-2)' : 'none', cursor: 'pointer' }}>
                    <span className="sq" style={{ background: n.color, marginTop: 4, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 12.5, lineHeight: 1.45, color: 'var(--ink)' }}>{n.text}</p>
                      <p className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2, letterSpacing: '.1em' }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setShowProfile(!showProfile); setShowLangMenu(false); setShowNotifications(false) }}
              style={{ padding: '0 14px', height: '100%', display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', cursor: 'pointer', border: 'none' }}
            >
              <div
                className="flex items-center justify-center mono"
                style={{ width: 28, height: 28, borderRadius: 2, background: 'var(--ink)', color: 'var(--paper)', fontSize: 11, letterSpacing: '.04em', flexShrink: 0 }}
              >
                CW
              </div>
              <div className="hidden sm:block" style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>Wei‑Ming</div>
                <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '.12em' }}>PLANT MGR</div>
              </div>
            </button>
            {showProfile && (
              <div className="absolute right-0 top-full card z-50" style={{ width: 160, marginTop: -1 }}>
                <button style={{ width: '100%', textAlign: 'left', padding: '10px 16px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '.1em', color: 'var(--ink-2)', background: 'transparent', cursor: 'pointer', display: 'block', borderBottom: '1px solid var(--rule-2)' }}>
                  PROFILE
                </button>
                <button style={{ width: '100%', textAlign: 'left', padding: '10px 16px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '.1em', color: 'var(--flag)', background: 'transparent', cursor: 'pointer', display: 'block' }}>
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary meta rail */}
      <div
        className="flex items-center gap-3 sm:gap-6 px-4 sm:px-8 py-2 mono overflow-x-auto"
        style={{ fontSize: 10.5, letterSpacing: '.14em', color: 'var(--muted)', borderTop: '1px solid var(--rule-2)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
      >
        <span>Taoyuan · P001</span>
        <span>Zones 03</span>
        <span className="hidden sm:inline">Assets 24</span>
        <span className="hidden sm:inline">Inspectors 04</span>
        <span style={{ marginLeft: 'auto', color: 'var(--pine)' }}>◐ Sync 12:41</span>
      </div>

      {(showLangMenu || showNotifications || showProfile) && (
        <div className="fixed inset-0 z-40" onClick={closeAll} />
      )}
    </header>
  )
}
