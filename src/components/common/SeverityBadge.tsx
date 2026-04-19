import { useI18n } from '../../i18n'

type Severity = 'low' | 'medium' | 'high' | 'critical'

const severityColors: Record<Severity, string> = {
  low:      'var(--moss)',
  medium:   'var(--ochre)',
  high:     'var(--rust)',
  critical: 'var(--flag)',
}

interface SeverityBadgeProps {
  severity: string
  className?: string
}

export default function SeverityBadge({ severity, className = '' }: SeverityBadgeProps) {
  const { t } = useI18n()
  const key = severity as Severity
  const color = severityColors[key] ?? 'var(--stone)'
  const label = ((t.severity as Record<string, string>)[severity] ?? severity).toUpperCase()

  return (
    <span
      className={`badge ${className}`}
      style={{ color, borderColor: color }}
    >
      <span className="sq" style={{ background: color }} />
      {label}
    </span>
  )
}
