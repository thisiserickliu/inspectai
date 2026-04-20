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

  const progressColor = (p: number) =>
    p === 100 ? 'var(--moss)' : p > 50 ? 'var(--steel)' : p > 0 ? 'var(--ochre)' : 'var(--rule)'

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{t.tasks.title}</h2>
          <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, letterSpacing: '.1em' }}>{filtered.length} {t.tasks.resultCount}</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={12} />
          {t.newTask}
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal size={14} style={{ color: 'var(--muted)' }} />
          <span className="section-label">{t.filter}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)' }} />
            <input
              type="text"
              placeholder={t.tasks.searchPlaceholder}
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="form-input"
              style={{ paddingLeft: 32 }}
            />
          </div>

          {/* Plant */}
          <select
            value={filterPlant}
            onChange={e => { setFilterPlant(e.target.value); setPage(1) }}
            className="form-input"
          >
            <option value="">{t.tasks.allPlants}</option>
            {plants.map(p => <option key={p.id} value={p.id}>{lf(locale, p as Record<string, unknown>, 'name')}</option>)}
          </select>

          {/* Zone */}
          <select
            value={filterZone}
            onChange={e => { setFilterZone(e.target.value); setPage(1) }}
            className="form-input"
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
            className="form-input"
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
            className="form-input"
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
          <table className="nordic w-full">
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 20px' }}>{t.tasks.taskId}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.plant}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.zone}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.asset}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.tasks.inspectionType}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.assignedTo}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.dueDate}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.riskLevel}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.tasks.progress}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.tasks.statusHeader}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px' }}>{t.tasks.actionsHeader}</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--stone)', fontSize: 13 }}>
                    {t.empty.noTasks}<br />
                    <span style={{ fontSize: 11, marginTop: 4, display: 'block', color: 'var(--muted)' }}>{t.empty.tryAdjusting}</span>
                  </td>
                </tr>
              ) : paginated.map(task => (
                <tr key={task.id} className="group">
                  <td style={{ padding: '12px 20px' }}>
                    <Link to={`/tasks/${task.id}/execute`}
                      className="mono"
                      style={{ fontSize: 12, color: 'var(--rust)', letterSpacing: '.02em', textDecoration: 'none', borderBottom: '1px dashed var(--rule)' }}>
                      {task.id}
                    </Link>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--ink-2)', fontSize: 13, whiteSpace: 'nowrap' }}>
                    {lf(locale, plants.find(p => p.id === task.plantId) as Record<string, unknown> ?? { name: task.plant }, 'name')}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted)', fontSize: 13, whiteSpace: 'nowrap' }}>
                    {lf(locale, zones.find(z => z.id === task.zoneId) as Record<string, unknown> ?? { name: task.zone }, 'name')}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--ink-2)', fontSize: 13, maxWidth: 160 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lf(locale, assets.find(a => a.id === task.assetId) as Record<string, unknown> ?? { name: task.asset }, 'name')}
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted)', fontSize: 13, whiteSpace: 'nowrap' }}>{typeLabel(task.type)}</td>
                  <td style={{ padding: '12px', color: 'var(--muted)', fontSize: 13, whiteSpace: 'nowrap' }}>
                    {lf(locale, inspectors.find(i => i.name === task.assignedTo) as Record<string, unknown> ?? { name: task.assignedTo }, 'name')}
                  </td>
                  <td style={{ padding: '12px', fontSize: 13, whiteSpace: 'nowrap' }}>
                    <span className="mono" style={{ fontSize: 11.5, color: task.status === 'overdue' ? 'var(--flag)' : 'var(--muted)', letterSpacing: '.04em' }}>
                      {task.dueDate}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <SeverityBadge severity={task.riskLevel} />
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 56, height: 3, background: 'var(--rule-2)', position: 'relative', flexShrink: 0 }}>
                        <div style={{ position: 'absolute', inset: 0, width: `${task.progress}%`, background: progressColor(task.progress) }} />
                      </div>
                      <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '.04em' }}>{task.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <StatusBadge status={task.status} />
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/tasks/${task.id}/execute`}
                        className="btn-secondary"
                        style={{ padding: '4px 8px' }}
                        title={t.tasks.startInspection}
                      >
                        <Play size={12} />
                      </Link>
                      <button
                        className="btn-secondary"
                        style={{ padding: '4px 8px' }}
                        title={t.tasks.editTask}
                      >
                        <Edit2 size={12} />
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
          <div className="px-5 py-3" style={{ borderTop: '1px solid var(--rule)' }}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.08em' }}>
                {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} / {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-secondary"
                  style={{ padding: '4px 8px', opacity: page === 1 ? 0.3 : 1 }}
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="mono"
                    style={{
                      width: 28, height: 28, fontSize: 11, letterSpacing: '.06em',
                      border: '1px solid var(--rule)', cursor: 'pointer',
                      background: p === page ? 'var(--ink)' : 'transparent',
                      color: p === page ? 'var(--paper)' : 'var(--ink-2)',
                      transition: 'all .15s',
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn-secondary"
                  style={{ padding: '4px 8px', opacity: page === totalPages ? 0.3 : 1 }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
