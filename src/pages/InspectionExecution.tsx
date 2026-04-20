import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Camera, Plus, AlertTriangle, CheckCircle, XCircle, MinusCircle, Save, Send, X } from 'lucide-react'
import { useI18n } from '../i18n'
import { lf } from '../utils/localize'
import SeverityBadge from '../components/common/SeverityBadge'
import { checklistItems, findings } from '../data/mockData'

type CheckResult = 'pass' | 'fail' | 'attention' | null

const severities = ['low', 'medium', 'high', 'critical'] as const
const categories = ['leakage', 'corrosion', 'overheating', 'vibration', 'surfaceCrack', 'misalignment', 'looseConnection', 'abnormalNoise', 'contamination', 'wear', 'other'] as const

const taskFindings = findings.filter(f => f.taskId === 'IT-2024-0302')

const resultBtnStyle = (active: boolean, color: string) => ({
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '6px 10px', border: `1px solid ${active ? color : 'var(--rule)'}`,
  fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all .15s',
  background: active ? color : 'transparent',
  color: active ? 'var(--paper)' : 'var(--muted)',
  fontFamily: 'inherit',
})

const severityActiveStyle = (sev: string, active: boolean) => {
  const colors: Record<string, string> = {
    critical: 'var(--flag)', high: 'var(--rust)', medium: 'var(--ochre)', low: 'var(--moss)',
  }
  const c = colors[sev] ?? 'var(--steel)'
  return {
    flex: 1, padding: '7px', fontSize: 11, fontWeight: 500, cursor: 'pointer',
    border: `1px solid ${active ? c : 'var(--rule)'}`,
    background: active ? c : 'transparent',
    color: active ? 'var(--paper)' : 'var(--muted)',
    transition: 'all .15s', fontFamily: 'inherit',
    letterSpacing: '.06em', textTransform: 'uppercase' as const,
  }
}

export default function InspectionExecution() {
  const { t, locale } = useI18n()
  const [results, setResults] = useState<Record<string, CheckResult>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [expandedNote, setExpandedNote] = useState<string | null>(null)
  const [showAddFinding, setShowAddFinding] = useState(false)
  const [newFinding, setNewFinding] = useState({ title: '', category: 'leakage' as typeof categories[number], severity: 'medium' as typeof severities[number], cause: '', action: '' })

  const completed = Object.values(results).filter(r => r !== null).length
  const total = checklistItems.length
  const progress = Math.round((completed / total) * 100)

  const resultIcon = (id: string, val: CheckResult) => {
    if (val === 'pass') return results[id] === 'pass' ? <CheckCircle size={14} /> : <CheckCircle size={14} />
    if (val === 'fail') return <XCircle size={14} />
    return <AlertTriangle size={14} />
  }

  const categoryLabel = (cat: string) => (t.findingCategory as Record<string, string>)[cat] ?? cat

  const checkStatusColor = (id: string) => {
    if (results[id] === 'pass') return 'var(--moss)'
    if (results[id] === 'fail') return 'var(--flag)'
    if (results[id] === 'attention') return 'var(--ochre)'
    return 'var(--rule)'
  }

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 px-4 sm:px-6 py-4" style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <nav className="flex items-center gap-1.5 flex-wrap mb-1">
              <Link to="/tasks" className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em', textDecoration: 'none' }}>
                {t.execution.breadcrumbTasks}
              </Link>
              <ChevronRight size={11} style={{ color: 'var(--muted)' }} />
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink)', fontWeight: 500, letterSpacing: '.08em' }}>IT-2024-0302</span>
              <ChevronRight size={11} style={{ color: 'var(--muted)' }} />
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em' }}>{t.reportContent.taoyuanPlant}</span>
            </nav>
            <h1 className="serif" style={{ fontSize: 20, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{t.execution.title}</h1>
            <p className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 2, letterSpacing: '.08em' }}>
              {t.execution.inspectorLabel}: {t.reportContent.inspectorWangMeiLing} · {t.execution.scheduledLabel}: 2024-03-01
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Progress */}
            <div>
              <p className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                {completed}/{total} {t.execution.items}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div style={{ width: 120, height: 3, background: 'var(--rule-2)', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, width: `${progress}%`, background: progress === 100 ? 'var(--moss)' : 'var(--rust)', transition: 'width .3s' }} />
                </div>
                <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink)', letterSpacing: '.04em' }}>{progress}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary flex items-center gap-2"><Save size={13} />{t.saveDraft}</button>
              <button className="btn-primary flex items-center gap-2"><Send size={13} />{t.submit}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-5 min-w-0">
            {/* General Information */}
            <div className="card p-5">
              <h2 className="mono" style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
                {t.execution.generalInfo}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: t.execution.taskIdLabel, value: 'IT-2024-0302' },
                  { label: t.asset, value: t.reportContent.coolingPumpCP104 },
                  { label: t.plant, value: t.reportContent.taoyuanPlant },
                  { label: t.zone, value: t.reportContent.zoneUtilityRoom },
                  { label: t.execution.inspectorLabel, value: t.reportContent.inspectorWangMeiLing },
                  { label: t.tasks.inspectionType, value: t.tasks.types.routine },
                  { label: t.tasks.scheduledDate, value: '2024-03-01' },
                  { label: t.riskLevel, value: <SeverityBadge severity="critical" /> },
                  { label: t.execution.assetCriticality, value: <SeverityBadge severity="critical" /> },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="section-label">{item.label}</p>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-2)', marginTop: 3 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="card overflow-hidden">
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--rule)' }}>
                <h2 className="mono" style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {t.execution.checklistSection}
                </h2>
                <span className="badge" style={{ color: progress === 100 ? 'var(--moss)' : 'var(--steel)', borderColor: progress === 100 ? 'var(--moss)' : 'var(--rule)' }}>
                  {completed}/{total} {t.execution.items}
                </span>
              </div>
              <div>
                {checklistItems.map((item) => (
                  <div key={item.id} className="p-4" style={{ borderBottom: '1px solid var(--rule-2)' }}>
                    <div className="flex items-start gap-3">
                      {/* Status indicator */}
                      <div style={{
                        width: 18, height: 18, flexShrink: 0, marginTop: 2,
                        border: `1.5px solid ${checkStatusColor(item.id)}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: results[item.id] ? checkStatusColor(item.id) : 'transparent',
                        color: 'var(--paper)', transition: 'all .15s',
                      }}>
                        {results[item.id] === 'pass' && <CheckCircle size={11} />}
                        {results[item.id] === 'fail' && <XCircle size={11} />}
                        {results[item.id] === 'attention' && <AlertTriangle size={11} />}
                        {!results[item.id] && <MinusCircle size={11} style={{ color: 'var(--rule)', background: 'transparent' }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{lf(locale, item as Record<string, unknown>, 'item')}</p>
                        <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{lf(locale, item as Record<string, unknown>, 'description')}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {(['pass', 'attention', 'fail'] as CheckResult[]).map(val => {
                            const icons: Record<string, React.ReactNode> = {
                              pass: <CheckCircle size={12} />, attention: <AlertTriangle size={12} />, fail: <XCircle size={12} />,
                            }
                            const colors: Record<string, string> = {
                              pass: 'var(--moss)', attention: 'var(--ochre)', fail: 'var(--flag)',
                            }
                            const labels: Record<string, string> = {
                              pass: t.execution.pass, attention: t.execution.attention, fail: t.execution.fail,
                            }
                            const active = results[item.id] === val
                            return (
                              <button
                                key={val!}
                                onClick={() => setResults(prev => ({ ...prev, [item.id]: prev[item.id] === val ? null : val }))}
                                style={resultBtnStyle(active, colors[val!])}
                              >
                                {icons[val!]}
                                <span className="mono" style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase' }}>{labels[val!]}</span>
                              </button>
                            )
                          })}
                          <button
                            onClick={() => setExpandedNote(expandedNote === item.id ? null : item.id)}
                            className="mono"
                            style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            {expandedNote === item.id ? t.execution.hideNotes : t.execution.notes}
                          </button>
                        </div>
                        {expandedNote === item.id && (
                          <textarea
                            className="form-input mt-2 resize-none"
                            rows={3}
                            placeholder={t.execution.notesPlaceholder}
                            value={notes[item.id] ?? ''}
                            onChange={e => setNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                          />
                        )}
                      </div>
                      <button
                        className="btn-secondary flex-shrink-0"
                        style={{ padding: '5px 8px' }}
                      >
                        <Camera size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Evidence */}
            <div className="card p-5">
              <h2 className="mono" style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>
                {t.execution.photoEvidence}
              </h2>
              <div style={{ border: '2px dashed var(--rule)', padding: '32px 16px', textAlign: 'center', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--rust)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
              >
                <Camera size={32} style={{ color: 'var(--rule)', margin: '0 auto 8px' }} strokeWidth={1} />
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>{t.execution.tapToUpload}</p>
                <p style={{ fontSize: 11, color: 'var(--stone)', marginTop: 4 }}>{t.execution.photoHint}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ aspectRatio: '1', background: 'var(--canvas)', border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                    className="group"
                  >
                    <Camera size={18} style={{ color: 'var(--stone)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,29,31,0.5)', opacity: 0, transition: 'opacity .15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      className="group-hover:opacity-100">
                      <X size={16} style={{ color: 'var(--paper)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Findings */}
            <div className="card overflow-hidden">
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--rule)' }}>
                <h2 className="mono" style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {t.execution.findingsSection}
                </h2>
                <button onClick={() => setShowAddFinding(true)} className="btn-primary" style={{ fontSize: 11, padding: '5px 10px' }}>
                  <Plus size={12} /> {t.execution.addFinding}
                </button>
              </div>
              <div>
                {taskFindings.map(f => {
                  const c = f.severity === 'critical' ? 'var(--flag)' : f.severity === 'high' ? 'var(--rust)' : f.severity === 'medium' ? 'var(--ochre)' : 'var(--moss)'
                  return (
                    <div key={f.id} className="p-4 flex items-start gap-3" style={{ borderBottom: '1px solid var(--rule-2)' }}>
                      <AlertTriangle size={14} style={{ color: c, marginTop: 2, flexShrink: 0 }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{lf(locale, f as Record<string, unknown>, 'title')}</p>
                          <SeverityBadge severity={f.severity} />
                          <span className="badge" style={{ color: 'var(--muted)', borderColor: 'var(--rule)' }}>
                            {categoryLabel(f.category)}
                          </span>
                        </div>
                        <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {lf(locale, f as Record<string, unknown>, 'description')}
                        </p>
                      </div>
                      <Link to={`/findings/${f.id}`} className="mono flex-shrink-0"
                        style={{ fontSize: 10.5, color: 'var(--rust)', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                        {t.viewDetails} →
                      </Link>
                    </div>
                  )
                })}
                {taskFindings.length === 0 && (
                  <div style={{ padding: '32px', textAlign: 'center', fontSize: 13, color: 'var(--stone)' }}>{t.empty.noFindings}</div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-60 lg:flex-shrink-0 space-y-4 lg:sticky lg:top-36 lg:self-start">
            {/* Inspection Summary */}
            <div className="card p-4">
              <h3 className="section-label mb-3">{t.execution.inspectionSummary}</h3>
              <div className="space-y-2">
                {[
                  { label: t.execution.passCount, count: Object.values(results).filter(r => r === 'pass').length, color: 'var(--moss)' },
                  { label: t.execution.attention, count: Object.values(results).filter(r => r === 'attention').length, color: 'var(--ochre)' },
                  { label: t.execution.failCount, count: Object.values(results).filter(r => r === 'fail').length, color: 'var(--flag)' },
                  { label: t.execution.notInspected, count: total - completed, color: 'var(--stone)' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{item.label}</span>
                    <span className="serif" style={{ fontSize: 18, lineHeight: 1, color: item.color, fontVariationSettings: '"opsz" 36' }}>{item.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 flex justify-between items-center" style={{ borderTop: '1px solid var(--rule)' }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink-2)' }}>{t.findings}</span>
                <span className="serif" style={{ fontSize: 18, lineHeight: 1, color: 'var(--rust)', fontVariationSettings: '"opsz" 36' }}>
                  {taskFindings.length}
                </span>
              </div>
            </div>

            {/* Findings by severity */}
            <div className="card p-4">
              <h3 className="section-label mb-3">{t.execution.findingsSummary}</h3>
              {(['critical', 'high', 'medium', 'low'] as const).map(sev => {
                const count = taskFindings.filter(f => f.severity === sev).length
                return (
                  <div key={sev} className="flex items-center justify-between mb-2">
                    <SeverityBadge severity={sev} />
                    <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>{count}</span>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="card p-4">
              <h3 className="section-label mb-3">{t.execution.quickActions}</h3>
              <div className="space-y-2">
                <button onClick={() => setShowAddFinding(true)} className="w-full btn-secondary flex items-center justify-center gap-2">
                  <Plus size={12} /> {t.execution.addFinding}
                </button>
                <button className="w-full btn-secondary flex items-center justify-center gap-2">
                  <Camera size={12} /> {t.execution.uploadPhoto}
                </button>
                <button className="w-full btn-secondary flex items-center justify-center gap-2">
                  <Save size={12} /> {t.saveDraft}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Finding Modal */}
      {showAddFinding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(26,29,31,0.5)' }}>
          <div className="card w-full max-w-lg" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--rule)' }}>
              <h3 className="mono" style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--ink)' }}>{t.execution.addFinding}</h3>
              <button onClick={() => setShowAddFinding(false)} className="btn-secondary" style={{ padding: '4px 8px' }}>
                <X size={13} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="section-label" style={{ display: 'block', marginBottom: 6 }}>{t.execution.findingTitle}</label>
                <input
                  type="text"
                  value={newFinding.title}
                  onChange={e => setNewFinding(p => ({ ...p, title: e.target.value }))}
                  className="form-input"
                  placeholder={t.execution.findingTitlePlaceholder}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="section-label" style={{ display: 'block', marginBottom: 6 }}>{t.execution.findingCategory}</label>
                  <select
                    value={newFinding.category}
                    onChange={e => setNewFinding(p => ({ ...p, category: e.target.value as typeof categories[number] }))}
                    className="form-input"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{categoryLabel(c)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="section-label" style={{ display: 'block', marginBottom: 6 }}>{t.execution.severityLabel}</label>
                  <div className="flex items-center gap-1">
                    {severities.map(sev => (
                      <button
                        key={sev}
                        onClick={() => setNewFinding(p => ({ ...p, severity: sev }))}
                        style={severityActiveStyle(sev, newFinding.severity === sev)}
                      >
                        {(t.severity as Record<string, string>)[sev]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="section-label" style={{ display: 'block', marginBottom: 6 }}>{t.execution.probableCause}</label>
                <input
                  type="text"
                  value={newFinding.cause}
                  onChange={e => setNewFinding(p => ({ ...p, cause: e.target.value }))}
                  className="form-input"
                  placeholder={t.execution.causePlaceholder}
                />
              </div>
              <div>
                <label className="section-label" style={{ display: 'block', marginBottom: 6 }}>{t.execution.recommendedAction}</label>
                <textarea
                  rows={3}
                  value={newFinding.action}
                  onChange={e => setNewFinding(p => ({ ...p, action: e.target.value }))}
                  className="form-input resize-none"
                  placeholder={t.execution.actionPlaceholder}
                />
              </div>
              <div style={{ border: '2px dashed var(--rule)', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--rust)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
              >
                <Camera size={20} style={{ color: 'var(--stone)', margin: '0 auto 6px' }} strokeWidth={1} />
                <p style={{ fontSize: 11, color: 'var(--muted)' }}>{t.execution.tapToUpload}</p>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowAddFinding(false)} className="btn-secondary">{t.cancel}</button>
                <button onClick={() => setShowAddFinding(false)} className="btn-primary">{t.add} {t.finding}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
