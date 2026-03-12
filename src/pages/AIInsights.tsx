import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, AlertTriangle, TrendingUp, TrendingDown, Minus, ArrowRight, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { useI18n } from '../i18n'
import SeverityBadge from '../components/common/SeverityBadge'
import KPICard from '../components/common/KPICard'
import { aiInsightsData } from '../data/mockData'

type Section = 'anomalies' | 'recurring' | 'recommendations' | 'explainability'

export default function AIInsights() {
  const { t } = useI18n()

  const explainabilityData = {
    flagId: 'ANO-001',
    asset: 'Cooling Pump CP-104',
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
    { key: 'anomalies', label: t.aiInsights.anomalyDetection },
    { key: 'recurring', label: t.aiInsights.recurringIssues },
    { key: 'recommendations', label: t.aiInsights.recommendations },
    { key: 'explainability', label: t.aiInsights.explainability },
  ]

  const trendIcon = (trend: string) => {
    if (trend === 'increasing') return <TrendingUp className="w-3.5 h-3.5 text-red-500" />
    if (trend === 'decreasing') return <TrendingDown className="w-3.5 h-3.5 text-green-500" />
    return <Minus className="w-3.5 h-3.5 text-gray-500" />
  }

  const trendLabel = (trend: string) => {
    if (trend === 'increasing') return <span className="text-red-600">{t.aiInsights.increasing}</span>
    if (trend === 'decreasing') return <span className="text-green-600">{t.aiInsights.decreasing}</span>
    return <span className="text-gray-500">{t.aiInsights.stable}</span>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">{t.aiInsights.title}</h2>
        </div>
        <p className="text-sm text-gray-500">{t.aiInsights.description}</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          label={t.kpi.totalAIFlags}
          value={28}
          icon={<Brain className="w-5 h-5 text-blue-600" />}
          iconBg="bg-blue-100"
        />
        <KPICard
          label={t.kpi.anomaliesDetected}
          value={12}
          icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
          iconBg="bg-red-100"
          valueColor="text-red-600"
        />
        <KPICard
          label={t.kpi.highPriorityRecs}
          value={7}
          icon={<TrendingUp className="w-5 h-5 text-orange-600" />}
          iconBg="bg-orange-100"
          valueColor="text-orange-600"
        />
        <KPICard
          label={t.kpi.avgConfidence}
          value="87%"
          icon={<Info className="w-5 h-5 text-green-600" />}
          iconBg="bg-green-100"
          valueColor="text-green-600"
        />
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto">
        {sectionTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeSection === tab.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
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
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    anomaly.severity === 'critical' ? 'text-red-600' : 'text-orange-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{anomaly.asset}</h3>
                      <SeverityBadge severity={anomaly.severity} />
                      <span className="badge bg-gray-100 text-gray-600 capitalize">{anomaly.type}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-snug">{anomaly.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{t.aiInsights.confidence}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${anomaly.confidence >= 90 ? 'bg-blue-600' : 'bg-blue-400'}`}
                              style={{ width: `${anomaly.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-gray-900">{anomaly.confidence}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{t.aiInsights.detectionDate}</p>
                        <p className="text-xs font-medium text-gray-700">{anomaly.detectionDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/assets/${anomaly.assetId}`}
                  className="flex-shrink-0 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 whitespace-nowrap"
                >
                  {t.aiInsights.viewAsset} <ArrowRight className="w-3.5 h-3.5" />
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
                  <h3 className="text-sm font-semibold text-gray-900">{issue.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {trendIcon(issue.trend)}
                    {trendLabel(issue.trend)}
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{issue.occurrences} {t.aiInsights.occurrences}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{issue.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">{t.aiInsights.affectedAssets}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {issue.affectedAssets.map(a => (
                      <span key={a} className="badge bg-blue-50 text-blue-700">{a}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t.aiInsights.firstDetected}</p>
                  <p className="text-sm font-medium text-gray-700 mt-0.5">{issue.firstDetected}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t.aiInsights.lastDetected}</p>
                  <p className="text-sm font-medium text-gray-700 mt-0.5">{issue.lastDetected}</p>
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
                className="w-full p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <SeverityBadge severity={rec.priority} className="flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{rec.recommendation}</p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="text-xs text-gray-500">{rec.asset}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{rec.zone}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{t.aiInsights.confidence}: <strong className="text-gray-700">{rec.confidence}%</strong></span>
                    </div>
                  </div>
                  {expandedRec === rec.id ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                </div>
              </button>
              {expandedRec === rec.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-3 bg-gray-50">
                  <p className="text-xs font-medium text-gray-700 mb-1.5">{t.aiInsights.suggestedAction}</p>
                  <p className="text-sm text-gray-700 bg-white border border-gray-200 rounded-lg p-3">{rec.suggestedAction}</p>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">{t.aiInsights.confidence}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: `${rec.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-900">{rec.confidence}%</span>
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
          <div className="card p-5 border-l-4 border-l-red-500">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">{t.aiInsights.explainFlagLabel} {explainabilityData.flagId}</p>
                <h3 className="text-base font-bold text-gray-900">{explainabilityData.asset}</h3>
                <p className="text-sm text-gray-600">{explainabilityData.type}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-red-500" style={{ width: `${explainabilityData.confidence}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-red-600">{explainabilityData.confidence}%</span>
                  </div>
                  <SeverityBadge severity="critical" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {/* Why Flagged */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{t.aiInsights.whyFlagged}</h3>
              <ol className="space-y-2">
                {explainabilityData.whyFlagged.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {reason}
                  </li>
                ))}
              </ol>
            </div>

            {/* Confidence Breakdown */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{t.aiInsights.confidenceBreakdown}</h3>
              <div className="space-y-3">
                {explainabilityData.confidenceBreakdown.map((factor, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-700">{factor.factor}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{factor.weight}</span>
                        <span className="text-xs font-bold text-gray-900">{factor.score}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${factor.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Findings */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{t.aiInsights.relatedHistoricalFindings}</h3>
              <div className="space-y-2">
                {explainabilityData.historicalFindings.map(hf => (
                  <Link key={hf.id} to={`/findings/${hf.id}`} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors group">
                    <AlertTriangle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                      hf.severity === 'high' ? 'text-orange-500' : hf.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 group-hover:text-blue-700">{hf.desc}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{hf.id} · {hf.date}</p>
                    </div>
                    <SeverityBadge severity={hf.severity} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Supporting Data Points */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{t.aiInsights.supportingDataPoints}</h3>
              <div className="space-y-2">
                {explainabilityData.dataPoints.map((dp, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2"></span>
                    <span className="text-gray-700">{dp}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">{t.aiInsights.recommendedReInspectionDate}</p>
                <p className="text-sm font-bold text-red-600 mt-0.5">{explainabilityData.reInspectionDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
