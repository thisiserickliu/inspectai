import { Link } from 'react-router-dom'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts'
import { useI18n } from '../i18n'
import { lf } from '../utils/localize'
import KPICard from '../components/common/KPICard'
import StatusBadge from '../components/common/StatusBadge'
import {
  kpiData, inspectionTrendData, findingsBySeverity,
  inspectionTasks, assets, zones, inspectors,
} from '../data/mockData'
import { Download, Plus } from 'lucide-react'

export default function Dashboard() {
  const { t, locale } = useI18n()
  const recentTasks   = inspectionTasks.slice(0, 5)
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
    { id: 1, sev: 'CRIT.', text: t.dashboardAI.insight1, conf: 94, color: 'var(--flag)' },
    { id: 2, sev: 'CRIT.', text: t.dashboardAI.insight2, conf: 98, color: 'var(--flag)' },
    { id: 3, sev: 'HIGH',  text: t.dashboardAI.insight3, conf: 79, color: 'var(--rust)' },
    { id: 4, sev: 'HIGH',  text: t.dashboardAI.insight4, conf: 82, color: 'var(--rust)' },
  ]

  const localizedFindingsBySeverity = findingsBySeverity.map(f => ({
    ...f,
    severityLabel: ((t.severity as Record<string, string>)[f.severity.toLowerCase()] ?? f.severity).toUpperCase(),
  }))

  const localizedTrendData = inspectionTrendData.map(d => ({
    ...d,
    monthLabel: lf(locale, d as Record<string, unknown>, 'month') as string,
  }))

  const tooltipStyle = { background: 'var(--paper)', border: '1px solid var(--ink)', borderRadius: 0, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }
  const axisProps = { axisLine: { stroke: 'var(--rule)' }, tickLine: false, tick: { fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", fill: 'var(--muted)' } }

  return (
    <div style={{ padding: '24px 32px 48px' }}>

      {/* ── Meta strip ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <span className="tag mono" style={{ letterSpacing: '.12em', textTransform: 'uppercase' }}>
            <span className="dot" style={{ background: 'var(--pine)' }} />
            Live Telemetry · 14 sensors
          </span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>
            LAST REFRESH · 00:04 AGO
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary"><Plus size={12} /> New Task</button>
          <button className="btn-primary"><Download size={12} /> Export Brief</button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          idx="01" label={t.kpi.totalInspectionsWeek}
          value={kpiData.totalInspectionsThisWeek}
          trend={kpiData.trend.inspections} trendLabel={t.dashboard.vsLastWeek}
          suffix="runs"
          sparkBars={[40,30,55,45,60,50,72,65,80,55,70,90]}
        />
        <KPICard
          idx="02" label={t.kpi.openFindings}
          value={kpiData.openFindings}
          trend={kpiData.trend.openFindings} trendLabel={t.dashboard.vsLastWeek}
          suffix="active"
          sparkBars={[30,40,35,50,45,55,60,58,62,65,68,72]}
        />
        <KPICard
          idx="03" label={t.kpi.highRiskAssets}
          value={kpiData.highRiskAssets}
          trend={kpiData.trend.highRiskAssets} trendLabel={t.dashboard.vsLastWeek}
          suffix="units"
          sparkBars={[70,65,60,55,62,58,55,52,50,48,46,44]}
        />
        <KPICard
          idx="04" label={t.kpi.overdueActions}
          value={kpiData.overdueActions}
          trend={kpiData.trend.overdueActions} trendLabel={t.dashboard.vsLastWeek}
          suffix="items"
          sparkBars={[20,25,30,28,35,38,42,45,48,50,55,60]}
        />
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-4">

        {/* Inspection Trend — 3 cols */}
        <div className="card xl:col-span-3">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--rule)' }}>
            <div className="flex items-center gap-4">
              <span className="mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--muted)' }}>FIG.01</span>
              <div>
                <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                  {t.dashboard.inspectionTrend}
                </h2>
                <p className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '.1em', marginTop: 2, textTransform: 'uppercase' }}>
                  {t.dashboard.last6Months} · monthly count
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mono" style={{ fontSize: 10.5, letterSpacing: '.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              <span><span className="sq" style={{ background: 'var(--ink)', marginRight: 6, display: 'inline-block' }} />Runs</span>
              <span><span className="sq" style={{ background: 'var(--rust)', marginRight: 6, display: 'inline-block' }} />Target 50</span>
            </div>
          </div>
          <div style={{ padding: '14px 8px 6px' }}>
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={localizedTrendData} margin={{ top: 14, right: 24, left: 10, bottom: 6 }}>
                <CartesianGrid stroke="var(--rule-2)" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="monthLabel" {...axisProps} />
                <YAxis {...axisProps} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'var(--ink)', strokeDasharray: '2 2' }} formatter={(v) => [v, t.charts.count]} />
                <ReferenceLine y={50} stroke="var(--rust)" strokeDasharray="3 3" />
                <Line type="linear" dataKey="count" stroke="var(--ink)" strokeWidth={1.25}
                  dot={{ fill: 'var(--paper)', stroke: 'var(--ink)', strokeWidth: 1.25, r: 4 }}
                  activeDot={{ r: 5, fill: 'var(--ink)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Findings by Severity — 2 cols */}
        <div className="card xl:col-span-2">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--rule)' }}>
            <div className="flex items-center gap-4">
              <span className="mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--muted)' }}>FIG.02</span>
              <div>
                <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                  {t.dashboard.findingsBySeverity}
                </h2>
                <p className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '.1em', marginTop: 2, textTransform: 'uppercase' }}>
                  By severity · n=73
                </p>
              </div>
            </div>
            <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '.12em' }}>OPEN {kpiData.openFindings}</span>
          </div>
          <div style={{ padding: '14px 8px 0' }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={localizedFindingsBySeverity} barSize={28} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid stroke="var(--rule-2)" vertical={false} />
                <XAxis dataKey="severityLabel" {...axisProps} />
                <YAxis {...axisProps} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(26,29,31,0.06)' }} formatter={(v) => [v, t.charts.count]} />
                <Bar dataKey="count" radius={0}>
                  {localizedFindingsBySeverity.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 px-5 py-3 mono"
            style={{ fontSize: 10.5, letterSpacing: '.1em', color: 'var(--muted)', textTransform: 'uppercase', borderTop: '1px solid var(--rule)' }}>
            {localizedFindingsBySeverity.map(f => (
              <span key={f.severity} className="flex items-center gap-1.5">
                <span className="sq" style={{ background: f.color }} />
                {f.severityLabel} · {f.count}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Inspections + High-Risk Assets ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

        {/* Recent Inspections */}
        <div className="card xl:col-span-2">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--rule)' }}>
            <div className="flex items-center gap-4">
              <span className="mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--muted)' }}>LOG</span>
              <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                {t.dashboard.recentInspections}
              </h2>
            </div>
            <Link to="/tasks" className="mono flex items-center gap-1"
              style={{ fontSize: 10.5, letterSpacing: '.14em', color: 'var(--ink)', textTransform: 'uppercase', textDecoration: 'none' }}>
              {t.dashboard.viewAllTasks} →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="nordic w-full">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 20px' }}>{t.tasks.taskId}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.asset}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.zone}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.inspector}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.tasks.scheduledDate}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.tasks.statusHeader}</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map(task => (
                  <tr key={task.id}>
                    <td style={{ padding: '14px 20px' }}>
                      <Link to={`/tasks/${task.id}/execute`} className="mono"
                        style={{ fontSize: 12, color: 'var(--ink)', letterSpacing: '.02em', borderBottom: '1px dashed var(--muted)', textDecoration: 'none' }}>
                        {task.id}
                      </Link>
                    </td>
                    <td style={{ padding: '14px 12px', color: 'var(--ink-2)' }}>
                      {lf(locale, assets.find(a => a.id === task.assetId) as Record<string, unknown> ?? { name: task.asset }, 'name') as string}
                    </td>
                    <td style={{ padding: '14px 12px', color: 'var(--muted)' }}>
                      {lf(locale, zones.find(z => z.id === task.zoneId) as Record<string, unknown> ?? { name: task.zone }, 'name') as string}
                    </td>
                    <td style={{ padding: '14px 12px', color: 'var(--muted)' }}>
                      {lf(locale, inspectors.find(i => i.name === task.assignedTo) as Record<string, unknown> ?? { name: task.assignedTo }, 'name') as string}
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <span className="mono" style={{ fontSize: 11.5, color: 'var(--muted)', letterSpacing: '.04em' }}>{task.dueDate}</span>
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <StatusBadge status={task.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* High-Risk Assets */}
        <div className="card">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--rule)' }}>
            <div className="flex items-center gap-4">
              <span className="mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--muted)' }}>RISK</span>
              <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                {t.dashboard.highRiskAssets}
              </h2>
            </div>
            <Link to="/assets" className="mono flex items-center gap-1"
              style={{ fontSize: 10.5, letterSpacing: '.14em', color: 'var(--ink)', textTransform: 'uppercase', textDecoration: 'none' }}>
              {t.viewAll} →
            </Link>
          </div>
          <div>
            {topRiskAssets.map((asset, i) => {
              const color = asset.riskScore >= 80 ? 'var(--flag)' : asset.riskScore >= 60 ? 'var(--rust)' : asset.riskScore >= 40 ? 'var(--ochre)' : 'var(--moss)'
              return (
                <Link key={asset.id} to={`/assets/${asset.id}`} className="block px-5 py-4"
                  style={{ borderBottom: i < topRiskAssets.length - 1 ? '1px solid var(--rule-2)' : 'none', textDecoration: 'none' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '.08em' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>
                          {lf(locale, asset as Record<string, unknown>, 'name') as string}
                        </div>
                        <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: 2 }}>
                          {assetTypeLabel(asset.type)} · {t.criticality}: {(t.severity as Record<string, string>)[asset.criticality.toLowerCase()] ?? asset.criticality}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="serif" style={{ fontSize: 26, lineHeight: 1, color, fontVariationSettings: '"opsz" 48' }}>
                        {asset.riskScore}
                      </div>
                      <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '.14em', textTransform: 'uppercase' }}>/100</div>
                    </div>
                  </div>
                  <div style={{ position: 'relative', height: 3, background: 'var(--rule-2)', marginTop: 10 }}>
                    <div style={{ position: 'absolute', inset: 0, width: `${asset.riskScore}%`, background: color }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── AI Insights ── */}
      <div className="card mt-4">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--rule)' }}>
          <div className="flex items-center gap-4">
            {/* Geometric icon */}
            <div style={{ width: 32, height: 32, border: '1px solid var(--ink)', position: 'relative', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 4, background: 'var(--ink)' }} />
              <div style={{ position: 'absolute', right: 3, bottom: 3, width: 4, height: 4, background: 'var(--rust)' }} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--muted)' }}>SIGNALS</span>
                <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                  {t.dashboard.aiInsightsPanel}
                </h2>
              </div>
              <p className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '.1em', marginTop: 2, textTransform: 'uppercase' }}>
                {t.dashboard.aiInsightSubtitle}
              </p>
            </div>
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '.14em', textTransform: 'uppercase' }}>
            4 ACTIVE · 2 CRITICAL
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {aiInsights.map((ins, i) => {
            const isLastRow = i >= 2
            const isRightCol = i % 2 === 1
            return (
              <div key={ins.id} style={{
                padding: '18px 20px',
                borderRight: !isRightCol ? '1px solid var(--rule-2)' : 'none',
                borderBottom: !isLastRow ? '1px solid var(--rule-2)' : 'none',
              }}>
                <div className="flex items-start gap-4">
                  {/* Side accent bar */}
                  <div style={{ width: 4, background: ins.color, alignSelf: 'stretch', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge" style={{ color: ins.color, borderColor: ins.color }}>
                        <span className="sq" style={{ background: ins.color }} />
                        {ins.sev}
                      </span>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em' }}>
                        SIG‑{String(ins.id).padStart(3, '0')}
                      </span>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 'auto', letterSpacing: '.12em' }}>
                        CONF · {ins.conf}%
                      </span>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{ins.text}</p>
                    <div className="flex items-center gap-2 mt-3">
                      {/* Confidence bar */}
                      <div style={{ flex: 1, height: 2, background: 'var(--rule-2)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, width: `${ins.conf}%`, background: ins.color }} />
                      </div>
                      <Link to="/ai-insights" className="mono flex items-center gap-1"
                        style={{ fontSize: 10.5, letterSpacing: '.14em', color: 'var(--ink)', textTransform: 'uppercase', textDecoration: 'none' }}>
                        {t.viewDetails} →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between mt-6 pt-4 mono"
        style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.14em', textTransform: 'uppercase', borderTop: '1px solid var(--rule)' }}>
        <span>© {t.appName} · 2024</span>
        <span>Build 4.2.103</span>
        <span>Confidential · Internal Use</span>
      </div>
    </div>
  )
}
