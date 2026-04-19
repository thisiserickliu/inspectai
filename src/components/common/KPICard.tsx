import { ReactNode } from 'react'

interface KPICardProps {
  label: string
  value: number | string
  icon?: ReactNode
  iconBg?: string
  trend?: number
  trendLabel?: string
  valueColor?: string
  idx?: string
  suffix?: string
  sparkBars?: number[]
}

const defaultBars = [40, 45, 38, 52, 48, 60, 55, 68, 62, 70, 65, 80]

export default function KPICard({
  label,
  value,
  trend,
  trendLabel,
  idx = '—',
  suffix,
  sparkBars = defaultBars,
}: KPICardProps) {
  const isUp = trend !== undefined && trend > 0
  const isDn = trend !== undefined && trend < 0

  return (
    <div className="card" style={{ padding: '18px 20px 16px', position: 'relative' }}>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--muted)' }}>
          K{idx}
        </span>
        <span className="mono" style={{ fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>

      {/* Dashed separator */}
      <div className="rule-dash" style={{ marginTop: 10, marginBottom: 14 }} />

      {/* Value + trend */}
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <span className="kpi-num" style={{ color: 'var(--ink)' }}>{value}</span>
          {suffix && (
            <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>{suffix}</span>
          )}
        </div>
        {trend !== undefined && (
          <div style={{ textAlign: 'right' }}>
            <div className="flex items-center gap-1 justify-end mono" style={{
              fontSize: 12, letterSpacing: '.02em',
              color: isUp ? 'var(--flag)' : isDn ? 'var(--moss)' : 'var(--muted)',
            }}>
              <span>{isUp ? '↑' : isDn ? '↓' : '—'}</span>
              <span>{isUp ? '+' : ''}{trend}</span>
            </div>
            {trendLabel && (
              <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 2 }}>
                {trendLabel}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sparkline bars */}
      <div className="flex items-end gap-0.5 mt-4" style={{ height: 28 }}>
        {sparkBars.map((h, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${h}%`,
            background: i === sparkBars.length - 1 ? 'var(--ink)' : 'var(--rule)',
          }} />
        ))}
      </div>
    </div>
  )
}
