import { Link } from 'react-router-dom'
import {
  ClipboardList, AlertTriangle, Factory, Clock,
  Brain, Info, ArrowRight, TrendingUp, TrendingDown
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { useI18n } from '../i18n'
import { lf } from '../utils/localize'
import KPICard from '../components/common/KPICard'
import StatusBadge from '../components/common/StatusBadge'
import SeverityBadge from '../components/common/SeverityBadge'
import {
  kpiData, inspectionTrendData, findingsBySeverity,
  inspectionTasks, assets, zones, inspectors
} from '../data/mockData'

export default function Dashboard() {
  const { t, locale } = useI18n()
  const recentTasks = inspectionTasks.slice(0, 5)
  const topRiskAssets = [...assets].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5)

  const assetTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      'Pump': t.assetTypes.pump, 'Compressor': t.assetTypes.compressor,
      'Conveyor': t.assetTypes.conveyor, 'Electrical': t.assetTypes.electrical,
      'Tank': t.assetTypes.tank, 'Boiler': t.assetTypes.boiler,
      'Cooling Tower': t.assetTypes.coolingTower,
    }
    return map[type] ?? type
  }

  const aiInsights = [
    { id: 1, severity: 'critical' as const, text: t.dashboardAI.insight1, confidence: 94, border: 'border-l-red-500', bg: 'bg-red-50' },
    { id: 2, severity: 'critical' as const, text: t.dashboardAI.insight2, confidence: 98, border: 'border-l-red-500', bg: 'bg-red-50' },
    { id: 3, severity: 'high' as const, text: t.dashboardAI.insight3, confidence: 79, border: 'border-l-orange-500', bg: 'bg-orange-50' },
    { id: 4, severity: 'high' as const, text: t.dashboardAI.insight4, confidence: 82, border: 'border-l-orange-500', bg: 'bg-orange-50' },
  ]

  // Localize severity labels in chart data
  const localizedFindingsBySeverity = findingsBySeverity.map(f => ({
    ...f,
    severityLabel: (t.severity as Record<string, string>)[f.severity.toLowerCase()] ?? f.severity,
  }))

  // Localize chart month labels
  const localizedTrendData = inspectionTrendData.map(d => ({
    ...d,
    monthLabel: lf(locale, d as Record<string, unknown>, 'month'),
  }))

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          label={t.kpi.totalInspectionsWeek}
          value={kpiData.totalInspectionsThisWeek}
          icon={<ClipboardList className="w-5 h-5 text-blue-600" />}
          iconBg="bg-blue-100"
          trend={kpiData.trend.inspections}
          trendLabel={t.dashboard.vsLastWeek}
        />
        <KPICard
          label={t.kpi.openFindings}
          value={kpiData.openFindings}
          icon={<AlertTriangle className="w-5 h-5 text-orange-600" />}
          iconBg="bg-orange-100"
          trend={kpiData.trend.openFindings}
          trendLabel={t.dashboard.vsLastWeek}
          valueColor="text-orange-600"
        />
        <KPICard
          label={t.kpi.highRiskAssets}
          value={kpiData.highRiskAssets}
          icon={<Factory className="w-5 h-5 text-red-600" />}
          iconBg="bg-red-100"
          trend={kpiData.trend.highRiskAssets}
          trendLabel={t.dashboard.vsLastWeek}
          valueColor="text-red-600"
        />
        <KPICard
          label={t.kpi.overdueActions}
          value={kpiData.overdueActions}
          icon={<Clock className="w-5 h-5 text-yellow-600" />}
          iconBg="bg-yellow-100"
          trend={kpiData.trend.overdueActions}
          trendLabel={t.dashboard.vsLastWeek}
          valueColor="text-yellow-700"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Inspection Trend */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">{t.dashboard.inspectionTrend}</h2>
              <p className="text-xs text-gray-500">{t.dashboard.last6Months}</p>
            </div>
            <span className="badge bg-blue-100 text-blue-700">{t.dashboard.thisWeek}: {kpiData.totalInspectionsThisWeek}</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={localizedTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="monthLabel" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={(value) => [value, t.charts.count]}
              />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Findings by Severity */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">{t.dashboard.findingsBySeverity}</h2>
              <p className="text-xs text-gray-500">{t.kpi.openFindings}: {kpiData.openFindings}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={localizedFindingsBySeverity} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="severityLabel" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={(value) => [value, t.charts.count]}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {localizedFindingsBySeverity.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-2 flex-wrap">
            {localizedFindingsBySeverity.map(f => (
              <div key={f.severity} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.color }}></div>
                <span className="text-xs text-gray-600">{f.severityLabel} ({f.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Inspections + High-Risk Assets */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Inspections Table */}
        <div className="card xl:col-span-2">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">{t.dashboard.recentInspections}</h2>
            <Link to="/tasks" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              {t.dashboard.viewAllTasks} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-medium">{t.tasks.taskId}</th>
                  <th className="text-left px-3 py-3 font-medium">{t.asset}</th>
                  <th className="text-left px-3 py-3 font-medium">{t.zone}</th>
                  <th className="text-left px-3 py-3 font-medium">{t.inspector}</th>
                  <th className="text-left px-3 py-3 font-medium">{t.tasks.scheduledDate}</th>
                  <th className="text-left px-3 py-3 font-medium">{t.tasks.statusHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentTasks.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <Link to={`/tasks/${task.id}/execute`} className="text-sm font-mono text-blue-600 hover:text-blue-700 font-medium">
                        {task.id}
                      </Link>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700 max-w-[160px] truncate">{lf(locale, assets.find(a => a.id === task.assetId) as Record<string, unknown> ?? { name: task.asset }, 'name')}</td>
                    <td className="px-3 py-3 text-sm text-gray-500">{lf(locale, zones.find(z => z.id === task.zoneId) as Record<string, unknown> ?? { name: task.zone }, 'name')}</td>
                    <td className="px-3 py-3 text-sm text-gray-500">{lf(locale, inspectors.find(i => i.name === task.assignedTo) as Record<string, unknown> ?? { name: task.assignedTo }, 'name')}</td>
                    <td className="px-3 py-3 text-sm text-gray-500">{task.dueDate}</td>
                    <td className="px-3 py-3"><StatusBadge status={task.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* High-Risk Assets */}
        <div className="card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">{t.dashboard.highRiskAssets}</h2>
            <Link to="/assets" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              {t.viewAll} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {topRiskAssets.map(asset => (
              <Link to={`/assets/${asset.id}`} key={asset.id} className="block group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate max-w-[160px]">
                    {lf(locale, asset as Record<string, unknown>, 'name')}
                  </span>
                  <span className={`text-sm font-bold ${
                    asset.riskScore >= 80 ? 'text-red-600' :
                    asset.riskScore >= 60 ? 'text-orange-600' :
                    asset.riskScore >= 40 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {asset.riskScore}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      asset.riskScore >= 80 ? 'bg-red-500' :
                      asset.riskScore >= 60 ? 'bg-orange-500' :
                      asset.riskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${asset.riskScore}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{assetTypeLabel(asset.type)} · {t.criticality}: {(t.severity as Record<string, string>)[asset.criticality.toLowerCase()] ?? asset.criticality}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="card">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">{t.dashboard.aiInsightsPanel}</h2>
            <p className="text-xs text-gray-500">{t.dashboard.aiInsightSubtitle}</p>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
          {aiInsights.map(insight => (
            <div
              key={insight.id}
              className={`border-l-4 ${insight.border} ${insight.bg} rounded-r-lg p-4`}
            >
              <div className="flex items-start gap-3">
                <Info className={`w-4 h-4 mt-0.5 flex-shrink-0 ${insight.severity === 'critical' ? 'text-red-600' : 'text-orange-600'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-snug">{insight.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`badge ${insight.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                      {t.aiInsights.confidence}: {insight.confidence}%
                    </span>
                    <Link to="/ai-insights" className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
                      {t.viewDetails} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
