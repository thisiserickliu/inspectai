import { useI18n } from '../../i18n'

type Severity = 'low' | 'medium' | 'high' | 'critical'

const severityStyles: Record<Severity, string> = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
}

interface SeverityBadgeProps {
  severity: string
  className?: string
}

export default function SeverityBadge({ severity, className = '' }: SeverityBadgeProps) {
  const { t } = useI18n()
  const key = severity as Severity
  const style = severityStyles[key] ?? 'bg-gray-100 text-gray-600'
  const label = (t.severity as Record<string, string>)[severity] ?? severity

  return (
    <span className={`badge ${style} ${className}`}>
      {label}
    </span>
  )
}
