import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Brain, AlertTriangle, TrendingUp, Wrench, FileText, Settings, Clock } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useI18n } from '../i18n'
import { lf, teamKey } from '../utils/localize'
import StatusBadge from '../components/common/StatusBadge'
import SeverityBadge from '../components/common/SeverityBadge'
import { assets, components, findings, inspectionTasks, riskScoreTrend } from '../data/mockData'

const ASSET = assets.find(a => a.id === 'A003')!

const assetFindings = findings.filter(f => f.assetId === 'A003')
const assetComponents = components.filter(c => c.assetId === 'A003')

type Tab = 'overview' | 'components' | 'history' | 'findings' | 'documents'

export default function AssetDetail() {
  const { t, locale } = useI18n()
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const inspectionHistory = [
    { id: 'IT-2024-0312', date: '2024-03-10', typeKey: 'followUp', inspector: t.reportContent.inspectorWangMeiLing, status: 'overdue', findings: 3 },
    { id: 'IT-2024-0302', date: '2024-03-01', typeKey: 'routine', inspector: t.reportContent.inspectorWangMeiLing, status: 'submitted', findings: 3 },
    { id: 'IT-2023-1105', date: '2023-12-01', typeKey: 'routine', inspector: t.reportContent.inspectorChenWeiMing, status: 'closed', findings: 1 },
    { id: 'IT-2023-0904', date: '2023-09-15', typeKey: 'preventive', inspector: t.reportContent.inspectorWangMeiLing, status: 'closed', findings: 2 },
    { id: 'IT-2023-0603', date: '2023-06-10', typeKey: 'annual', inspector: t.reportContent.inspectorLinJiaHao, status: 'closed', findings: 0 },
  ]

  const assetTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      'Pump': t.assetTypes.pump, 'Compressor': t.assetTypes.compressor,
      'Conveyor': t.assetTypes.conveyor, 'Electrical': t.assetTypes.electrical,
      'Tank': t.assetTypes.tank, 'Boiler': t.assetTypes.boiler,
      'Cooling Tower': t.assetTypes.coolingTower,
    }
    return map[type] ?? type
  }

  const conditionStyle = (c: string) => {
    if (c === 'Poor') return 'text-red-600 bg-red-50'
    if (c === 'Fair') return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  const conditionLabel = (c: string) => {
    if (c === 'Poor') return t.condition.poor
    if (c === 'Fair') return t.condition.fair
    return t.condition.good
  }

  const riskColor = (score: number) =>
    score >= 80 ? 'text-red-600' : score >= 60 ? 'text-orange-600' : score >= 40 ? 'text-yellow-600' : 'text-green-600'

  const typeLabel = (key: string) => {
    const map: Record<string, string> = {
      routine: t.tasks.types.routine,
      safety: t.tasks.types.safety,
      preventive: t.tasks.types.preventive,
      followUp: t.tasks.types.followUp,
      emergency: t.tasks.types.emergency,
      annual: t.tasks.types.annual,
    }
    return map[key] ?? key
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: t.assetDetail.tabs.overview, icon: <Settings className="w-4 h-4" /> },
    { key: 'components', label: t.assetDetail.tabs.components, icon: <Wrench className="w-4 h-4" /> },
    { key: 'history', label: t.assetDetail.tabs.inspectionHistory, icon: <Clock className="w-4 h-4" /> },
    { key: 'findings', label: t.assetDetail.tabs.findings, icon: <AlertTriangle className="w-4 h-4" /> },
    { key: 'documents', label: t.assetDetail.tabs.documents, icon: <FileText className="w-4 h-4" /> },
  ]

  const aiInsights = [
    { type: 'critical', text: t.assetHealthAI.insight1 },
    { type: 'high', text: t.assetHealthAI.insight2 },
    { type: 'medium', text: t.assetHealthAI.insight3 },
    { type: 'info', text: t.assetHealthAI.insight4 },
  ]

  return (
    <div className="p-6 space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link to="/assets" className="hover:text-blue-600 transition-colors">{t.plants}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="hover:text-blue-600 cursor-pointer">{t.reportContent.taoyuanPlant}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="hover:text-blue-600 cursor-pointer">{t.reportContent.zoneUtilityRoom}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium">CP-104</span>
      </nav>

      {/* Asset Header Card */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Wrench className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{lf(locale, ASSET as Record<string, unknown>, 'name')}</h1>
                <p className="text-gray-500 mt-0.5">{t.assetDetail.idLabel}: <span className="font-mono text-gray-700">{ASSET.id}</span> · {assetTypeLabel(ASSET.type)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={ASSET.status.toLowerCase()} />
                  <span className={`badge ${ASSET.criticality === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                    {t.criticality}: {(t.severity as Record<string, string>)[ASSET.criticality.toLowerCase()] ?? ASSET.criticality}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500">{t.plant} / {t.zone}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{t.reportContent.taoyuanPlant} / {t.reportContent.zoneUtilityRoom}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{t.assetDetail.manufacturer}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{ASSET.manufacturer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{t.assetDetail.installDate}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{ASSET.installDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{t.owner}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{(t.teams as Record<string, string>)[teamKey(ASSET.owner)] ?? ASSET.owner}</p>
              </div>
            </div>
          </div>

          {/* Risk Score Gauge */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 min-w-[160px]">
            <p className="text-xs text-gray-500 mb-2">{t.riskScore}</p>
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                <circle
                  cx="50" cy="50" r="40"
                  stroke={ASSET.riskScore >= 80 ? '#dc2626' : ASSET.riskScore >= 60 ? '#ea580c' : '#d97706'}
                  strokeWidth="10" fill="none"
                  strokeDasharray={`${(ASSET.riskScore / 100) * 251.2} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${riskColor(ASSET.riskScore)}`}>{ASSET.riskScore}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{t.assetDetail.outOf100}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs text-red-600 font-medium">{t.assetDetail.trendUp30}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 space-y-4">
            {/* Latest Inspection Summary */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                {t.assetDetail.latestInspectionSummary}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">{t.assetDetail.date}</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{ASSET.lastInspection}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t.inspector}</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{t.reportContent.inspectorWangMeiLing}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t.type}</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{t.tasks.types.routine}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t.assetDetail.findingsTally}</p>
                  <p className="text-sm font-bold text-red-600 mt-0.5">3 (1 {t.severity.critical})</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t.assetDetail.statusHeader}</p>
                  <StatusBadge status="submitted" className="mt-0.5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t.assetDetail.nextInspection}</p>
                  <p className="text-sm font-medium text-orange-600 mt-0.5">{ASSET.nextInspection}</p>
                </div>
              </div>
            </div>

            {/* Risk Score Trend Chart */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{t.assetDetail.riskTrend}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={riskScoreTrend.map(d => ({ ...d, dateLabel: lf(locale, d as Record<string, unknown>, 'date') }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="dateLabel" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    formatter={(value) => [value, t.riskScore]}
                  />
                  <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2.5} dot={{ fill: '#dc2626', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Health Summary */}
          <div className="card p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{t.assetDetail.aiHealthSummary}</h3>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, i) => (
                <div key={i} className={`p-3 rounded-lg text-xs leading-snug ${
                  insight.type === 'critical' ? 'bg-red-50 text-red-800 border border-red-100' :
                  insight.type === 'high' ? 'bg-orange-50 text-orange-800 border border-orange-100' :
                  insight.type === 'medium' ? 'bg-yellow-50 text-yellow-800 border border-yellow-100' :
                  'bg-blue-50 text-blue-800 border border-blue-100'
                }`}>
                  {insight.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'components' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">{t.assetDetail.componentStatus}</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                <th className="text-left px-5 py-3 font-medium">{t.assetDetail.componentName}</th>
                <th className="text-left px-3 py-3 font-medium">{t.assetDetail.componentType}</th>
                <th className="text-left px-3 py-3 font-medium">{t.assetDetail.condition}</th>
                <th className="text-left px-3 py-3 font-medium">{t.assetDetail.lastChecked}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assetComponents.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-800">{lf(locale, c as Record<string, unknown>, 'name')}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{lf(locale, c as Record<string, unknown>, 'type')}</td>
                  <td className="px-3 py-3.5">
                    <span className={`badge ${conditionStyle(c.condition)}`}>{conditionLabel(c.condition)}</span>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{c.lastChecked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">{t.assetDetail.tabs.inspectionHistory}</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                <th className="text-left px-5 py-3 font-medium">{t.tasks.taskId}</th>
                <th className="text-left px-3 py-3 font-medium">{t.assetDetail.dateHeader}</th>
                <th className="text-left px-3 py-3 font-medium">{t.assetDetail.typeHeader}</th>
                <th className="text-left px-3 py-3 font-medium">{t.inspector}</th>
                <th className="text-left px-3 py-3 font-medium">{t.findings}</th>
                <th className="text-left px-3 py-3 font-medium">{t.assetDetail.statusHeader}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inspectionHistory.map(h => (
                <tr key={h.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5">
                    <Link to={`/tasks/${h.id}/execute`} className="text-sm font-mono text-blue-600 hover:text-blue-700">{h.id}</Link>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{h.date}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{typeLabel(h.typeKey)}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{h.inspector}</td>
                  <td className="px-3 py-3.5">
                    <span className={`text-sm font-medium ${h.findings > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      {h.findings} {t.findings.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-3 py-3.5"><StatusBadge status={h.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'findings' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">{t.findings} — {lf(locale, ASSET as Record<string, unknown>, 'name')}</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                <th className="text-left px-5 py-3 font-medium">{t.assetDetail.idHeader}</th>
                <th className="text-left px-3 py-3 font-medium">{t.assetDetail.titleHeader}</th>
                <th className="text-left px-3 py-3 font-medium">{t.assetDetail.categoryHeader}</th>
                <th className="text-left px-3 py-3 font-medium">{t.assetDetail.severityHeader}</th>
                <th className="text-left px-3 py-3 font-medium">{t.discoveryDate}</th>
                <th className="text-left px-3 py-3 font-medium">{t.assetDetail.statusHeader}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assetFindings.map(f => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5">
                    <Link to={`/findings/${f.id}`} className="text-sm font-mono text-blue-600 hover:text-blue-700">{f.id}</Link>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-800 max-w-xs">
                    <div className="truncate">{lf(locale, f as Record<string, unknown>, 'title')}</div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">
                    {(t.findingCategory as Record<string, string>)[f.category] ?? f.category}
                  </td>
                  <td className="px-3 py-3.5"><SeverityBadge severity={f.severity} /></td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{f.discoveryDate}</td>
                  <td className="px-3 py-3.5"><StatusBadge status={f.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="card p-10 flex flex-col items-center justify-center text-center">
          <FileText className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">{t.assetDetail.noDocuments}</p>
          <button className="btn-secondary mt-4">{t.assetDetail.uploadDocument}</button>
        </div>
      )}
    </div>
  )
}
