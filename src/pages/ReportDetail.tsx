import { FileText, Download, Printer, Brain, CheckCircle, AlertTriangle, Table } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useI18n } from '../i18n'
import { lf } from '../utils/localize'
import SeverityBadge from '../components/common/SeverityBadge'
import { reports, findings, assets, plants } from '../data/mockData'

const REPORT = reports[0]

const reportFindings = findings.filter(f => f.plant === 'Taoyuan Plant')

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
    { name: t.severity.critical, value: REPORT.findings.critical, color: '#dc2626' },
    { name: t.severity.high, value: REPORT.findings.high, color: '#ea580c' },
    { name: t.severity.medium, value: REPORT.findings.medium, color: '#d97706' },
    { name: t.severity.low, value: REPORT.findings.low, color: '#65a30d' },
  ]

  const scopeData = [
    { zone: t.reportContent.zoneAssemblyA, assets: 2, types: t.reportContent.typesAssemblyA, findings: 3 },
    { zone: t.reportContent.zoneUtilityRoom, assets: 2, types: t.reportContent.typesUtilityRoom, findings: 5 },
    { zone: t.reportContent.zoneChemicalStorage, assets: 1, types: t.reportContent.typesChemical, findings: 1 },
  ]

  const photoData = [
    { caption: t.reportContent.photo1Caption, finding: 'FD-2024-0089' },
    { caption: t.reportContent.photo2Caption, finding: 'FD-2024-0085' },
    { caption: t.reportContent.photo3Caption, finding: 'FD-2024-0088' },
    { caption: t.reportContent.photo4Caption, finding: 'FD-2024-0086' },
  ]

  const nextInspections = [
    { asset: t.reportContent.coolingPumpCP104, date: '2024-03-15', type: t.reportContent.nextType1, priority: 'critical' },
    { asset: t.reportContent.electricalPanelEP011, date: '2024-03-18', type: t.reportContent.nextType2, priority: 'critical' },
    { asset: t.reportContent.airCompressorAC201, date: '2024-04-08', type: t.reportContent.nextType3, priority: 'high' },
    { asset: t.reportContent.mixingTankMT220, date: '2024-04-06', type: t.reportContent.nextType4, priority: 'medium' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{t.reportDetail.title}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{REPORT.id} · {t.reportDetail.generatedByLabel} {REPORT.generatedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Printer className="w-4 h-4" />
            {t.print}
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            {t.exportExcel}
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            {t.exportPDF}
          </button>
        </div>
      </div>

      {/* Report Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Report Header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-medium">{t.appName}</p>
                  <p className="text-white font-bold">{t.reportDetail.aiPlatformTagline}</p>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{t.reportDetail.title.toUpperCase()}</h1>
              <p className="text-blue-200 mt-1 text-lg">{t.reportContent.reportTitle}</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">{(t.status as Record<string, string>)[REPORT.status.toLowerCase()] ?? REPORT.status}</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6 pt-6 border-t border-white/20">
            {[
              { label: t.reportDetail.reportId, value: REPORT.id },
              { label: t.reportDetail.generatedDate, value: REPORT.generatedDate },
              { label: t.plant, value: reportPlant ? lf(locale, reportPlant as Record<string, unknown>, 'name') : REPORT.plant },
              { label: t.reportDetail.period, value: lf(locale, REPORT as Record<string, unknown>, 'period') },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-xs text-blue-300 uppercase tracking-wide">{item.label}</p>
                <p className="text-white font-semibold mt-0.5 text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Report Metadata Table */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Table className="w-4 h-4 text-blue-600" /> {t.reportDetail.reportInfo}
            </h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {[
                    { label: t.reportDetail.preparedBy, value: lf(locale, REPORT as Record<string, unknown>, 'preparedBy') },
                    { label: t.reportDetail.approvedBy, value: lf(locale, REPORT as Record<string, unknown>, 'approvedBy') },
                    { label: t.reportDetail.reportStatus, value: (t.status as Record<string, string>)[REPORT.status.toLowerCase()] ?? REPORT.status },
                    { label: t.reportDetail.totalAssetsInspected, value: REPORT.totalAssetsInspected.toString() },
                    { label: t.reportDetail.totalFindings, value: Object.values(REPORT.findings).reduce((a, b) => a + b, 0).toString() },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-2.5 font-medium text-gray-700 w-1/3">{row.label}</td>
                      <td className="px-4 py-2.5 text-gray-900">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" /> {t.reportDetail.executiveSummary}
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <ul className="space-y-2">
                {reportSummary.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-blue-900">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
              <div className="col-span-2 sm:col-span-1 bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{REPORT.totalAssetsInspected}</p>
                <p className="text-xs text-gray-500 mt-1">{t.reportDetail.totalAssetsInspected}</p>
              </div>
              {severityData.map(s => (
                <div key={s.name} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inspection Scope */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">{t.reportDetail.scope}</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{t.zone}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.assetsInspected}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.inspectionTypes}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.findingsCount}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {scopeData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-800">{row.zone}</td>
                      <td className="px-4 py-3 text-gray-600">{row.assets}</td>
                      <td className="px-4 py-3 text-gray-600">{row.types}</td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${row.findings > 3 ? 'text-red-600' : row.findings > 1 ? 'text-orange-600' : 'text-green-600'}`}>
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
            <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" /> {t.reportDetail.findingsSummary}
            </h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.idHeader}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.titleHeader}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.asset}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.severityHeader}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.categoryHeader}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.statusHeader}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reportFindings.map((f, i) => (
                    <tr key={f.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-xs text-blue-600">{f.id}</td>
                      <td className="px-4 py-3 text-gray-800 max-w-xs">
                        <div className="truncate">{lf(locale, f as Record<string, unknown>, 'title')}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lf(locale, assets.find(a => a.id === f.assetId) as Record<string, unknown> ?? { name: f.asset }, 'name')}</td>
                      <td className="px-4 py-3"><SeverityBadge severity={f.severity} /></td>
                      <td className="px-4 py-3 text-gray-600">
                        {(t.findingCategory as Record<string, string>)[f.category] ?? f.category}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge ${f.status === 'open' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
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
            <h2 className="text-base font-semibold text-gray-900 mb-3">{t.reportDetail.severityBreakdown}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={severityData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {severityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {severityData.map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{s.name}</span>
                        <span className="text-sm font-bold text-gray-900">{s.value}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: `${(s.value / Object.values(REPORT.findings).reduce((a, b) => a + b, 0)) * 100}%`, backgroundColor: s.color }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Evidence */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">{t.execution.photoEvidence}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {photoData.map((photo, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-400/30 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-gray-500 text-xs font-bold">{String.fromCharCode(65 + i)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{photo.caption}</p>
                  <p className="text-xs text-gray-400">{photo.finding}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Corrective Actions Table */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">{t.reportDetail.correctiveActions}</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.idHeader}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.action}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.priorityHeader}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.deadline}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.responsible}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.actionStatus}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {correctiveActions.map((ca, i) => (
                    <tr key={ca.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{ca.id}</td>
                      <td className="px-4 py-3 text-gray-800 max-w-xs">
                        <div className="truncate">{ca.action}</div>
                      </td>
                      <td className="px-4 py-3"><SeverityBadge severity={ca.priority} /></td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        <span className={ca.priority === 'critical' ? 'text-red-600 font-medium' : ''}>{ca.deadline}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{ca.responsible}</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${ca.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
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
            <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-600" /> {t.reportDetail.aiConclusion}
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <p className="text-sm text-blue-900 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t.reportAI.p1 }} />
              <p className="text-sm text-blue-900 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t.reportAI.p2 }} />
              <p className="text-sm text-blue-900 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.reportAI.p3 }} />
            </div>
          </div>

          {/* Next Recommended Inspection */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">{t.reportDetail.nextInspection}</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{t.asset}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.recommendedDate}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.typeHeader}</th>
                    <th className="text-left px-4 py-3 font-medium">{t.reportDetail.priorityHeader}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {nextInspections.map((rec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-800">{rec.asset}</td>
                      <td className="px-4 py-3 text-gray-600">{rec.date}</td>
                      <td className="px-4 py-3 text-gray-600">{rec.type}</td>
                      <td className="px-4 py-3"><SeverityBadge severity={rec.priority} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 flex items-center justify-between text-xs text-gray-400">
            <p>{t.reportDetail.generatedBy} · {REPORT.generatedDate} · {REPORT.id}</p>
            <p>{t.reportDetail.confidentialNotice}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
