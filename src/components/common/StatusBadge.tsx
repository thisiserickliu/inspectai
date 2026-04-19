import { useI18n } from '../../i18n'

type Status = 'scheduled' | 'inProgress' | 'submitted' | 'overdue' | 'closed' | 'open' | 'resolved' | 'pending' | 'operating' | 'maintenance' | 'offline'

const statusColors: Record<Status, string> = {
  scheduled:   'var(--steel)',
  inProgress:  'var(--ochre)',
  submitted:   'var(--moss)',
  overdue:     'var(--flag)',
  closed:      'var(--stone)',
  open:        'var(--rust)',
  resolved:    'var(--moss)',
  pending:     'var(--ochre)',
  operating:   'var(--moss)',
  maintenance: 'var(--ochre)',
  offline:     'var(--stone)',
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const { t } = useI18n()
  const key = status as Status
  const color = statusColors[key] ?? 'var(--stone)'
  const label = ((t.status as Record<string, string>)[status] ?? status).toUpperCase()

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
