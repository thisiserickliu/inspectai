import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Play, Edit2, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { useI18n } from '../i18n'
import { lf } from '../utils/localize'
import StatusBadge from '../components/common/StatusBadge'
import SeverityBadge from '../components/common/SeverityBadge'
import { inspectionTasks, plants, zones, assets, inspectors } from '../data/mockData'

const ITEMS_PER_PAGE = 10

export default function InspectionTasks() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState('')
  const [filterPlant, setFilterPlant] = useState('')
  const [filterZone, setFilterZone] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterRisk, setFilterRisk] = useState('')
  const [filterInspector, setFilterInspector] = useState('')
  const [page, setPage] = useState(1)

  const filtered = inspectionTasks.filter(task => {
    if (search && !task.id.toLowerCase().includes(search.toLowerCase()) &&
        !task.asset.toLowerCase().includes(search.toLowerCase()) &&
        !task.assignedTo.toLowerCase().includes(search.toLowerCase())) return false
    if (filterPlant && task.plantId !== filterPlant) return false
    if (filterZone && task.zoneId !== filterZone) return false
    if (filterStatus && task.status !== filterStatus) return false
    if (filterRisk && task.riskLevel !== filterRisk) return false
    if (filterInspector && !task.assignedTo.toLowerCase().includes(filterInspector.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const typeLabel = (type: string) => {
    const map: Record<string, string> = {
      routine: t.tasks.types.routine,
      safety: t.tasks.types.safety,
      preventive: t.tasks.types.preventive,
      followUp: t.tasks.types.followUp,
      emergency: t.tasks.types.emergency,
      annual: t.tasks.types.annual,
    }
    return map[type] ?? type
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{t.tasks.title}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} {t.tasks.resultCount}</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t.newTask}
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{t.filter}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.tasks.searchPlaceholder}
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Plant */}
          <select
            value={filterPlant}
            onChange={e => { setFilterPlant(e.target.value); setPage(1) }}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">{t.tasks.allPlants}</option>
            {plants.map(p => <option key={p.id} value={p.id}>{lf(locale, p as Record<string, unknown>, 'name')}</option>)}
          </select>

          {/* Zone */}
          <select
            value={filterZone}
            onChange={e => { setFilterZone(e.target.value); setPage(1) }}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">{t.tasks.allZones}</option>
            {zones.filter(z => !filterPlant || z.plantId === filterPlant).map(z => (
              <option key={z.id} value={z.id}>{lf(locale, z as Record<string, unknown>, 'name')}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">{t.status.all}</option>
            {['scheduled', 'inProgress', 'submitted', 'overdue', 'closed'].map(s => (
              <option key={s} value={s}>{(t.status as Record<string, string>)[s]}</option>
            ))}
          </select>

          {/* Risk */}
          <select
            value={filterRisk}
            onChange={e => { setFilterRisk(e.target.value); setPage(1) }}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">{t.tasks.allRiskLevels}</option>
            {['low', 'medium', 'high', 'critical'].map(r => (
              <option key={r} value={r}>{(t.severity as Record<string, string>)[r]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                <th className="text-left px-5 py-3.5 font-medium">{t.tasks.taskId}</th>
                <th className="text-left px-3 py-3.5 font-medium">{t.plant}</th>
                <th className="text-left px-3 py-3.5 font-medium">{t.zone}</th>
                <th className="text-left px-3 py-3.5 font-medium">{t.asset}</th>
                <th className="text-left px-3 py-3.5 font-medium">{t.tasks.inspectionType}</th>
                <th className="text-left px-3 py-3.5 font-medium">{t.assignedTo}</th>
                <th className="text-left px-3 py-3.5 font-medium">{t.dueDate}</th>
                <th className="text-left px-3 py-3.5 font-medium">{t.riskLevel}</th>
                <th className="text-left px-3 py-3.5 font-medium">{t.tasks.progress}</th>
                <th className="text-left px-3 py-3.5 font-medium">{t.tasks.statusHeader}</th>
                <th className="text-left px-3 py-3.5 font-medium">{t.tasks.actionsHeader}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-12 text-gray-400 text-sm">
                    {t.empty.noTasks}<br />
                    <span className="text-xs mt-1 block">{t.empty.tryAdjusting}</span>
                  </td>
                </tr>
              ) : paginated.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-mono font-semibold text-blue-600">{task.id}</span>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-700 whitespace-nowrap">{lf(locale, plants.find(p => p.id === task.plantId) as Record<string, unknown> ?? { name: task.plant }, 'name')}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600 whitespace-nowrap">{lf(locale, zones.find(z => z.id === task.zoneId) as Record<string, unknown> ?? { name: task.zone }, 'name')}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-700 max-w-[160px]">
                    <div className="truncate">{lf(locale, assets.find(a => a.id === task.assetId) as Record<string, unknown> ?? { name: task.asset }, 'name')}</div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600 whitespace-nowrap">{typeLabel(task.type)}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600 whitespace-nowrap">{lf(locale, inspectors.find(i => i.name === task.assignedTo) as Record<string, unknown> ?? { name: task.assignedTo }, 'name')}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                    <span className={task.status === 'overdue' ? 'text-red-600 font-medium' : ''}>{task.dueDate}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <SeverityBadge severity={task.riskLevel} />
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            task.progress === 100 ? 'bg-green-500' :
                            task.progress > 50 ? 'bg-blue-500' :
                            task.progress > 0 ? 'bg-yellow-500' : 'bg-gray-300'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/tasks/${task.id}/execute`}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title={t.tasks.startInspection}
                      >
                        <Play className="w-3.5 h-3.5" />
                      </Link>
                      <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors" title={t.tasks.editTask}>
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {t.tasks.showingOf} {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} {t.tasks.of} {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    p === page ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
