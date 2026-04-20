import { FileText, Download, Printer, Brain, CheckCircle, AlertTriangle, Table } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useI18n } from '../i18n'
import { lf } from '../utils/localize'
import SeverityBadge from '../components/common/SeverityBadge'
import { reports, findings, assets, plants } from '../data/mockData'

const REPORT = reports[0]

const reportFindings = findings.filter(f => f.plant === 'Taoyuan Plant')

// Nordic-mapped severity colors
const severityNordicColor = (name: string) => {
  const lc = name.toLowerCase()
  if (lc.includes('critical') || lc === 'critical') return 'var(--flag)'
  if (lc.includes('high') || lc === 'high') return 'var(--rust)'
  if (lc.includes('medium') || lc === 'medium') return 'var(--ochre)'
  return 'var(--moss)'
}

export default function ReportDetail() {
  const { t, locale } = useI18n()
  const reportPlant = plants.find(p => p.id === REPORT.plantId)

  const correctiveActions = [
    { id: 'CA-001', finding: 'FD-2024-0089', action: t.reportContent.ca1Action, priority: 'critical', deadline: '2024-03-15', responsible: t.teams.mechanical, status: 'open' },
    { id: 'CA-002', finding: 'FD-2024-0085', action: t.reportContent.ca2Action, priority: 'critical', deadline: '2024-03-13', responsible: t.teams.electrical, status: 'open' },
    { id: 'CA-003', finding: 'FD-2024-0088', action: t.reportContent.ca3Action, priority: 'high', deadline: '2024-03-20', responsible: t.teams.mechanical, status: 'open' },
    { id: 'CA-004', finding: 'FD-2024-0086', action: t.reportContent.ca4Action, priority: 'medium', deadline: '2024-03-11', responsible: t.teams.engineering, status: 'resolved' },
    { id: 'CA-005', finding: 'FD-2024-0083', action: t.reportContent.ca5Action, priority: 'medium', deadline: '2024-03-25', responsible: t.teams.engineering, status: 'open' },
    { id: 'CA-006', finding: 'FD-2024-0084', action: t.reportContent.ca6Action, priority: 'low', deadline: '2024-04-30', responsible: t.teams.chemical, status: 'open' },
  ]

  const reportSummary = [t.reportContent.summary1, t.reportContent.summary2, t.reportContent.summary3, t.reportContent.summary4]

  const severityData = [
    { name: t.severity.critical, value: REPORT.findings.critical },
    { name: t.severity.high,     value: REPORT.findings.high },
    { name: t.severity.medium,   value: REPORT.findings.medium },
    { name: t.severity.low,      value: REPORT.findings.low },
  ]

  const scopeData = [
    { zone: t.reportContent.zoneAssemblyA,     assets: 2, types: t.reportContent.typesAssemblyA,   findings: 3 },
    { zone: t.reportContent.zoneUtilityRoom,   assets: 2, types: t.reportContent.typesUtilityRoom,  findings: 5 },
    { zone: t.reportContent.zoneChemicalStorage, assets: 1, types: t.reportContent.typesChemical,   findings: 1 },
  ]

  const photoData = [
    { caption: t.reportContent.photo1Caption, finding: 'FD-2024-0089' },
    { caption: t.reportContent.photo2Caption, finding: 'FD-2024-0085' },
    { caption: t.reportContent.photo3Caption, finding: 'FD-2024-0088' },
    { caption: t.reportContent.photo4Caption, finding: 'FD-2024-0086' },
  ]

  const nextInspections = [
    { asset: t.reportContent.coolingPumpCP104,       date: '2024-03-15', type: t.reportContent.nextType1, priority: 'critical' },
    { asset: t.reportContent.electricalPanelEP011,   date: '2024-03-18', type: t.reportContent.nextType2, priority: 'critical' },
    { asset: t.reportContent.airCompressorAC201,     date: '2024-04-08', type: t.reportContent.nextType3, priority: 'high' },
    { asset: t.reportContent.mixingTankMT220,        date: '2024-04-06', type: t.reportContent.nextType4, priority: 'medium' },
  ]

  const tooltipStyle = {
    background: 'var(--paper)', border: '1px solid var(--ink)', borderRadius: 0,
    fontFamily: "'IBM Plex Mono',monospace", fontSize: 11,
  }
  const axisProps = {
    axisLine: false, tickLine: false,
    tick: { fontSize: 10, fontFamily: "'IBM Plex Mono',monospace", fill: 'var(--muted)' },
  }

  const totalFindings = Object.values(REPORT.findings).reduce((a, b) => a + b, 0)

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Action Buttons */}
      <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{t.reportDetail.title}</h2>
          <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3, letterSpacing: '.08em' }}>
            {REPORT.id} · {t.reportDetail.generatedByLabel} {REPORT.generatedDate}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="btn-secondary flex items-center gap-2">
            <Printer size={13} />{t.print}
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download size={13} />{t.exportExcel}
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download size={13} />{t.exportPDF}
          </button>
        </div>
      </div>

      {/* Report Container */}
      <div className="card overflow-hidden">
        {/* Report Header — dark Nordic */}
        <div className="p-6 sm:p-8" style={{ background: '#15181a' }}>
          <div className="flex items-start justify-between gap-6 flex-col sm:flex-row">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={18} style={{ color: '#f2efe9' }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="mono" style={{ fontSize: 9.5, letterSpacing: '.22em', color: '#7a7e80', textTransform: 'uppercase' }}>{t.appName}</p>
                  <p style={{ fontSize: 13, color: '#cdd0cf', marginTop: 1 }}>{t.reportDetail.aiPlatformTagline}</p>
                </div>
              </div>
              <h1 className="serif" style={{ fontSize: 'clamp(22px,4vw,32px)', letterSpacing: '-0.02em', color: '#f2efe9', fontWeight: 500 }}>
                {t.reportDetail.title.toUpperCase()}
              </h1>
              <p style={{ fontSize: 15, color: '#cdd0cf', marginTop: 4 }}>{t.reportContent.reportTitle}</p>
            </div>
            <div>
              <span className="badge" style={{ color: 'var(--moss)', borderColor: 'var(--moss)' }}>
                {(t.status as Record<string, string>)[REPORT.status.toLowerCase()] ?? REPORT.status}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}>
            {[
              { label: t.reportDetail.reportId, value: REPORT.id },
              { label: t.reportDetail.generatedDate, value: REPORT.generatedDate },
              { label: t.plant, value: reportPlant ? lf(locale, reportPlant as Record<string, unknown>, 'name') : REPORT.plant },
              { label: t.reportDetail.period, value: lf(locale, REPORT as Record<string, unknown>, 'period') },
            ].map((item, i) => (
              <div key={i}>
                <p className="mono" style={{ fontSize: 9.5, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a7e80' }}>{item.label}</p>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#f2efe9', marginTop: 4 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Report Metadata Table */}
          <div>
            <h2 className="mono" style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Table size={13} /> {t.reportDetail.reportInfo}
            </h2>
            <table className="nordic w-full">
              <tbody>
                {[
                  { label: t.reportDetail.preparedBy, value: lf(locale, REPORT as Record<string, unknown>, 'preparedBy') },
                  { label: t.reportDetail.approvedBy, value: lf(locale, REPORT as Record<string, unknown>, 'approvedBy') },
                  { label: t.reportDetail.reportStatus, value: (t.status as Record<string, string>)[REPORT.status.toLowerCase()] ?? REPORT.status },
                  { label: t.reportDetail.totalAssetsInspected, value: REPORT.totalAssetsInspected.toString() },
                  { label: t.reportDetail.totalFindings, value: totalFindings.toString() },
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '10px 16px', fontWeight: 500, color: 'var(--muted)', width: '35%', fontSize: 12 }}>{row.label}</td>
                    <td style={{ padding: '10px 16px', color: 'var(--ink)', fontSize: 13 }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="mono" style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={13} /> {t.reportDetail.executiveSummary}
            </h2>
            <div style={{ padding: '14px 18px', background: 'var(--canvas)', border: '1px solid var(--rule)' }}>
              <ul className="space-y-2">
                {reportSummary.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span style={{ width: 4, height: 4, background: 'var(--rust)', flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
              <div className="card col-span-2 sm:col-span-1 p-4 text-center">
                <p className="serif" style={{ fontSize: 36, lineHeight: 1, color: 'var(--ink)', fontVariationSettings: '"opsz" 72' }}>{REPORT.totalAssetsInspected}</p>
                <p className="section-label mt-2">{t.reportDetail.totalAssetsInspected}</p>
              </div>
              {severityData.map(s => {
                const c = severityNordicColor(s.name)
                return (
                  <div key={s.name} className="card p-4 text-center">
                    <p className="serif" style={{ fontSize: 36, lineHeight: 1, color: c, fontVariationSettings: '"opsz" 72' }}>{s.value}</p>
                    <p className="section-label mt-2">{s.name}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Inspection Scope */}
          <div>
            <h2 className="section-label" style={{ marginBottom: 12 }}>{t.reportDetail.scope}</h2>
            <div className="overflow-x-auto">
              <table className="nordic w-full">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 16px' }}>{t.zone}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.assetsInspected}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.inspectionTypes}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.findingsCount}</th>
                  </tr>
                </thead>
                <tbody>
                  {scopeData.map((row, i) => (
                    <tr key={i}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--ink)' }}>{row.zone}</td>
                      <td style={{ padding: '12px', color: 'var(--muted)' }}>{row.assets}</td>
                      <td style={{ padding: '12px', color: 'var(--muted)' }}>{row.types}</td>
                      <td style={{ padding: '12px' }}>
                        <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: row.findings > 3 ? 'var(--flag)' : row.findings > 1 ? 'var(--rust)' : 'var(--moss)' }}>
                          {row.findings}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Findings Summary */}
          <div>
            <h2 className="mono" style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={13} style={{ color: 'var(--rust)' }} /> {t.reportDetail.findingsSummary}
            </h2>
            <div className="overflow-x-auto">
              <table className="nordic w-full">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 16px' }}>{t.reportDetail.idHeader}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.titleHeader}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.asset}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.severityHeader}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.categoryHeader}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.statusHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {reportFindings.map(f => (
                    <tr key={f.id}>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="mono" style={{ fontSize: 11, color: 'var(--rust)', letterSpacing: '.04em' }}>{f.id}</span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--ink-2)', maxWidth: 200 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {lf(locale, f as Record<string, unknown>, 'title')}
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                        {lf(locale, assets.find(a => a.id === f.assetId) as Record<string, unknown> ?? { name: f.asset }, 'name')}
                      </td>
                      <td style={{ padding: '12px' }}><SeverityBadge severity={f.severity} /></td>
                      <td style={{ padding: '12px', color: 'var(--muted)' }}>
                        {(t.findingCategory as Record<string, string>)[f.category] ?? f.category}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span className="badge" style={{
                          color: f.status === 'open' ? 'var(--flag)' : 'var(--moss)',
                          borderColor: f.status === 'open' ? 'var(--flag)' : 'var(--moss)',
                        }}>
                          {(t.status as Record<string, string>)[f.status] ?? f.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Severity Breakdown Chart */}
          <div>
            <h2 className="section-label" style={{ marginBottom: 12 }}>{t.reportDetail.severityBreakdown}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={severityData} barSize={36}>
                  <CartesianGrid strokeDasharray="0" stroke="var(--rule-2)" vertical={false} />
                  <XAxis dataKey="name" {...axisProps} />
                  <YAxis {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" radius={0}>
                    {severityData.map((entry, i) => (
                      <Cell key={i} fill={severityNordicColor(entry.name)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {severityData.map(s => {
                  const c = severityNordicColor(s.name)
                  return (
                    <div key={s.name} className="flex items-center gap-3">
                      <div style={{ width: 10, height: 10, background: c, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div className="flex items-center justify-between mb-1">
                          <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{s.name}</span>
                          <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{s.value}</span>
                        </div>
                        <div style={{ width: '100%', height: 3, background: 'var(--rule-2)', position: 'relative' }}>
                          <div style={{ position: 'absolute', inset: 0, width: `${totalFindings ? (s.value / totalFindings) * 100 : 0}%`, background: c }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Photo Evidence */}
          <div>
            <h2 className="section-label" style={{ marginBottom: 12 }}>{t.execution.photoEvidence}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {photoData.map((photo, i) => (
                <div key={i} className="space-y-1.5">
                  <div style={{ aspectRatio: '16/9', background: 'var(--canvas)', border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="mono" style={{ width: 28, height: 28, border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--stone)' }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--ink-2)', fontWeight: 500 }}>{photo.caption}</p>
                  <p className="mono" style={{ fontSize: 10, color: 'var(--stone)', letterSpacing: '.06em' }}>{photo.finding}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Corrective Actions Table */}
          <div>
            <h2 className="section-label" style={{ marginBottom: 12 }}>{t.reportDetail.correctiveActions}</h2>
            <div className="overflow-x-auto">
              <table className="nordic w-full">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 16px' }}>{t.reportDetail.idHeader}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.action}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.priorityHeader}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.deadline}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.responsible}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.actionStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {correctiveActions.map(ca => (
                    <tr key={ca.id}>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.04em' }}>{ca.id}</span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--ink-2)', maxWidth: 200 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ca.action}</div>
                      </td>
                      <td style={{ padding: '12px' }}><SeverityBadge severity={ca.priority} /></td>
                      <td style={{ padding: '12px' }}>
                        <span className="mono" style={{ fontSize: 11, color: ca.priority === 'critical' ? 'var(--flag)' : 'var(--muted)', letterSpacing: '.04em', fontWeight: ca.priority === 'critical' ? 600 : 400 }}>
                          {ca.deadline}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--muted)' }}>{ca.responsible}</td>
                      <td style={{ padding: '12px' }}>
                        <span className="badge" style={{
                          color: ca.status === 'resolved' ? 'var(--moss)' : 'var(--rust)',
                          borderColor: ca.status === 'resolved' ? 'var(--moss)' : 'var(--rust)',
                        }}>
                          {ca.status === 'resolved' ? t.reportContent.resolvedLabel : t.reportContent.openLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Conclusion */}
          <div>
            <h2 className="mono" style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Brain size={13} /> {t.reportDetail.aiConclusion}
            </h2>
            <div style={{ padding: '18px 20px', background: 'var(--canvas)', border: '1px solid var(--rule)', borderLeft: '3px solid var(--steel)' }}>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.reportAI.p1 }} />
              <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.reportAI.p2 }} />
              <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--ink-2)' }} dangerouslySetInnerHTML={{ __html: t.reportAI.p3 }} />
            </div>
          </div>

          {/* Next Recommended Inspection */}
          <div>
            <h2 className="section-label" style={{ marginBottom: 12 }}>{t.reportDetail.nextInspection}</h2>
            <div className="overflow-x-auto">
              <table className="nordic w-full">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 16px' }}>{t.asset}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.recommendedDate}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.typeHeader}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.reportDetail.priorityHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {nextInspections.map((rec, i) => (
                    <tr key={i}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--ink)' }}>{rec.asset}</td>
                      <td style={{ padding: '12px', color: 'var(--muted)' }}>{rec.date}</td>
                      <td style={{ padding: '12px', color: 'var(--muted)' }}>{rec.type}</td>
                      <td style={{ padding: '12px' }}><SeverityBadge severity={rec.priority} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-6 mono"
            style={{ borderTop: '1px solid var(--rule)', fontSize: 10, color: 'var(--stone)', letterSpacing: '.1em' }}>
            <p>{t.reportDetail.generatedBy} · {REPORT.generatedDate} · {REPORT.id}</p>
            <p>{t.reportDetail.confidentialNotice}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
