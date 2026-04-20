import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, ClipboardList, Factory, AlertTriangle,
  FileText, Brain, Settings, Smartphone, X,
} from 'lucide-react'
import { useI18n } from '../../i18n'

const navItems = [
  { path: '/dashboard',   icon: LayoutDashboard, key: 'dashboard'        as const, code: '01' },
  { path: '/tasks',       icon: ClipboardList,   key: 'inspectionTasks'  as const, code: '02' },
  { path: '/assets',      icon: Factory,         key: 'assets'           as const, code: '03' },
  { path: '/findings',    icon: AlertTriangle,   key: 'findings'         as const, code: '04' },
  { path: '/reports',     icon: FileText,        key: 'reports'          as const, code: '05' },
  { path: '/ai-insights', icon: Brain,           key: 'aiInsights'       as const, code: '06' },
  { path: '/mobile',      icon: Smartphone,      key: 'mobileInspection' as const, code: '07' },
  { path: '/settings',    icon: Settings,        key: 'settings'         as const, code: '08' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { t } = useI18n()
  const location = useLocation()

  return (
    <aside
      className={`w-64 flex flex-col h-full fixed left-0 top-0 z-40 transition-transform duration-200 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ background: '#15181a', color: '#cdd0cf' }}
    >
      {/* Brand mark */}
      <div className="px-5 pt-6 pb-5 flex items-center justify-between" style={{ borderBottom: '1px solid #2a2d2f' }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 34, height: 34, border: '1px solid #44484a', position: 'relative', background: '#1d2022', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 6, background: '#b5532a' }} />
            <div style={{ position: 'absolute', right: -1, bottom: -1, width: 6, height: 6, background: '#15181a', border: '1px solid #44484a' }} />
          </div>
          <div>
            <div className="serif" style={{ fontSize: 17, color: '#f2efe9', letterSpacing: '-0.01em', fontWeight: 500 }}>
              {t.appName}
            </div>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.22em', color: '#7a7e80', textTransform: 'uppercase' }}>
              Inspect / v4.2
            </div>
          </div>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden flex items-center justify-center"
          style={{ color: '#7a7e80', background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Section tag */}
      <div className="px-5 pt-5 pb-3">
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: '.24em', color: '#6a6e70', textTransform: 'uppercase' }}>
          — Workbench
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto" style={{ paddingLeft: 6, paddingRight: 6 }}>
        {navItems.map(({ path, icon: Icon, key, code }) => {
          const isActive = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path))
          return (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={`sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
            >
              <span className="mono" style={{ fontSize: 10, color: '#6a6e70', width: 18, flexShrink: 0 }}>{code}</span>
              <Icon size={15} strokeWidth={1.5} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{t.nav[key]}</span>
              {isActive && <span className="mono" style={{ fontSize: 10, color: '#b5532a' }}>●</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* Live status strip */}
      <div
        className="px-5 py-4 mono"
        style={{ borderTop: '1px solid #2a2d2f', fontSize: 10, color: '#7a7e80', letterSpacing: '.1em' }}
      >
        <div className="flex items-center justify-between">
          <span>PLANT · P001</span>
          <span style={{ color: '#7a8a5a' }}>● LIVE</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span>TZ UTC+08</span>
          <span>12:41</span>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid #2a2d2f' }}>
        <div className="flex items-center gap-3">
          <div
            style={{ width: 32, height: 32, borderRadius: 2, background: '#2a2d2f', border: '1px solid #3a3d3f', flexShrink: 0 }}
            className="flex items-center justify-center"
          >
            <span className="mono" style={{ fontSize: 11, color: '#e6e3dc', letterSpacing: '.05em' }}>CW</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: '#f2efe9' }}>{t.user.fullName}</div>
            <div className="mono" style={{ fontSize: 9.5, color: '#7a7e80', letterSpacing: '.14em', textTransform: 'uppercase' }}>
              {t.user.role}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
