import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Camera, Plus, AlertTriangle, CheckCircle, XCircle, MinusCircle, Save, Send, X } from 'lucide-react'
import { useI18n } from '../i18n'
import SeverityBadge from '../components/common/SeverityBadge'
import { checklistItems, findings } from '../data/mockData'

type CheckResult = 'pass' | 'fail' | 'attention' | null

const severities = ['low', 'medium', 'high', 'critical'] as const
const categories = ['leakage', 'corrosion', 'overheating', 'vibration', 'surfaceCrack', 'misalignment', 'looseConnection', 'abnormalNoise', 'contamination', 'wear', 'other'] as const

const taskFindings = findings.filter(f => f.taskId === 'IT-2024-0302')

export default function InspectionExecution() {
  const { t } = useI18n()
  const [results, setResults] = useState<Record<string, CheckResult>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [expandedNote, setExpandedNote] = useState<string | null>(null)
  const [showAddFinding, setShowAddFinding] = useState(false)
  const [newFinding, setNewFinding] = useState({ title: '', category: 'leakage' as typeof categories[number], severity: 'medium' as typeof severities[number], cause: '', action: '' })

  const completed = Object.values(results).filter(r => r !== null).length
  const total = checklistItems.length
  const progress = Math.round((completed / total) * 100)

  const resultBtn = (id: string, value: CheckResult, icon: React.ReactNode, label: string, activeClass: string) => (
    <button
      onClick={() => setResults(prev => ({ ...prev, [id]: prev[id] === value ? null : value }))}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
        results[id] === value
          ? `${activeClass} border-transparent shadow-sm`
          : 'text-gray-500 border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      {icon}
      {label}
    </button>
  )

  const categoryLabel = (cat: string) => (t.findingCategory as Record<string, string>)[cat] ?? cat

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Link to="/tasks" className="hover:text-blue-600">{t.execution.breadcrumbTasks}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-800 font-medium">IT-2024-0302</span>
              <ChevronRight className="w-3 h-3" />
              <span>{t.reportContent.taoyuanPlant}</span>
              <ChevronRight className="w-3 h-3" />
              <span>{t.reportContent.zoneUtilityRoom}</span>
              <ChevronRight className="w-3 h-3" />
              <span>Cooling Pump CP-104</span>
            </nav>
            <h1 className="text-lg font-semibold text-gray-900">{t.execution.title}</h1>
            <p className="text-xs text-gray-500 mt-0.5">{t.execution.inspectorLabel}: Wang Mei-Ling · {t.execution.scheduledLabel}: 2024-03-01</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Progress */}
            <div className="text-center">
              <p className="text-xs text-gray-500">{completed} {t.execution.completedOf} {total} {t.execution.items}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-sm font-bold text-gray-900">{completed}/{total}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary flex items-center gap-2"><Save className="w-4 h-4" />{t.saveDraft}</button>
              <button className="btn-primary flex items-center gap-2"><Send className="w-4 h-4" />{t.submit}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 flex gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-5 min-w-0">
            {/* General Information */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">{t.execution.generalInfo}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: t.execution.taskIdLabel, value: 'IT-2024-0302' },
                  { label: t.asset, value: 'Cooling Pump CP-104' },
                  { label: t.plant, value: t.reportContent.taoyuanPlant },
                  { label: t.zone, value: t.reportContent.zoneUtilityRoom },
                  { label: t.execution.inspectorLabel, value: 'Wang Mei-Ling' },
                  { label: t.tasks.inspectionType, value: t.tasks.types.routine },
                  { label: t.tasks.scheduledDate, value: '2024-03-01' },
                  { label: t.riskLevel, value: <SeverityBadge severity="critical" /> },
                  { label: t.execution.assetCriticality, value: <SeverityBadge severity="critical" /> },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <div className="text-sm font-medium text-gray-800 mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="card overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">{t.execution.checklistSection}</h2>
                <span className="badge bg-blue-100 text-blue-700">{completed}/{total} {t.execution.items}</span>
              </div>
              <div className="divide-y divide-gray-100">
                {checklistItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${
                        results[item.id] === 'pass' ? 'bg-green-100' :
                        results[item.id] === 'fail' ? 'bg-red-100' :
                        results[item.id] === 'attention' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        {results[item.id] === 'pass' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                         results[item.id] === 'fail' ? <XCircle className="w-4 h-4 text-red-600" /> :
                         results[item.id] === 'attention' ? <AlertTriangle className="w-4 h-4 text-yellow-600" /> :
                         <MinusCircle className="w-4 h-4 text-gray-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{item.item}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {resultBtn(item.id, 'pass', <CheckCircle className="w-3.5 h-3.5" />, t.execution.pass, 'bg-green-100 text-green-700')}
                          {resultBtn(item.id, 'attention', <AlertTriangle className="w-3.5 h-3.5" />, t.execution.attention, 'bg-yellow-100 text-yellow-700')}
                          {resultBtn(item.id, 'fail', <XCircle className="w-3.5 h-3.5" />, t.execution.fail, 'bg-red-100 text-red-700')}
                          <button
                            onClick={() => setExpandedNote(expandedNote === item.id ? null : item.id)}
                            className="text-xs text-gray-400 hover:text-blue-600 ml-1 underline"
                          >
                            {expandedNote === item.id ? t.execution.hideNotes : t.execution.notes}
                          </button>
                        </div>
                        {expandedNote === item.id && (
                          <textarea
                            className="mt-2 w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={3}
                            placeholder={t.execution.notesPlaceholder}
                            value={notes[item.id] ?? ''}
                            onChange={e => setNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                          />
                        )}
                      </div>
                      <button className="flex-shrink-0 p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Evidence */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">{t.execution.photoEvidence}</h2>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer group">
                <Camera className="w-10 h-10 text-gray-300 group-hover:text-blue-400 mx-auto mb-2 transition-colors" />
                <p className="text-sm text-gray-500">{t.execution.tapToUpload}</p>
                <p className="text-xs text-gray-400 mt-1">{t.execution.photoHint}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative group cursor-pointer overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <X className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Findings */}
            <div className="card overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">{t.execution.findingsSection}</h2>
                <button
                  onClick={() => setShowAddFinding(true)}
                  className="btn-primary flex items-center gap-2 text-xs py-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> {t.execution.addFinding}
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {taskFindings.map(f => (
                  <div key={f.id} className="p-4 flex items-start gap-3">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      f.severity === 'critical' ? 'text-red-600' :
                      f.severity === 'high' ? 'text-orange-600' :
                      f.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-gray-900">{f.title}</p>
                        <SeverityBadge severity={f.severity} />
                        <span className="badge bg-gray-100 text-gray-600 capitalize">{categoryLabel(f.category)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{f.description}</p>
                    </div>
                    <Link to={`/findings/${f.id}`} className="text-xs text-blue-600 hover:text-blue-700 flex-shrink-0">{t.viewDetails}</Link>
                  </div>
                ))}
                {taskFindings.length === 0 && (
                  <div className="p-8 text-center text-sm text-gray-400">{t.empty.noFindings}</div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="w-64 flex-shrink-0 space-y-4 sticky top-36 self-start">
            {/* Inspection Summary */}
            <div className="card p-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">{t.execution.inspectionSummary}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.execution.passCount}</span>
                  <span className="font-semibold text-green-600">{Object.values(results).filter(r => r === 'pass').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.execution.attention}</span>
                  <span className="font-semibold text-yellow-600">{Object.values(results).filter(r => r === 'attention').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.execution.failCount}</span>
                  <span className="font-semibold text-red-600">{Object.values(results).filter(r => r === 'fail').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.execution.notInspected}</span>
                  <span className="font-semibold text-gray-400">{total - completed}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 font-medium">{t.findings}</span>
                  <span className="font-bold text-orange-600">{taskFindings.length}</span>
                </div>
              </div>
            </div>

            {/* Findings by severity */}
            <div className="card p-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">{t.execution.findingsSummary}</h3>
              {(['critical', 'high', 'medium', 'low'] as const).map(sev => {
                const count = taskFindings.filter(f => f.severity === sev).length
                return (
                  <div key={sev} className="flex items-center justify-between text-sm mb-2">
                    <SeverityBadge severity={sev} />
                    <span className="font-semibold text-gray-700">{count}</span>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="card p-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">{t.execution.quickActions}</h3>
              <div className="space-y-2">
                <button onClick={() => setShowAddFinding(true)} className="w-full btn-secondary text-xs py-2 flex items-center justify-center gap-2">
                  <Plus className="w-3.5 h-3.5" /> {t.execution.addFinding}
                </button>
                <button className="w-full btn-secondary text-xs py-2 flex items-center justify-center gap-2">
                  <Camera className="w-3.5 h-3.5" /> {t.execution.uploadPhoto}
                </button>
                <button className="w-full btn-secondary text-xs py-2 flex items-center justify-center gap-2">
                  <Save className="w-3.5 h-3.5" /> {t.saveDraft}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Finding Modal */}
      {showAddFinding && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">{t.execution.addFinding}</h3>
              <button onClick={() => setShowAddFinding(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">{t.execution.findingTitle}</label>
                <input
                  type="text"
                  value={newFinding.title}
                  onChange={e => setNewFinding(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t.execution.findingTitlePlaceholder}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">{t.execution.findingCategory}</label>
                  <select
                    value={newFinding.category}
                    onChange={e => setNewFinding(p => ({ ...p, category: e.target.value as typeof categories[number] }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{categoryLabel(c)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">{t.execution.severityLabel}</label>
                  <div className="flex items-center gap-1.5">
                    {severities.map(sev => (
                      <button
                        key={sev}
                        onClick={() => setNewFinding(p => ({ ...p, severity: sev }))}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          newFinding.severity === sev
                            ? sev === 'critical' ? 'bg-red-100 text-red-700 border-red-300' :
                              sev === 'high' ? 'bg-orange-100 text-orange-700 border-orange-300' :
                              sev === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                              'bg-green-100 text-green-700 border-green-300'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {(t.severity as Record<string, string>)[sev]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">{t.execution.probableCause}</label>
                <input
                  type="text"
                  value={newFinding.cause}
                  onChange={e => setNewFinding(p => ({ ...p, cause: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t.execution.causePlaceholder}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">{t.execution.recommendedAction}</label>
                <textarea
                  rows={3}
                  value={newFinding.action}
                  onChange={e => setNewFinding(p => ({ ...p, action: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder={t.execution.actionPlaceholder}
                />
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors">
                <Camera className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                <p className="text-xs text-gray-400">{t.execution.tapToUpload}</p>
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
