import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, AlertTriangle, TrendingUp, TrendingDown, Minus, ArrowRight, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { useI18n } from '../i18n'
import { lf } from '../utils/localize'
import SeverityBadge from '../components/common/SeverityBadge'
import KPICard from '../components/common/KPICard'
import { aiInsightsData } from '../data/mockData'

type Section = 'anomalies' | 'recurring' | 'recommendations' | 'explainability'

export default function AIInsights() {
  const { t, locale } = useI18n()

  const explainabilityData = {
    flagId: 'ANO-001',
    asset: t.reportContent.coolingPumpCP104,
    type: t.explainData.flagTitle,
    confidence: 94,
    whyFlagged: [t.explainData.reason1, t.explainData.reason2, t.explainData.reason3, t.explainData.reason4],
    confidenceBreakdown: [
      { factor: t.explainData.factor1, score: 96, weight: '35%' },
      { factor: t.explainData.factor2, score: 92, weight: '30%' },
      { factor: t.explainData.factor3, score: 94, weight: '25%' },
      { factor: t.explainData.factor4, score: 89, weight: '10%' },
    ],
    historicalFindings: [
      { id: 'FD-2024-0088', date: '2024-03-10', desc: t.explainData.histDesc1, severity: 'high' },
      { id: 'FD-2023-0412', date: '2023-09-15', desc: t.explainData.histDesc2, severity: 'medium' },
      { id: 'FD-2023-0101', date: '2023-04-20', desc: t.explainData.histDesc3, severity: 'low' },
    ],
    dataPoints: [t.explainData.dp1, t.explainData.dp2, t.explainData.dp3, t.explainData.dp4, t.explainData.dp5],
    reInspectionDate: '2024-03-15',
  }
  const [activeSection, setActiveSection] = useState<Section>('anomalies')
  const [expandedRec, setExpandedRec] = useState<string | null>(null)

  const sectionTabs: { key: Section; label: string }[] = [
    { key: 'anomalies',       label: t.aiInsights.anomalyDetection },
    { key: 'recurring',       label: t.aiInsights.recurringIssues },
    { key: 'recommendations', label: t.aiInsights.recommendations },
    { key: 'explainability',  label: t.aiInsights.explainability },
  ]

  const trendIcon = (trend: string) => {
    if (trend === 'increasing') return <TrendingUp size={13} style={{ color: 'var(--flag)' }} />
    if (trend === 'decreasing') return <TrendingDown size={13} style={{ color: 'var(--moss)' }} />
    return <Minus size={13} style={{ color: 'var(--stone)' }} />
  }

  const trendLabel = (trend: string) => {
    if (trend === 'increasing') return <span style={{ color: 'var(--flag)', fontSize: 12 }}>{t.aiInsights.increasing}</span>
    if (trend === 'decreasing') return <span style={{ color: 'var(--moss)', fontSize: 12 }}>{t.aiInsights.decreasing}</span>
    return <span style={{ color: 'var(--stone)', fontSize: 12 }}>{t.aiInsights.stable}</span>
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div style={{ width: 32, height: 32, border: '1px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={16} style={{ color: 'var(--ink)' }} />
          </div>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{t.aiInsights.title}</h2>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginLeft: 44 }}>{t.aiInsights.description}</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard label={t.kpi.totalAIFlags} value={28} sparkBars={[20,30,25,40,35,45,38,50,44,55,48,60]} />
        <KPICard label={t.kpi.anomaliesDetected} value={12} sparkBars={[5,8,6,10,8,12,9,14,11,13,12,15]} />
        <KPICard label={t.kpi.highPriorityRecs} value={7} sparkBars={[2,4,3,5,4,6,5,7,6,8,7,9]} />
        <KPICard label={t.kpi.avgConfidence} value="87%" sparkBars={[70,72,75,74,78,76,80,79,82,84,86,88]} />
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-0 overflow-x-auto" style={{ borderBottom: '1px solid var(--rule)' }}>
        {sectionTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className="mono"
            style={{
              padding: '10px 16px',
              fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
              whiteSpace: 'nowrap', cursor: 'pointer', border: 'none', background: 'transparent',
              color: activeSection === tab.key ? 'var(--ink)' : 'var(--muted)',
              borderBottom: activeSection === tab.key ? '2px solid var(--rust)' : '2px solid transparent',
              marginBottom: -1, transition: 'all .15s', fontFamily: 'inherit',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section A: Anomaly Detection */}
      {activeSection === 'anomalies' && (
        <div className="space-y-3">
          {aiInsightsData.anomalies.map(anomaly => (
            <div key={anomaly.id} className="card p-5">
              <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <AlertTriangle size={16} style={{ marginTop: 2, flexShrink: 0, color: anomaly.severity === 'critical' ? 'var(--flag)' : 'var(--rust)' }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{lf(locale, anomaly as Record<string, unknown>, 'asset')}</h3>
                      <SeverityBadge severity={anomaly.severity} />
                      <span className="badge" style={{ color: 'var(--muted)', borderColor: 'var(--rule)' }}>
                        {(t.findingCategory as Record<string, string>)[anomaly.type] ?? anomaly.type}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{lf(locale, anomaly as Record<string, unknown>, 'description')}</p>
                    <div className="flex items-center gap-5 mt-3">
                      <div>
                        <p className="section-label mb-1">{t.aiInsights.confidence}</p>
                        <div className="flex items-center gap-2">
                          <div style={{ width: 80, height: 3, background: 'var(--rule-2)', position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: 0, width: `${anomaly.confidence}%`, background: 'var(--steel)' }} />
                          </div>
                          <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: '.04em' }}>{anomaly.confidence}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="section-label mb-1">{t.aiInsights.detectionDate}</p>
                        <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.04em' }}>{anomaly.detectionDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/assets/${anomaly.assetId}`}
                  className="mono flex items-center gap-1 flex-shrink-0"
                  style={{ fontSize: 10.5, color: 'var(--rust)', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap' }}
                >
                  {t.aiInsights.viewAsset} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section B: Recurring Issues */}
      {activeSection === 'recurring' && (
        <div className="space-y-3">
          {aiInsightsData.recurringIssues.map(issue => (
            <div key={issue.id} className="card p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{lf(locale, issue as Record<string, unknown>, 'title')}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {trendIcon(issue.trend)}
                    {trendLabel(issue.trend)}
                    <span style={{ color: 'var(--rule)', fontSize: 12 }}>·</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{issue.occurrences} {t.aiInsights.occurrences}</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
                {lf(locale, issue as Record<string, unknown>, 'description')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3" style={{ borderTop: '1px solid var(--rule)' }}>
                <div>
                  <p className="section-label mb-1">{t.aiInsights.affectedAssets}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(locale === 'zh-TW' ? issue.affectedAssetsZh : locale === 'ja' ? issue.affectedAssetsJa : issue.affectedAssets).map(a => (
                      <span key={a} className="badge" style={{ color: 'var(--steel)', borderColor: 'var(--steel)' }}>{a}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="section-label mb-1">{t.aiInsights.firstDetected}</p>
                  <p className="mono" style={{ fontSize: 11, color: 'var(--ink-2)', letterSpacing: '.04em' }}>{issue.firstDetected}</p>
                </div>
                <div>
                  <p className="section-label mb-1">{t.aiInsights.lastDetected}</p>
                  <p className="mono" style={{ fontSize: 11, color: 'var(--ink-2)', letterSpacing: '.04em' }}>{issue.lastDetected}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section C: Recommendations */}
      {activeSection === 'recommendations' && (
        <div className="space-y-3">
          {aiInsightsData.recommendations.map(rec => (
            <div key={rec.id} className="card overflow-hidden">
              <button
                onClick={() => setExpandedRec(expandedRec === rec.id ? null : rec.id)}
                className="w-full p-5 text-left"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background .15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--canvas)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div className="flex items-start gap-3">
                  <SeverityBadge severity={rec.priority} className="flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{lf(locale, rec as Record<string, unknown>, 'recommendation')}</p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{lf(locale, rec as Record<string, unknown>, 'asset')}</span>
                      <span style={{ color: 'var(--rule)' }}>·</span>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{lf(locale, rec as Record<string, unknown>, 'zone')}</span>
                      <span style={{ color: 'var(--rule)' }}>·</span>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{t.aiInsights.confidence}: <strong style={{ color: 'var(--ink-2)' }}>{rec.confidence}%</strong></span>
                    </div>
                  </div>
                  {expandedRec === rec.id
                    ? <ChevronUp size={15} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                    : <ChevronDown size={15} style={{ color: 'var(--muted)', flexShrink: 0 }} />}
                </div>
              </button>
              {expandedRec === rec.id && (
                <div className="px-5 pb-5 pt-3" style={{ borderTop: '1px solid var(--rule)', background: 'var(--canvas)' }}>
                  <p className="section-label mb-1.5">{t.aiInsights.suggestedAction}</p>
                  <p style={{ fontSize: 13, color: 'var(--ink-2)', padding: '10px 12px', border: '1px solid var(--rule)', background: 'var(--card)', lineHeight: 1.55 }}>
                    {lf(locale, rec as Record<string, unknown>, 'suggestedAction')}
                  </p>
                  <div className="mt-3">
                    <p className="section-label mb-1">{t.aiInsights.confidence}</p>
                    <div className="flex items-center gap-2">
                      <div style={{ flex: 1, height: 3, background: 'var(--rule-2)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, width: `${rec.confidence}%`, background: 'var(--steel)' }} />
                      </div>
                      <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: '.04em' }}>{rec.confidence}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Section D: Explainability Panel */}
      {activeSection === 'explainability' && (
        <div className="space-y-5">
          {/* Header */}
          <div className="card p-5" style={{ borderLeft: '3px solid var(--flag)' }}>
            <div className="flex items-start gap-3">
              <div style={{ width: 28, height: 28, border: '1px solid var(--flag)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Brain size={14} style={{ color: 'var(--flag)' }} />
              </div>
              <div>
                <p className="section-label mb-0.5">{t.aiInsights.explainFlagLabel} {explainabilityData.flagId}</p>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{explainabilityData.asset}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>{explainabilityData.type}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div style={{ width: 72, height: 3, background: 'var(--rule-2)', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, width: `${explainabilityData.confidence}%`, background: 'var(--flag)' }} />
                  </div>
                  <span className="serif" style={{ fontSize: 16, lineHeight: 1, color: 'var(--flag)', fontVariationSettings: '"opsz" 36' }}>
                    {explainabilityData.confidence}%
                  </span>
                  <SeverityBadge severity="critical" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {/* Why Flagged */}
            <div className="card p-5">
              <h3 className="section-label mb-3">{t.aiInsights.whyFlagged}</h3>
              <ol className="space-y-2">
                {explainabilityData.whyFlagged.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mono flex-shrink-0"
                      style={{ width: 20, height: 20, border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--rust)', marginTop: 1 }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{reason}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Confidence Breakdown */}
            <div className="card p-5">
              <h3 className="section-label mb-3">{t.aiInsights.confidenceBreakdown}</h3>
              <div className="space-y-3">
                {explainabilityData.confidenceBreakdown.map((factor, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>{factor.factor}</span>
                      <div className="flex items-center gap-2">
                        <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.08em' }}>{factor.weight}</span>
                        <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: '.04em' }}>{factor.score}%</span>
                      </div>
                    </div>
                    <div style={{ height: 3, background: 'var(--rule-2)', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, width: `${factor.score}%`, background: 'var(--steel)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Findings */}
            <div className="card p-5">
              <h3 className="section-label mb-3">{t.aiInsights.relatedHistoricalFindings}</h3>
              <div className="space-y-2">
                {explainabilityData.historicalFindings.map(hf => {
                  const c = hf.severity === 'high' ? 'var(--rust)' : hf.severity === 'medium' ? 'var(--ochre)' : 'var(--moss)'
                  return (
                    <Link key={hf.id} to={`/findings/${hf.id}`}
                      className="flex items-start gap-3 p-2.5"
                      style={{ textDecoration: 'none', border: '1px solid var(--rule-2)' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--rust)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--rule-2)')}
                    >
                      <AlertTriangle size={12} style={{ marginTop: 2, flexShrink: 0, color: c }} />
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 12, color: 'var(--ink-2)', fontWeight: 500 }}>{hf.desc}</p>
                        <p className="mono" style={{ fontSize: 10, color: 'var(--stone)', marginTop: 2, letterSpacing: '.06em' }}>{hf.id} · {hf.date}</p>
                      </div>
                      <SeverityBadge severity={hf.severity} />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Supporting Data Points */}
            <div className="card p-5">
              <h3 className="section-label mb-3">{t.aiInsights.supportingDataPoints}</h3>
              <div className="space-y-2">
                {explainabilityData.dataPoints.map((dp, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ width: 4, height: 4, background: 'var(--rust)', flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{dp}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
                <p className="section-label mb-1">{t.aiInsights.recommendedReInspectionDate}</p>
                <p className="mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--flag)', letterSpacing: '.04em', marginTop: 3 }}>
                  {explainabilityData.reInspectionDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
