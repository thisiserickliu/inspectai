import { useI18n } from '../../i18n'

type Status = 'scheduled' | 'inProgress' | 'submitted' | 'overdue' | 'closed' | 'open' | 'resolved' | 'pending' | 'operating' | 'maintenance' | 'offline'

const statusStyles: Record<Status, string> = {
  scheduled: 'bg-blue-100 text-blue-800',
  inProgress: 'bg-yellow-100 text-yellow-800',
  submitted: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
  closed: 'bg-gray-100 text-gray-600',
  open: 'bg-orange-100 text-orange-800',
  resolved: 'bg-green-100 text-green-800',
  pending: 'bg-purple-100 text-purple-800',
  operating: 'bg-green-100 text-green-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  offline: 'bg-gray-100 text-gray-600',
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const { t } = useI18n()
  const key = status as Status
  const style = statusStyles[key] ?? 'bg-gray-100 text-gray-600'
  const label = (t.status as Record<string, string>)[status] ?? status

  return (
    <span className={`badge ${style} ${className}`}>
      {label}
    </span>
  )
}
