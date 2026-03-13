import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, ClipboardList, Factory, AlertTriangle,
  FileText, Brain, Settings, Shield, Smartphone, User
} from 'lucide-react'
import { useI18n } from '../../i18n'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, key: 'dashboard' as const },
  { path: '/tasks', icon: ClipboardList, key: 'inspectionTasks' as const },
  { path: '/assets', icon: Factory, key: 'assets' as const },
  { path: '/findings', icon: AlertTriangle, key: 'findings' as const },
  { path: '/reports', icon: FileText, key: 'reports' as const },
  { path: '/ai-insights', icon: Brain, key: 'aiInsights' as const },
  { path: '/mobile', icon: Smartphone, key: 'mobileInspection' as const },
  { path: '/settings', icon: Settings, key: 'settings' as const },
]

export default function Sidebar() {
  const { t } = useI18n()
  const location = useLocation()

  return (
    <div className="w-64 bg-slate-900 flex flex-col h-full fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700/50">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-base leading-tight">{t.appName}</p>
          <p className="text-slate-400 text-xs">{t.appTagline}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ path, icon: Icon, key }) => {
          const isActive = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path))
          return (
            <NavLink
              key={path}
              to={path}
              className={`sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: '1.125rem', height: '1.125rem' }} />
              <span>{t.nav[key]}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{t.user.fullName}</p>
            <p className="text-xs text-slate-400 truncate">{t.user.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
