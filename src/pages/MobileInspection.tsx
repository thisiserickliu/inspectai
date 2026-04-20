import { useState } from 'react'
import { ArrowLeft, Wifi, WifiOff, CheckCircle, XCircle, AlertTriangle, Camera, Plus, ChevronDown, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { lf } from '../utils/localize'
import { checklistItems } from '../data/mockData'

type CheckResult = 'pass' | 'fail' | 'attention' | null

export default function MobileInspection() {
  const { t, locale } = useI18n()
  const [isOnline, setIsOnline] = useState(true)
  const [results, setResults] = useState<Record<string, CheckResult>>({})
  const [expandedNote, setExpandedNote] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [showFindingSheet, setShowFindingSheet] = useState(false)

  const completed = Object.values(results).filter(r => r !== null).length
  const total = checklistItems.length
  const progress = Math.round((completed / total) * 100)

  const setResult = (id: string, val: CheckResult) => {
    setResults(prev => ({ ...prev, [id]: prev[id] === val ? null : val }))
  }

  const itemBg = (id: string) => {
    if (results[id] === 'pass') return { border: '1px solid var(--moss)', background: 'rgba(122,138,90,0.06)' }
    if (results[id] === 'fail') return { border: '1px solid var(--flag)', background: 'rgba(168,62,43,0.06)' }
    if (results[id] === 'attention') return { border: '1px solid var(--ochre)', background: 'rgba(200,154,60,0.06)' }
    return { border: '1px solid var(--rule)', background: 'var(--canvas)' }
  }

  const btnActive = (id: string, val: CheckResult, activeColor: string) =>
    results[id] === val
      ? { background: activeColor, color: 'var(--paper)', border: `1px solid ${activeColor}` }
      : { background: 'transparent', color: 'var(--muted)', border: '1px solid var(--rule)' }

  const severityBtnStyle = (sev: string) => {
    const colors: Record<string, string> = {
      critical: 'var(--flag)', high: 'var(--rust)', medium: 'var(--ochre)', low: 'var(--moss)',
    }
    const c = colors[sev] ?? 'var(--steel)'
    return { flex: 1, padding: '10px 4px', border: `1px solid ${c}`, color: c, background: 'transparent', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit', letterSpacing: '.06em', textTransform: 'uppercase' as const }
  }

  return (
    <div className="p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-sm">
        {/* Mobile frame hint */}
        <div className="mb-4 text-center">
          <span className="badge" style={{ color: 'var(--steel)', borderColor: 'var(--steel)' }}>
            <span style={{ width: 6, height: 6, background: 'var(--steel)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            {t.mobile.mobileView}
          </span>
        </div>

        {/* Phone shell */}
        <div className="overflow-hidden" style={{ border: '1px solid var(--rule)', background: 'var(--card)' }}>
          {/* Mobile Top Bar */}
          <div className="px-4 py-3 flex items-center justify-between" style={{ background: '#15181a' }}>
            <Link to="/tasks" style={{ color: '#cdd0cf', display: 'flex' }}>
              <ArrowLeft size={18} />
            </Link>
            <div className="text-center">
              <p className="mono" style={{ fontSize: 12, fontWeight: 600, color: '#f2efe9', letterSpacing: '.04em' }}>IT-2024-0312</p>
              <p className="mono" style={{ fontSize: 10, color: '#7a7e80', letterSpacing: '.1em' }}>CP-104 · {t.tasks.types.followUp}</p>
            </div>
            <button onClick={() => setIsOnline(!isOnline)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {isOnline ? (
                <div className="flex items-center gap-1">
                  <Wifi size={14} style={{ color: '#7a8a5a' }} />
                  <span className="mono" style={{ fontSize: 10, color: '#7a8a5a', letterSpacing: '.08em' }}>{t.mobile.syncStatus}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <WifiOff size={14} style={{ color: 'var(--ochre)' }} />
                  <span className="mono" style={{ fontSize: 10, color: 'var(--ochre)', letterSpacing: '.08em' }}>{t.mobile.offline}</span>
                </div>
              )}
            </button>
          </div>

          {/* Offline Banner */}
          {!isOnline && (
            <div style={{ background: 'rgba(200,154,60,0.1)', borderBottom: '1px solid var(--ochre)', padding: '8px 16px' }}>
              <p className="mono" style={{ fontSize: 10.5, color: 'var(--ochre)', textAlign: 'center', letterSpacing: '.1em' }}>{t.mobile.offlineNotice}</p>
            </div>
          )}

          {/* Task Summary Card */}
          <div className="m-3 p-3" style={{ background: 'var(--canvas)', border: '1px solid var(--rule)' }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="section-label">{t.mobile.taskSummary}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginTop: 3 }}>{t.reportContent.coolingPumpCP104}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>{t.reportContent.zoneUtilityRoom} · {t.reportContent.taoyuanPlant}</p>
              </div>
              <span className="badge" style={{ color: 'var(--flag)', borderColor: 'var(--flag)' }}>{t.severity.critical}</span>
            </div>
            <div className="flex items-center justify-between mono" style={{ fontSize: 10.5, marginTop: 8, color: 'var(--muted)', letterSpacing: '.08em' }}>
              <span>{t.mobile.due} <span style={{ color: 'var(--flag)', fontWeight: 600 }}>2024-03-12</span></span>
              <span>{t.mobile.inspectorShort} {t.reportContent.inspectorWangShort}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between mono mb-1.5" style={{ fontSize: 10.5, letterSpacing: '.1em' }}>
              <span style={{ color: 'var(--muted)' }}>{t.mobile.progressLabel}</span>
              <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{completed}/{total}</span>
            </div>
            <div style={{ height: 3, background: 'var(--rule-2)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, width: `${progress}%`, background: progress === 100 ? 'var(--moss)' : 'var(--rust)', transition: 'width .3s' }} />
            </div>
            <p className="mono" style={{ fontSize: 10, color: 'var(--stone)', marginTop: 4, letterSpacing: '.08em' }}>
              {progress}% {t.execution.completedOf} {total} {t.execution.items}
            </p>
          </div>

          {/* Checklist */}
          <div className="px-3 pb-3 space-y-2" style={{ maxHeight: 400, overflowY: 'auto' }}>
            <p className="section-label px-1">{t.execution.checklistSection}</p>
            {checklistItems.slice(0, 6).map(item => (
              <div key={item.id} className="p-3 transition-all" style={{ ...itemBg(item.id) }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.4 }}>
                  {lf(locale, item as Record<string, unknown>, 'item')}
                </p>
                {/* Large touch targets */}
                <div className="grid grid-cols-3 gap-1.5">
                  {([['pass', 'var(--moss)', <CheckCircle key="p" size={13} />, t.execution.pass],
                     ['attention', 'var(--ochre)', <AlertTriangle key="a" size={13} />, t.mobile.attention],
                     ['fail', 'var(--flag)', <XCircle key="f" size={13} />, t.execution.fail]] as [string, string, React.ReactNode, string][])
                    .map(([val, color, icon, label]) => (
                    <button
                      key={val}
                      onClick={() => setResult(item.id, val as CheckResult)}
                      className="flex items-center justify-center gap-1 mono"
                      style={{ ...btnActive(item.id, val as CheckResult, color), padding: '10px 4px', cursor: 'pointer', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', transition: 'all .15s', fontFamily: 'inherit' }}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setExpandedNote(expandedNote === item.id ? null : item.id)}
                  className="flex items-center gap-1 mono mt-2"
                  style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  <ChevronDown size={11} style={{ transform: expandedNote === item.id ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }} />
                  {expandedNote === item.id ? t.mobile.hideNotes : t.mobile.expandNotes}
                </button>
                {expandedNote === item.id && (
                  <textarea
                    className="form-input mt-2 resize-none"
                    rows={2}
                    placeholder={t.mobile.notesPlaceholder}
                    value={notes[item.id] ?? ''}
                    onChange={e => setNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                  />
                )}
              </div>
            ))}
            {checklistItems.length > 6 && (
              <p className="mono text-center py-1" style={{ fontSize: 10, color: 'var(--stone)', letterSpacing: '.1em' }}>
                +{checklistItems.length - 6} {t.mobile.moreItems}
              </p>
            )}
          </div>

          {/* Bottom Action Area */}
          <div className="p-3 space-y-2" style={{ borderTop: '1px solid var(--rule)' }}>
            <div className="flex gap-2">
              <button className="flex-1 btn-secondary flex items-center justify-center gap-2" style={{ padding: '12px 8px' }}>
                <Camera size={14} />
                {t.mobile.addPhoto}
              </button>
              <button
                onClick={() => setShowFindingSheet(true)}
                className="flex-1 flex items-center justify-center gap-2 mono"
                style={{ padding: '12px 8px', border: '1px solid var(--rust)', color: 'var(--rust)', background: 'transparent', cursor: 'pointer', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: 'inherit', transition: 'all .15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--rust)'; e.currentTarget.style.color = 'var(--paper)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--rust)' }}
              >
                <Plus size={14} />
                {t.mobile.addFinding}
              </button>
            </div>
            <button
              className="w-full flex items-center justify-center gap-2 mono"
              style={{ padding: '14px', border: '1px solid var(--ink)', color: 'var(--ink)', background: 'transparent', cursor: 'pointer', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'inherit', transition: 'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--paper)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)' }}
            >
              <Send size={14} />
              {t.mobile.submitInspection}
            </button>
          </div>
        </div>

        {/* Quick Finding Sheet (simulated bottom sheet) */}
        {showFindingSheet && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:px-4"
            style={{ background: 'rgba(26,29,31,0.5)' }}>
            <div className="w-full max-w-sm card p-5 sm:rounded-none">
              <div style={{ width: 32, height: 3, background: 'var(--rule)', margin: '0 auto 16px' }} className="sm:hidden" />
              <h3 className="mono" style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 16 }}>
                {t.mobile.addFinding}
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t.mobile.findingTitlePlaceholder}
                  className="form-input"
                />
                <div className="grid grid-cols-2 gap-2">
                  {(['critical', 'high', 'medium', 'low'] as const).map(sev => (
                    <button key={sev} style={severityBtnStyle(sev)} className="mono">
                      {(t.severity as Record<string, string>)[sev]}
                    </button>
                  ))}
                </div>
                <div style={{ border: '2px dashed var(--rule)', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--rust)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
                >
                  <Camera size={20} style={{ color: 'var(--stone)' }} strokeWidth={1} />
                  <p className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{t.mobile.tapToAddPhoto}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setShowFindingSheet(false)} className="flex-1 btn-secondary">{t.cancel}</button>
                <button onClick={() => setShowFindingSheet(false)} className="flex-1 btn-primary">{t.save}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
