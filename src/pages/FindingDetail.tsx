import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Brain, Camera, Send, AlertTriangle, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n'
import { lf, teamKey } from '../utils/localize'
import StatusBadge from '../components/common/StatusBadge'
import SeverityBadge from '../components/common/SeverityBadge'
import { findings, assets, zones, plants, inspectors } from '../data/mockData'

const FINDING = findings[0]

const statusOptions = ['open', 'pending', 'inProgress', 'resolved', 'closed']

const severityColor = (s: string) =>
  s === 'critical' ? 'var(--flag)' : s === 'high' ? 'var(--rust)' : s === 'medium' ? 'var(--ochre)' : 'var(--moss)'

export default function FindingDetail() {
  const { t, locale } = useI18n()
  const asset = assets.find(a => a.id === FINDING.assetId)
  const zone = asset ? zones.find(z => z.id === asset.zoneId) : null
  const plant = zone ? plants.find(p => p.id === zone.plantId) : null
  const inspector = inspectors.find(i => i.name === FINDING.inspector)
  const [comment, setComment] = useState('')
  const [selectedStatus, setSelectedStatus] = useState(FINDING.status)

  const categoryLabel = (cat: string) => (t.findingCategory as Record<string, string>)[cat] ?? cat

  const activities = [
    { id: 1, user: t.reportContent.inspectorWangMeiLing, action: 'findingCreated', time: '2024-03-10 09:32', detail: '', avatar: 'WM' },
    { id: 2, user: t.reportContent.inspectorWangMeiLing, action: 'photoAdded', time: '2024-03-10 09:45', detail: t.notif.n1, avatar: 'WM' },
    { id: 3, user: t.user.fullName, action: 'commented', time: '2024-03-10 11:20', detail: t.timeline.activityComment1, avatar: 'CW' },
    { id: 4, user: t.reportContent.inspectorLiuKuoCheng, action: 'statusChanged', time: '2024-03-11 08:00', detail: t.timeline.activityStatus1, avatar: 'LK' },
  ]

  const steps = [t.findingAI.step1, t.findingAI.step2, t.findingAI.step3, t.findingAI.step4]

  return (
    <div className="p-4 sm:p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 flex-wrap mb-5">
        <Link to="/findings" className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em', textDecoration: 'none' }}>
          {t.findings}
        </Link>
        <ChevronRight size={11} style={{ color: 'var(--muted)' }} />
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink)', fontWeight: 500, letterSpacing: '.08em' }}>{FINDING.id}</span>
      </nav>

      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle size={18} style={{ color: severityColor(FINDING.severity), flexShrink: 0 }} />
            <h1 className="serif" style={{ fontSize: 'clamp(18px,3vw,22px)', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
              {lf(locale, FINDING as Record<string, unknown>, 'title')}
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em' }}>{FINDING.id}</span>
            <SeverityBadge severity={FINDING.severity} />
            <StatusBadge status={FINDING.status} />
            <span className="badge" style={{ color: 'var(--muted)', borderColor: 'var(--rule)' }}>{categoryLabel(FINDING.category)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-5">
          {/* Metadata Card */}
          <div className="card p-5">
            <h3 className="section-label mb-4">{t.findingDetail.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: t.findingDetail.findingId, value: FINDING.id },
                { label: t.asset, value: asset ? lf(locale, asset as Record<string, unknown>, 'name') : FINDING.asset },
                { label: t.component, value: lf(locale, FINDING as Record<string, unknown>, 'component') },
                { label: t.plant, value: plant ? lf(locale, plant as Record<string, unknown>, 'name') : FINDING.plant },
                { label: t.zone, value: zone ? lf(locale, zone as Record<string, unknown>, 'name') : FINDING.zone },
                { label: t.inspector, value: inspector ? lf(locale, inspector as Record<string, unknown>, 'name') : FINDING.inspector },
                { label: t.discoveryDate, value: FINDING.discoveryDate },
                { label: t.dueDate, value: FINDING.dueDate },
                { label: t.owner, value: (t.teams as Record<string, string>)[teamKey(FINDING.owner)] ?? FINDING.owner },
              ].map((item, i) => (
                <div key={i}>
                  <p className="section-label">{item.label}</p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-2)', marginTop: 3 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="card p-5 space-y-4">
            {[
              { title: t.findingDetail.description, field: 'description' },
              { title: t.findingDetail.impact, field: 'impact' },
              { title: t.findingDetail.riskDescription, field: 'riskDescription' },
            ].map((sec, i) => (
              <div key={i} className={i > 0 ? 'pt-4' : ''} style={i > 0 ? { borderTop: '1px solid var(--rule)' } : {}}>
                <h3 className="section-label mb-2">{sec.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                  {lf(locale, FINDING as Record<string, unknown>, sec.field)}
                </p>
              </div>
            ))}
          </div>

          {/* Probable Cause & Recommended Action */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="card p-5">
              <h3 className="section-label mb-2">{t.execution.probableCause}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                {lf(locale, FINDING as Record<string, unknown>, 'probableCause')}
              </p>
            </div>
            <div className="card p-5">
              <h3 className="section-label mb-2">{t.execution.recommendedAction}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                {lf(locale, FINDING as Record<string, unknown>, 'recommendedAction')}
              </p>
            </div>
          </div>

          {/* Photo Evidence */}
          <div className="card p-5">
            <h3 className="section-label mb-4">{t.findingDetail.photoEvidence}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FINDING.photos.map((_, i) => (
                <div key={i} style={{ aspectRatio: '1', background: 'var(--canvas)', border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                  className="group"
                >
                  <Camera size={20} style={{ color: 'var(--stone)' }} strokeWidth={1} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,29,31,0.35)', opacity: 0, transition: 'opacity .15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    className="group-hover:opacity-100">
                    <span className="mono" style={{ fontSize: 10, color: 'var(--paper)', letterSpacing: '.1em' }}>{t.findingDetail.photoCaption} {i + 1}</span>
                  </div>
                </div>
              ))}
              <div style={{ aspectRatio: '1', border: '2px dashed var(--rule)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 4 }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--rust)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
              >
                <Camera size={18} style={{ color: 'var(--stone)' }} strokeWidth={1} />
                <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{t.add}</span>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="card p-5">
            <h3 className="section-label mb-4">{t.findingDetail.activityTimeline}</h3>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="mono flex items-center justify-center flex-shrink-0"
                      style={{ width: 30, height: 30, background: 'var(--ink)', color: 'var(--paper)', fontSize: 11, letterSpacing: '.05em' }}>
                      {activity.avatar}
                    </div>
                    {i < activities.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: 'var(--rule)', marginTop: 4 }} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{activity.user}</span>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{(t.timeline as Record<string, string>)[activity.action]}</span>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--stone)', letterSpacing: '.06em' }}>{activity.time}</span>
                    </div>
                    {activity.detail && (
                      <p style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 5, background: 'var(--canvas)', padding: '8px 12px', lineHeight: 1.5 }}>
                        {activity.detail}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Add Comment */}
            <div className="mt-4 flex gap-2">
              <div className="mono flex items-center justify-center flex-shrink-0"
                style={{ width: 30, height: 30, background: 'var(--rust)', color: 'var(--paper)', fontSize: 11, letterSpacing: '.05em' }}>
                CW
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder={t.findingDetail.addComment + '...'}
                  className="form-input flex-1"
                />
                <button className="btn-primary" style={{ padding: '6px 10px' }}>
                  <Send size={13} />
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
              <div style={{ width: 28, height: 28, border: '1px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain size={14} style={{ color: 'var(--ink)' }} />
              </div>
              <h3 className="mono" style={{ fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {t.findingDetail.aiAnalysis}
              </h3>
            </div>
            <div className="space-y-3">
              {/* Analysis block */}
              <div style={{ padding: '10px 12px', border: '1px solid var(--flag)', borderLeft: '3px solid var(--flag)', background: 'rgba(168,62,43,0.05)' }}>
                <p className="text-xs leading-snug" style={{ color: 'var(--ink-2)', fontSize: 12 }}
                  dangerouslySetInnerHTML={{ __html: t.findingAI.analysis }}
                />
              </div>
              {/* Confidence */}
              <div>
                <p className="section-label mb-1.5">{t.findingDetail.confidence}</p>
                <div className="flex items-center gap-2">
                  <div style={{ flex: 1, height: 3, background: 'var(--rule-2)', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, width: '94%', background: 'var(--flag)' }} />
                  </div>
                  <span className="serif" style={{ fontSize: 18, lineHeight: 1, color: 'var(--flag)', fontVariationSettings: '"opsz" 36' }}>94%</span>
                </div>
              </div>
              {/* Related Findings */}
              <div>
                <p className="section-label mb-2">{t.findingDetail.relatedFindings}</p>
                <div className="space-y-1.5">
                  {[
                    { id: 'FD-2024-0088', text: t.findingAI.relatedFinding1 },
                    { id: 'FD-2024-0081', text: t.findingAI.relatedFinding2 },
                  ].map(rf => (
                    <Link key={rf.id} to={`/findings/${rf.id}`}
                      className="flex items-center gap-2"
                      style={{ fontSize: 12, color: 'var(--rust)', textDecoration: 'none', padding: '6px 10px', border: '1px solid var(--rule-2)' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--rust)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--rule-2)')}
                    >
                      <ArrowRight size={12} style={{ flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rf.id}: {rf.text}</span>
                    </Link>
                  ))}
                </div>
              </div>
              {/* Recommended Steps */}
              <div>
                <p className="section-label mb-2">{t.findingDetail.recommendedSteps}</p>
                <ol className="space-y-1.5">
                  {steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mono flex-shrink-0" style={{ fontSize: 10, color: 'var(--rust)', width: 16, marginTop: 2 }}>{i + 1}.</span>
                      <span style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Related Asset */}
          <div className="card p-5">
            <h3 className="section-label mb-3">{t.findingDetail.relatedAsset}</h3>
            <Link to="/assets/A003"
              className="block p-3"
              style={{ textDecoration: 'none', border: '1px solid var(--rule)', background: 'var(--canvas)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--rust)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
            >
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>
                {asset ? lf(locale, asset as Record<string, unknown>, 'name') : FINDING.asset}
              </p>
              <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                {zone ? lf(locale, zone as Record<string, unknown>, 'name') : FINDING.zone} · {plant ? lf(locale, plant as Record<string, unknown>, 'name') : FINDING.plant}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div style={{ flex: 1, height: 3, background: 'var(--rule-2)', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, width: '88%', background: 'var(--flag)' }} />
                </div>
                <span className="serif" style={{ fontSize: 16, lineHeight: 1, color: 'var(--flag)', fontVariationSettings: '"opsz" 36' }}>88</span>
              </div>
              <p className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3, letterSpacing: '.1em' }}>{t.findingDetail.riskScoreLabel}</p>
            </Link>
          </div>

          {/* Status Update */}
          <div className="card p-5">
            <h3 className="section-label mb-3">{t.findingDetail.statusUpdate}</h3>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="form-input mb-3"
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
