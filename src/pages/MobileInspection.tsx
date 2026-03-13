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

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-sm">
        {/* Mobile frame hint */}
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            {t.mobile.mobileView}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Mobile Top Bar */}
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
            <Link to="/tasks" className="text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="text-center">
              <p className="text-white text-sm font-semibold">IT-2024-0312</p>
              <p className="text-slate-400 text-xs">CP-104 · {t.tasks.types.followUp}</p>
            </div>
            <button onClick={() => setIsOnline(!isOnline)} className="flex items-center gap-1">
              {isOnline ? (
                <div className="flex items-center gap-1">
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">{t.mobile.syncStatus}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <WifiOff className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-orange-400">{t.mobile.offline}</span>
                </div>
              )}
            </button>
          </div>

          {/* Offline Banner */}
          {!isOnline && (
            <div className="bg-orange-50 border-b border-orange-200 px-4 py-2">
              <p className="text-xs text-orange-700 text-center">{t.mobile.offlineNotice}</p>
            </div>
          )}

          {/* Task Summary Card */}
          <div className="m-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">{t.mobile.taskSummary}</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{t.reportContent.coolingPumpCP104}</p>
                <p className="text-xs text-gray-500">{t.reportContent.zoneUtilityRoom} · {t.reportContent.taoyuanPlant}</p>
              </div>
              <span className="badge bg-red-100 text-red-700 text-xs">{t.severity.critical}</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-gray-500">{t.mobile.due} <span className="text-red-600 font-medium">2024-03-12</span></span>
              <span className="text-gray-500">{t.mobile.inspectorShort} {t.reportContent.inspectorWangShort}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-gray-600 font-medium">{t.mobile.progressLabel}</span>
              <span className="font-bold text-gray-900">{completed}/{total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{progress}% {t.execution.completedOf} {total} {t.execution.items}</p>
          </div>

          {/* Checklist */}
          <div className="px-3 pb-3 space-y-2 max-h-[400px] overflow-y-auto">
            <p className="text-xs font-semibold text-gray-700 px-1 uppercase tracking-wide">{t.execution.checklistSection}</p>
            {checklistItems.slice(0, 6).map(item => (
              <div
                key={item.id}
                className={`rounded-xl border p-3 transition-colors ${
                  results[item.id] === 'pass' ? 'bg-green-50 border-green-200' :
                  results[item.id] === 'fail' ? 'bg-red-50 border-red-200' :
                  results[item.id] === 'attention' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <p className="text-sm font-medium text-gray-900 mb-2 leading-snug">{lf(locale, item as Record<string, unknown>, 'item')}</p>
                {/* Large touch targets */}
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setResult(item.id, 'pass')}
                    className={`flex items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
                      results[item.id] === 'pass'
                        ? 'bg-green-500 text-white border-transparent shadow'
                        : 'bg-white text-green-700 border-green-200 hover:bg-green-50'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {t.execution.pass}
                  </button>
                  <button
                    onClick={() => setResult(item.id, 'attention')}
                    className={`flex items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
                      results[item.id] === 'attention'
                        ? 'bg-yellow-500 text-white border-transparent shadow'
                        : 'bg-white text-yellow-700 border-yellow-200 hover:bg-yellow-50'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {t.mobile.attention}
                  </button>
                  <button
                    onClick={() => setResult(item.id, 'fail')}
                    className={`flex items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
                      results[item.id] === 'fail'
                        ? 'bg-red-500 text-white border-transparent shadow'
                        : 'bg-white text-red-700 border-red-200 hover:bg-red-50'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    {t.execution.fail}
                  </button>
                </div>
                <button
                  onClick={() => setExpandedNote(expandedNote === item.id ? null : item.id)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 mt-2 transition-colors"
                >
                  <ChevronDown className={`w-3 h-3 transition-transform ${expandedNote === item.id ? 'rotate-180' : ''}`} />
                  {expandedNote === item.id ? t.mobile.hideNotes : t.mobile.expandNotes}
                </button>
                {expandedNote === item.id && (
                  <textarea
                    className="mt-2 w-full text-xs border border-gray-200 rounded-lg p-2 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={2}
                    placeholder={t.mobile.notesPlaceholder}
                    value={notes[item.id] ?? ''}
                    onChange={e => setNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                  />
                )}
              </div>
            ))}
            {checklistItems.length > 6 && (
              <p className="text-xs text-center text-gray-400 py-1">+{checklistItems.length - 6} {t.mobile.moreItems}</p>
            )}
          </div>

          {/* Bottom Action Area */}
          <div className="border-t border-gray-100 p-3 space-y-2">
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors active:scale-95">
                <Camera className="w-4 h-4" />
                {t.mobile.addPhoto}
              </button>
              <button
                onClick={() => setShowFindingSheet(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-700 text-sm font-medium transition-colors active:scale-95"
              >
                <Plus className="w-4 h-4" />
                {t.mobile.addFinding}
              </button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors active:scale-95">
              <Send className="w-4 h-4" />
              {t.mobile.submitInspection}
            </button>
          </div>
        </div>

        {/* Quick Finding Sheet (simulated bottom sheet) */}
        {showFindingSheet && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center sm:items-center sm:px-4">
            <div className="w-full max-w-sm bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-5">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden"></div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">{t.mobile.addFinding}</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t.mobile.findingTitlePlaceholder}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  {(['critical', 'high', 'medium', 'low'] as const).map(sev => (
                    <button
                      key={sev}
                      className={`py-2.5 rounded-xl text-sm font-medium border ${
                        sev === 'critical' ? 'border-red-200 text-red-700 bg-red-50 hover:bg-red-100' :
                        sev === 'high' ? 'border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100' :
                        sev === 'medium' ? 'border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100' :
                        'border-green-200 text-green-700 bg-green-50 hover:bg-green-100'
                      }`}
                    >
                      {(t.severity as Record<string, string>)[sev]}
                    </button>
                  ))}
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center gap-1 cursor-pointer hover:border-blue-400 transition-colors">
                  <Camera className="w-6 h-6 text-gray-300" />
                  <p className="text-xs text-gray-400">{t.mobile.tapToAddPhoto}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setShowFindingSheet(false)} className="flex-1 btn-secondary py-2.5 rounded-xl">{t.cancel}</button>
                <button onClick={() => setShowFindingSheet(false)} className="flex-1 btn-primary py-2.5 rounded-xl">{t.save}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
