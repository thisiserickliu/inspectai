import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Brain, AlertTriangle, TrendingUp, Wrench, FileText, Settings, Clock } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useI18n } from '../i18n'
import { lf, teamKey } from '../utils/localize'
import StatusBadge from '../components/common/StatusBadge'
import SeverityBadge from '../components/common/SeverityBadge'
import { assets, components, findings, riskScoreTrend } from '../data/mockData'

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

  const conditionColor = (c: string) => {
    if (c === 'Poor') return 'var(--flag)'
    if (c === 'Fair') return 'var(--ochre)'
    return 'var(--moss)'
  }

  const conditionLabel = (c: string) => {
    if (c === 'Poor') return t.condition.poor
    if (c === 'Fair') return t.condition.fair
    return t.condition.good
  }

  const riskColor = (score: number) =>
    score >= 80 ? 'var(--flag)' : score >= 60 ? 'var(--rust)' : score >= 40 ? 'var(--ochre)' : 'var(--moss)'

  const typeLabel = (key: string) => {
    const map: Record<string, string> = {
      routine: t.tasks.types.routine, safety: t.tasks.types.safety,
      preventive: t.tasks.types.preventive, followUp: t.tasks.types.followUp,
      emergency: t.tasks.types.emergency, annual: t.tasks.types.annual,
    }
    return map[key] ?? key
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview',    label: t.assetDetail.tabs.overview,           icon: <Settings size={14} /> },
    { key: 'components',  label: t.assetDetail.tabs.components,         icon: <Wrench size={14} /> },
    { key: 'history',     label: t.assetDetail.tabs.inspectionHistory,  icon: <Clock size={14} /> },
    { key: 'findings',    label: t.assetDetail.tabs.findings,           icon: <AlertTriangle size={14} /> },
    { key: 'documents',   label: t.assetDetail.tabs.documents,          icon: <FileText size={14} /> },
  ]

  const aiInsightColor = (type: string) => {
    if (type === 'critical') return 'var(--flag)'
    if (type === 'high') return 'var(--rust)'
    if (type === 'medium') return 'var(--ochre)'
    return 'var(--steel)'
  }

  const aiInsights = [
    { type: 'critical', text: t.assetHealthAI.insight1 },
    { type: 'high',     text: t.assetHealthAI.insight2 },
    { type: 'medium',   text: t.assetHealthAI.insight3 },
    { type: 'info',     text: t.assetHealthAI.insight4 },
  ]

  const tooltipStyle = {
    background: 'var(--paper)', border: '1px solid var(--ink)', borderRadius: 0,
    fontFamily: "'IBM Plex Mono',monospace", fontSize: 11,
  }

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 flex-wrap">
        <Link to="/assets" className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em', textDecoration: 'none' }}>
          {t.plants}
        </Link>
        <ChevronRight size={12} style={{ color: 'var(--muted)' }} />
        <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em' }}>{t.reportContent.taoyuanPlant}</span>
        <ChevronRight size={12} style={{ color: 'var(--muted)' }} />
        <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em' }}>{t.reportContent.zoneUtilityRoom}</span>
        <ChevronRight size={12} style={{ color: 'var(--muted)' }} />
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink)', letterSpacing: '.08em', fontWeight: 500 }}>CP-104</span>
      </nav>

      {/* Asset Header Card */}
      <div className="card p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {/* Asset icon — Nordic square */}
              <div style={{ width: 48, height: 48, border: '1px solid var(--rule)', background: 'var(--canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Wrench size={22} style={{ color: 'var(--rust)' }} strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="serif" style={{ fontSize: 'clamp(18px,3vw,24px)', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                  {lf(locale, ASSET as Record<string, unknown>, 'name')}
                </h1>
                <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3, letterSpacing: '.08em' }}>
                  {t.assetDetail.idLabel}: {ASSET.id} · {assetTypeLabel(ASSET.type)}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <StatusBadge status={ASSET.status.toLowerCase()} />
                  <SeverityBadge severity={ASSET.criticality.toLowerCase()} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5" style={{ borderTop: '1px solid var(--rule)' }}>
              {[
                { label: `${t.plant} / ${t.zone}`, value: `${t.reportContent.taoyuanPlant} / ${t.reportContent.zoneUtilityRoom}` },
                { label: t.assetDetail.manufacturer, value: ASSET.manufacturer },
                { label: t.assetDetail.installDate, value: ASSET.installDate },
                { label: t.owner, value: (t.teams as Record<string, string>)[teamKey(ASSET.owner)] ?? ASSET.owner },
              ].map((item, i) => (
                <div key={i}>
                  <p className="section-label">{item.label}</p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-2)', marginTop: 3 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Score Gauge */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center p-5" style={{ border: '1px solid var(--rule)', background: 'var(--canvas)', minWidth: 140 }}>
            <p className="section-label mb-2">{t.riskScore}</p>
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
                <circle cx="50" cy="50" r="40" stroke="var(--rule)" strokeWidth="10" fill="none" />
                <circle
                  cx="50" cy="50" r="40"
                  stroke={riskColor(ASSET.riskScore)}
                  strokeWidth="10" fill="none"
                  strokeDasharray={`${(ASSET.riskScore / 100) * 251.2} 251.2`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="serif" style={{ fontSize: 26, lineHeight: 1, color: riskColor(ASSET.riskScore), fontVariationSettings: '"opsz" 48' }}>
                  {ASSET.riskScore}
                </span>
              </div>
            </div>
            <p className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 6, letterSpacing: '.12em' }}>{t.assetDetail.outOf100}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={12} style={{ color: 'var(--flag)' }} />
              <span className="mono" style={{ fontSize: 10, color: 'var(--flag)', letterSpacing: '.08em' }}>{t.assetDetail.trendUp30}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-0 overflow-x-auto" style={{ borderBottom: '1px solid var(--rule)' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex items-center gap-2 mono"
            style={{
              padding: '10px 16px',
              fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
              whiteSpace: 'nowrap', cursor: 'pointer', border: 'none', background: 'transparent',
              color: activeTab === tab.key ? 'var(--ink)' : 'var(--muted)',
              borderBottom: activeTab === tab.key ? '2px solid var(--rust)' : '2px solid transparent',
              marginBottom: -1,
              transition: 'all .15s',
            }}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 space-y-4">
            {/* Latest Inspection Summary */}
            <div className="card p-5">
              <h3 className="mono" style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={13} /> {t.assetDetail.latestInspectionSummary}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: t.assetDetail.date, value: ASSET.lastInspection },
                  { label: t.inspector, value: t.reportContent.inspectorWangMeiLing },
                  { label: t.type, value: t.tasks.types.routine },
                  { label: t.assetDetail.findingsTally, value: `3 (1 ${t.severity.critical})`, color: 'var(--flag)' },
                  { label: t.assetDetail.statusHeader, value: <StatusBadge status="submitted" /> },
                  { label: t.assetDetail.nextInspection, value: ASSET.nextInspection, color: 'var(--rust)' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="section-label">{item.label}</p>
                    <div style={{ fontSize: 13, fontWeight: 500, color: (item as { color?: string }).color ?? 'var(--ink-2)', marginTop: 3 }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Score Trend Chart */}
            <div className="card p-5">
              <h3 className="mono" style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>
                {t.assetDetail.riskTrend}
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={riskScoreTrend.map(d => ({ ...d, dateLabel: lf(locale, d as Record<string, unknown>, 'date') }))}>
                  <CartesianGrid strokeDasharray="0" stroke="var(--rule-2)" vertical={false} />
                  <XAxis dataKey="dateLabel" tick={{ fontSize: 10, fill: 'var(--muted)', fontFamily: "'IBM Plex Mono',monospace" }} axisLine={{ stroke: 'var(--rule)' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--muted)', fontFamily: "'IBM Plex Mono',monospace" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value) => [value, t.riskScore]} />
                  <Line type="monotone" dataKey="score" stroke="var(--flag)" strokeWidth={1.5}
                    dot={{ fill: 'var(--paper)', stroke: 'var(--flag)', strokeWidth: 1.5, r: 3 }}
                    activeDot={{ r: 5, fill: 'var(--flag)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Health Summary */}
          <div className="card p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div style={{ width: 28, height: 28, border: '1px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain size={14} style={{ color: 'var(--ink)' }} />
              </div>
              <h3 className="mono" style={{ fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {t.assetDetail.aiHealthSummary}
              </h3>
            </div>
            <div className="space-y-2">
              {aiInsights.map((insight, i) => {
                const c = aiInsightColor(insight.type)
                return (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', border: `1px solid ${c}`, borderLeft: `3px solid ${c}` }}>
                    <div style={{ width: 3, background: c, flexShrink: 0, alignSelf: 'stretch' }} />
                    <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--ink-2)' }}>{insight.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'components' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--rule)' }}>
            <h3 className="mono" style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {t.assetDetail.componentStatus}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="nordic w-full">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 20px' }}>{t.assetDetail.componentName}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assetDetail.componentType}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assetDetail.condition}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assetDetail.lastChecked}</th>
                </tr>
              </thead>
              <tbody>
                {assetComponents.map(c => (
                  <tr key={c.id}>
                    <td style={{ padding: '12px 20px', fontWeight: 500, color: 'var(--ink)' }}>
                      {lf(locale, c as Record<string, unknown>, 'name')}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted)' }}>{lf(locale, c as Record<string, unknown>, 'type')}</td>
                    <td style={{ padding: '12px' }}>
                      <span className="badge" style={{ color: conditionColor(c.condition), borderColor: conditionColor(c.condition) }}>
                        {conditionLabel(c.condition)}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted)' }}>{c.lastChecked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--rule)' }}>
            <h3 className="mono" style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {t.assetDetail.tabs.inspectionHistory}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="nordic w-full">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 20px' }}>{t.tasks.taskId}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assetDetail.dateHeader}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assetDetail.typeHeader}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.inspector}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.findings}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assetDetail.statusHeader}</th>
                </tr>
              </thead>
              <tbody>
                {inspectionHistory.map(h => (
                  <tr key={h.id}>
                    <td style={{ padding: '12px 20px' }}>
                      <Link to={`/tasks/${h.id}/execute`} className="mono"
                        style={{ fontSize: 12, color: 'var(--rust)', textDecoration: 'none', borderBottom: '1px dashed var(--rule)' }}>
                        {h.id}
                      </Link>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted)' }}>{h.date}</td>
                    <td style={{ padding: '12px', color: 'var(--muted)' }}>{typeLabel(h.typeKey)}</td>
                    <td style={{ padding: '12px', color: 'var(--muted)' }}>{h.inspector}</td>
                    <td style={{ padding: '12px' }}>
                      <span className="mono" style={{ fontSize: 12, color: h.findings > 0 ? 'var(--rust)' : 'var(--moss)', fontWeight: 500 }}>
                        {h.findings} {t.findings.toLowerCase()}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}><StatusBadge status={h.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'findings' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--rule)' }}>
            <h3 className="mono" style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {t.findings} — {lf(locale, ASSET as Record<string, unknown>, 'name')}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="nordic w-full">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 20px' }}>{t.assetDetail.idHeader}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assetDetail.titleHeader}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assetDetail.categoryHeader}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assetDetail.severityHeader}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.discoveryDate}</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assetDetail.statusHeader}</th>
                </tr>
              </thead>
              <tbody>
                {assetFindings.map(f => (
                  <tr key={f.id}>
                    <td style={{ padding: '12px 20px' }}>
                      <Link to={`/findings/${f.id}`} className="mono"
                        style={{ fontSize: 12, color: 'var(--rust)', textDecoration: 'none', borderBottom: '1px dashed var(--rule)' }}>
                        {f.id}
                      </Link>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--ink-2)', maxWidth: 240 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {lf(locale, f as Record<string, unknown>, 'title')}
                      </div>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted)' }}>
                      {(t.findingCategory as Record<string, string>)[f.category] ?? f.category}
                    </td>
                    <td style={{ padding: '12px' }}><SeverityBadge severity={f.severity} /></td>
                    <td style={{ padding: '12px', color: 'var(--muted)' }}>{f.discoveryDate}</td>
                    <td style={{ padding: '12px' }}><StatusBadge status={f.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="card p-10 flex flex-col items-center justify-center text-center">
          <FileText size={40} style={{ color: 'var(--rule)', marginBottom: 12 }} strokeWidth={1} />
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>{t.assetDetail.noDocuments}</p>
          <button className="btn-secondary mt-4">{t.assetDetail.uploadDocument}</button>
        </div>
      )}
    </div>
  )
}
