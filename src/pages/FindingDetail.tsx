import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Brain, Camera, Send, AlertTriangle, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n'
import StatusBadge from '../components/common/StatusBadge'
import SeverityBadge from '../components/common/SeverityBadge'
import { findings } from '../data/mockData'

const FINDING = findings[0]

const statusOptions = ['open', 'pending', 'inProgress', 'resolved', 'closed']

export default function FindingDetail() {
  const { t } = useI18n()
  const [comment, setComment] = useState('')
  const [selectedStatus, setSelectedStatus] = useState(FINDING.status)

  const severityColor = (s: string) =>
    s === 'critical' ? 'text-red-600' : s === 'high' ? 'text-orange-600' : s === 'medium' ? 'text-yellow-600' : 'text-green-600'

  const categoryLabel = (cat: string) => (t.findingCategory as Record<string, string>)[cat] ?? cat

  const activities = [
    { id: 1, user: 'Wang Mei-Ling', action: 'findingCreated', time: '2024-03-10 09:32', detail: '', avatar: 'WM' },
    { id: 2, user: 'Wang Mei-Ling', action: 'photoAdded', time: '2024-03-10 09:45', detail: t.notif.n1, avatar: 'WM' },
    { id: 3, user: 'Chen Wei-Ming', action: 'commented', time: '2024-03-10 11:20', detail: t.timeline.activityComment1, avatar: 'CW' },
    { id: 4, user: 'Liu Kuo-Cheng', action: 'statusChanged', time: '2024-03-11 08:00', detail: t.timeline.activityStatus1, avatar: 'LK' },
  ]

  const steps = [t.findingAI.step1, t.findingAI.step2, t.findingAI.step3, t.findingAI.step4]

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
        <Link to="/findings" className="hover:text-blue-600">{t.findings}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium">{FINDING.id}</span>
      </nav>

      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className={`w-5 h-5 ${severityColor(FINDING.severity)}`} />
            <h1 className="text-xl font-bold text-gray-900">{FINDING.title}</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500 font-mono">{FINDING.id}</span>
            <span className="text-gray-300">·</span>
            <SeverityBadge severity={FINDING.severity} />
            <StatusBadge status={FINDING.status} />
            <span className="badge bg-gray-100 text-gray-600">{categoryLabel(FINDING.category)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-5">
          {/* Metadata Card */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t.findingDetail.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: t.findingDetail.findingId, value: FINDING.id },
                { label: t.asset, value: FINDING.asset },
                { label: t.component, value: FINDING.component },
                { label: t.plant, value: FINDING.plant },
                { label: t.zone, value: FINDING.zone },
                { label: t.inspector, value: FINDING.inspector },
                { label: t.discoveryDate, value: FINDING.discoveryDate },
                { label: t.dueDate, value: FINDING.dueDate },
                { label: t.owner, value: FINDING.owner },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="card p-5 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{t.findingDetail.description}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{FINDING.description}</p>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{t.findingDetail.impact}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{FINDING.impact}</p>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{t.findingDetail.riskDescription}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{FINDING.riskDescription}</p>
            </div>
          </div>

          {/* Probable Cause & Recommended Action */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{t.execution.probableCause}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{FINDING.probableCause}</p>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{t.execution.recommendedAction}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{FINDING.recommendedAction}</p>
            </div>
          </div>

          {/* Photo Evidence */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t.findingDetail.photoEvidence}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FINDING.photos.map((_, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{t.findingDetail.photoCaption} {i + 1}</span>
                  </div>
                </div>
              ))}
              <div className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors group">
                <div className="flex flex-col items-center gap-1">
                  <Camera className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
                  <span className="text-xs text-gray-400">{t.add}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t.findingDetail.activityTimeline}</h3>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0">
                      {activity.avatar}
                    </div>
                    {i < activities.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-2"></div>}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-900">{activity.user}</span>
                      <span className="text-xs text-gray-500">{(t.timeline as Record<string, string>)[activity.action]}</span>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                    {activity.detail && (
                      <p className="text-sm text-gray-600 mt-1 bg-gray-50 rounded-lg px-3 py-2">{activity.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Add Comment */}
            <div className="mt-4 flex gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                CW
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder={t.findingDetail.addComment + '...'}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="btn-primary p-2">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* AI Summary */}
          <div className="card p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{t.findingDetail.aiAnalysis}</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                <p
                  className="text-xs text-red-800 leading-snug"
                  dangerouslySetInnerHTML={{ __html: t.findingAI.analysis }}
                />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700 mb-1.5">{t.findingDetail.confidence}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-red-500" style={{ width: '94%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-red-600">94%</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">{t.findingDetail.relatedFindings}</p>
                <div className="space-y-1.5">
                  {[
                    { id: 'FD-2024-0088', text: t.findingAI.relatedFinding1 },
                    { id: 'FD-2024-0081', text: t.findingAI.relatedFinding2 },
                  ].map(rf => (
                    <Link key={rf.id} to={`/findings/${rf.id}`} className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg">
                      <ArrowRight className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{rf.id}: {rf.text}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">{t.findingDetail.recommendedSteps}</p>
                <ol className="list-decimal list-inside space-y-1.5">
                  {steps.map((step, i) => (
                    <li key={i} className="text-xs text-gray-700 leading-snug">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Related Asset */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{t.findingDetail.relatedAsset}</h3>
            <Link to="/assets/A003" className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">{FINDING.asset}</p>
              <p className="text-xs text-gray-500 mt-0.5">{FINDING.zone} · {FINDING.plant}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-red-500" style={{ width: '88%' }}></div>
                </div>
                <span className="text-xs font-bold text-red-600">88</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{t.findingDetail.riskScoreLabel}</p>
            </Link>
          </div>

          {/* Status Update */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{t.findingDetail.statusUpdate}</h3>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mb-3"
            >
              {statusOptions.map(s => (
                <option key={s} value={s}>{(t.status as Record<string, string>)[s]}</option>
              ))}
            </select>
            <button className="w-full btn-primary">{t.save}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
