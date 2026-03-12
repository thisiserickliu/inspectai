import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { ReactNode } from 'react'

interface KPICardProps {
  label: string
  value: number | string
  icon: ReactNode
  iconBg?: string
  trend?: number
  trendLabel?: string
  valueColor?: string
}

export default function KPICard({ label, value, icon, iconBg = 'bg-blue-100', trend, trendLabel, valueColor = 'text-gray-900' }: KPICardProps) {
  const isPositive = trend !== undefined && trend > 0
  const isNegative = trend !== undefined && trend < 0
  const isNeutral = trend === 0

  return (
    <div className="card p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className={`text-3xl font-bold ${valueColor}`}>{value}</span>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? 'text-red-600' : isNegative ? 'text-green-600' : 'text-gray-500'
          }`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : isNegative ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
            <span>{isPositive ? '+' : ''}{trend}</span>
          </div>
        )}
      </div>
      {trendLabel && (
        <p className="text-xs text-gray-400">{trendLabel}</p>
      )}
    </div>
  )
}
