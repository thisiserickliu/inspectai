import { useState } from 'react'
import {
  ChevronRight, ChevronDown, Factory, MapPin, Wrench, Cpu,
  Plus, Trash2, Save, Search, Edit2, X, Tag,
} from 'lucide-react'
import { useI18n, Locale } from '../i18n'
import { lf } from '../utils/localize'
import { plants, zones, assets, components, ruleProfiles, photoMappings } from '../data/mockData'
import SeverityBadge from '../components/common/SeverityBadge'

type TabKey = 'structure' | 'riskRules' | 'photoMapping'
type NodeType = 'plant' | 'zone' | 'asset' | 'component'
type CriticalityLevel = 'critical' | 'normal' | 'low'

interface SelectedNode {
  type: NodeType
  id: string
}

const CRITICALITY_COLORS: Record<CriticalityLevel, { color: string; border: string }> = {
  critical: { color: 'var(--flag)',  border: 'var(--flag)' },
  normal:   { color: 'var(--steel)', border: 'var(--steel)' },
  low:      { color: 'var(--stone)', border: 'var(--rule)' },
}

export default function Settings() {
  const { t, locale } = useI18n()
  const s = t.settings

  const [activeTab, setActiveTab] = useState<TabKey>('structure')
  const [expandedPlants, setExpandedPlants] = useState<Set<string>>(new Set(['P001']))
  const [expandedZones, setExpandedZones] = useState<Set<string>>(new Set(['Z002']))
  const [selected, setSelected] = useState<SelectedNode | null>({ type: 'asset', id: 'A003' })
  const [treeSearch, setTreeSearch] = useState('')
  const [selectedProfile, setSelectedProfile] = useState<string | null>('RP001')
  const [savedMsg, setSavedMsg] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const handleSave = () => {
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2000)
  }

  const togglePlant = (id: string) => {
    setExpandedPlants(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }
  const toggleZone = (id: string) => {
    setExpandedZones(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  const selectedPlant = selected?.type === 'plant' ? plants.find(p => p.id === selected.id) : null
  const selectedZone = selected?.type === 'zone' ? zones.find(z => z.id === selected.id) : null
  const selectedAsset = selected?.type === 'asset' ? assets.find(a => a.id === selected.id) : null
  const selectedComponent = selected?.type === 'component' ? components.find(c => c.id === selected.id) : null
  const assetComponents = selectedAsset ? components.filter(c => c.assetId === selectedAsset.id) : []
  const activeProfile = ruleProfiles.find(r => r.id === selectedProfile)

  const matchesSearch = (name: string) => !treeSearch || name.toLowerCase().includes(treeSearch.toLowerCase())

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'structure', label: s.tabs.structure },
    { key: 'riskRules', label: s.tabs.riskRules },
    { key: 'photoMapping', label: s.tabs.photoMapping },
  ]

  const treeBtnStyle = (isSelected: boolean) => ({
    display: 'flex', width: '100%', alignItems: 'center', gap: 8,
    padding: '7px 8px', textAlign: 'left' as const, cursor: 'pointer', fontSize: 13,
    background: isSelected ? 'var(--canvas)' : 'transparent',
    color: isSelected ? 'var(--ink)' : 'var(--ink-2)',
    border: isSelected ? '1px solid var(--rule)' : '1px solid transparent',
    borderLeft: isSelected ? '2px solid var(--rust)' : '2px solid transparent',
    fontFamily: 'inherit', transition: 'all .1s',
  })

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div>
        <h1 className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{s.title}</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0" style={{ borderBottom: '1px solid var(--rule)' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="mono"
            style={{
              padding: '10px 16px', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
              cursor: 'pointer', border: 'none', background: 'transparent', fontFamily: 'inherit',
              color: activeTab === tab.key ? 'var(--ink)' : 'var(--muted)',
              borderBottom: activeTab === tab.key ? '2px solid var(--rust)' : '2px solid transparent',
              marginBottom: -1, transition: 'all .15s', whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Structure Tab */}
      {activeTab === 'structure' && (
        <div className="flex flex-col md:flex-row gap-4" style={{ minHeight: 600 }}>
          {/* Tree Panel */}
          <div className="card md:w-72 lg:w-80 flex-shrink-0 flex flex-col overflow-hidden" style={{ maxHeight: '70vh' }}>
            <div className="p-3 space-y-2" style={{ borderBottom: '1px solid var(--rule)' }}>
              <div style={{ position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)' }} />
                <input
                  type="text"
                  value={treeSearch}
                  onChange={e => setTreeSearch(e.target.value)}
                  placeholder={s.tree.search}
                  className="form-input"
                  style={{ paddingLeft: 30 }}
                />
              </div>
              <button className="w-full btn-secondary flex items-center justify-center gap-1.5">
                <Plus size={12} />{s.tree.addPlant}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
              {plants.map(plant => {
                const plantName = lf(locale, plant as Record<string, unknown>, 'name')
                if (!matchesSearch(plantName) &&
                    !zones.filter(z => z.plantId === plant.id).some(z => matchesSearch(lf(locale, z as Record<string, unknown>, 'name')))) {
                  return null
                }
                const isExpanded = expandedPlants.has(plant.id)
                const plantZones = zones.filter(z => z.plantId === plant.id)
                const isSelected = selected?.type === 'plant' && selected.id === plant.id
                return (
                  <div key={plant.id}>
                    <button onClick={() => { togglePlant(plant.id); setSelected({ type: 'plant', id: plant.id }) }}
                      style={treeBtnStyle(isSelected)}>
                      {isExpanded ? <ChevronDown size={13} style={{ color: 'var(--muted)', flexShrink: 0 }} /> : <ChevronRight size={13} style={{ color: 'var(--muted)', flexShrink: 0 }} />}
                      <Factory size={13} style={{ color: 'var(--steel)', flexShrink: 0 }} />
                      <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{plantName}</span>
                    </button>
                    {isExpanded && plantZones.map(zone => {
                      const zoneName = lf(locale, zone as Record<string, unknown>, 'name')
                      if (treeSearch && !matchesSearch(zoneName)) return null
                      const isZoneExpanded = expandedZones.has(zone.id)
                      const zoneAssets = assets.filter(a => a.zoneId === zone.id)
                      const isZoneSelected = selected?.type === 'zone' && selected.id === zone.id
                      return (
                        <div key={zone.id} style={{ marginLeft: 20 }}>
                          <button onClick={() => { toggleZone(zone.id); setSelected({ type: 'zone', id: zone.id }) }}
                            style={treeBtnStyle(isZoneSelected)}>
                            {isZoneExpanded ? <ChevronDown size={11} style={{ color: 'var(--muted)', flexShrink: 0 }} /> : <ChevronRight size={11} style={{ color: 'var(--muted)', flexShrink: 0 }} />}
                            <MapPin size={11} style={{ color: 'var(--ochre)', flexShrink: 0 }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{zoneName}</span>
                          </button>
                          {isZoneExpanded && zoneAssets.map(asset => {
                            const assetName = lf(locale, asset as Record<string, unknown>, 'name')
                            if (treeSearch && !matchesSearch(assetName)) return null
                            const isAssetSelected = selected?.type === 'asset' && selected.id === asset.id
                            const assetComps = components.filter(c => c.assetId === asset.id)
                            return (
                              <div key={asset.id} style={{ marginLeft: 20 }}>
                                <button onClick={() => setSelected({ type: 'asset', id: asset.id })}
                                  style={treeBtnStyle(isAssetSelected)}>
                                  <span style={{ width: 11, flexShrink: 0 }} />
                                  <Wrench size={11} style={{ color: 'var(--rust)', flexShrink: 0 }} />
                                  <span style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{assetName}</span>
                                </button>
                                {isAssetSelected && assetComps.map(comp => {
                                  const compName = lf(locale, comp as Record<string, unknown>, 'name')
                                  const isCompSelected = selected?.type === 'component' && selected.id === comp.id
                                  return (
                                    <button
                                      key={comp.id}
                                      onClick={e => { e.stopPropagation(); setSelected({ type: 'component', id: comp.id }) }}
                                      style={{ ...treeBtnStyle(isCompSelected), marginLeft: 20 }}
                                    >
                                      <span style={{ width: 11, flexShrink: 0 }} />
                                      <Cpu size={11} style={{ color: 'var(--stone)', flexShrink: 0 }} />
                                      <span style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{compName}</span>
                                    </button>
                                  )
                                })}
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="card flex-1 flex flex-col overflow-hidden">
            {!selected ? (
              <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--stone)', fontSize: 13 }}>{s.noSelection}</div>
            ) : (
              <>
                {/* Panel Header */}
                <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--rule)' }}>
                  <div className="flex items-center gap-2">
                    {selected.type === 'plant'     && <Factory size={14} style={{ color: 'var(--steel)' }} />}
                    {selected.type === 'zone'      && <MapPin size={14} style={{ color: 'var(--ochre)' }} />}
                    {selected.type === 'asset'     && <Wrench size={14} style={{ color: 'var(--rust)' }} />}
                    {selected.type === 'component' && <Cpu size={14} style={{ color: 'var(--stone)' }} />}
                    <span className="section-label">{s.nodeType[selected.type]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {savedMsg && (
                      <span className="mono" style={{ fontSize: 10.5, color: 'var(--moss)', letterSpacing: '.1em' }}>{s.saved}</span>
                    )}
                    <button onClick={handleSave} className="btn-primary flex items-center gap-1.5">
                      <Save size={12} />{s.saveNode}
                    </button>
                    <button className="btn-secondary flex items-center gap-1.5" style={{ color: 'var(--flag)', borderColor: 'var(--flag)' }}>
                      <Trash2 size={12} />{s.deleteNode}
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  {selectedPlant && <PlantForm plant={selectedPlant} locale={locale} t={s} />}
                  {selectedZone && <ZoneForm zone={selectedZone} locale={locale} t={s} />}
                  {selectedAsset && (
                    <>
                      <AssetForm asset={selectedAsset} locale={locale} t={s} />
                      {/* Component sub-table */}
                      <div>
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                          <h3 className="section-label">{s.nodeType.component}</h3>
                          <div className="flex items-center gap-2">
                            <BatchCriticalityButton t={s} />
                            <button className="btn-secondary flex items-center gap-1">
                              <Plus size={11} />{s.addComponent}
                            </button>
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="nordic w-full">
                            <thead>
                              <tr>
                                <th style={{ textAlign: 'left', padding: '8px 12px' }}>{s.componentTable.name}</th>
                                <th style={{ textAlign: 'left', padding: '8px 8px' }}>{s.componentTable.type}</th>
                                <th style={{ textAlign: 'left', padding: '8px 8px' }}>{s.componentTable.criticality}</th>
                                <th style={{ textAlign: 'left', padding: '8px 8px' }}>{s.componentTable.ruleProfile}</th>
                                <th style={{ textAlign: 'left', padding: '8px 8px' }}>{s.componentTable.condition}</th>
                                <th style={{ padding: '8px 8px' }} />
                              </tr>
                            </thead>
                            <tbody>
                              {assetComponents.map(comp => {
                                const profile = ruleProfiles.find(r => r.id === comp.ruleProfileId)
                                const crit = (comp.criticality ?? 'normal') as CriticalityLevel
                                const { color, border } = CRITICALITY_COLORS[crit]
                                return (
                                  <tr key={comp.id}>
                                    <td style={{ padding: '10px 12px', fontWeight: 500, color: 'var(--ink)' }}>
                                      {lf(locale, comp as Record<string, unknown>, 'name')}
                                    </td>
                                    <td style={{ padding: '10px 8px', color: 'var(--muted)' }}>
                                      {lf(locale, comp as Record<string, unknown>, 'type')}
                                    </td>
                                    <td style={{ padding: '10px 8px' }}>
                                      <span className="badge" style={{ color, borderColor: border }}>
                                        {s.criticality[crit]}
                                      </span>
                                    </td>
                                    <td style={{ padding: '10px 8px', color: 'var(--muted)' }}>
                                      {profile ? lf(locale, profile as Record<string, unknown>, 'name') : '—'}
                                    </td>
                                    <td style={{ padding: '10px 8px', color: 'var(--muted)' }}>{comp.condition}</td>
                                    <td style={{ padding: '10px 8px' }}>
                                      <button onClick={() => setSelected({ type: 'component', id: comp.id })}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
                                        <Edit2 size={13} />
                                      </button>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedComponent && (
                    <ComponentForm component={selectedComponent} locale={locale} t={s} tagInput={tagInput} setTagInput={setTagInput} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Risk & Rules Tab */}
      {activeTab === 'riskRules' && (
        <div className="flex flex-col md:flex-row gap-4" style={{ minHeight: 600 }}>
          {/* Profile List */}
          <div className="card md:w-72 lg:w-80 flex-shrink-0 flex flex-col overflow-hidden" style={{ maxHeight: '70vh' }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--rule)' }}>
              <span className="section-label">{s.ruleProfiles.title}</span>
              <button className="btn-secondary flex items-center gap-1">
                <Plus size={11} />{s.ruleProfiles.addProfile}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {ruleProfiles.length === 0 ? (
                <p style={{ fontSize: 12, color: 'var(--stone)', textAlign: 'center', padding: 24 }}>{s.ruleProfiles.noProfiles}</p>
              ) : ruleProfiles.map(profile => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile.id)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '10px 12px', background: 'transparent',
                    border: selectedProfile === profile.id ? '1px solid var(--rust)' : '1px solid transparent',
                    borderLeft: selectedProfile === profile.id ? '2px solid var(--rust)' : '2px solid transparent',
                    cursor: 'pointer', transition: 'all .1s', fontFamily: 'inherit',
                    backgroundColor: selectedProfile === profile.id ? 'var(--canvas)' : 'transparent',
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{lf(locale, profile as Record<string, unknown>, 'name')}</p>
                  <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {lf(locale, profile as Record<string, unknown>, 'description')}
                  </p>
                  <p className="mono" style={{ fontSize: 10, color: 'var(--stone)', marginTop: 4, letterSpacing: '.08em' }}>
                    {profile.rules.length} {s.ruleProfiles.rules}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Detail */}
          <div className="card flex-1 flex flex-col overflow-hidden">
            {!activeProfile ? (
              <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--stone)', fontSize: 13 }}>{s.noSelection}</div>
            ) : (
              <>
                <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--rule)' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{lf(locale, activeProfile as Record<string, unknown>, 'name')}</p>
                    <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{lf(locale, activeProfile as Record<string, unknown>, 'description')}</p>
                  </div>
                  <button onClick={handleSave} className="btn-primary flex items-center gap-1.5">
                    <Save size={12} />{s.saveNode}
                  </button>
                </div>
                <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label={s.ruleProfiles.profileName} required>
                      <input type="text" defaultValue={activeProfile.name} className="form-input" />
                    </FormField>
                    <FormField label={s.ruleProfiles.description}>
                      <input type="text" defaultValue={activeProfile.description} className="form-input" />
                    </FormField>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <h3 className="section-label">{s.ruleProfiles.rules}</h3>
                      <button className="btn-secondary flex items-center gap-1">
                        <Plus size={11} />{s.ruleProfiles.addRule}
                      </button>
                    </div>
                    {activeProfile.rules.length === 0 ? (
                      <p style={{ fontSize: 12, color: 'var(--stone)', textAlign: 'center', padding: '16px', border: '1px dashed var(--rule)' }}>
                        {s.ruleProfiles.noRules}
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="nordic w-full">
                          <thead>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '8px 12px' }}>{s.ruleProfiles.defect}</th>
                              <th style={{ textAlign: 'left', padding: '8px 8px' }}>{s.ruleProfiles.severity}</th>
                              <th style={{ padding: '8px 8px', width: 32 }} />
                            </tr>
                          </thead>
                          <tbody>
                            {activeProfile.rules.map(rule => (
                              <tr key={rule.id}>
                                <td style={{ padding: '10px 12px', color: 'var(--ink-2)' }}>
                                  {lf(locale, rule as Record<string, unknown>, 'defect')}
                                </td>
                                <td style={{ padding: '10px 8px' }}>
                                  <SeverityBadge severity={rule.severity} />
                                </td>
                                <td style={{ padding: '10px 8px' }}>
                                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--stone)' }}>
                                    <X size={13} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Photo Mapping Tab */}
      {activeTab === 'photoMapping' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--rule)' }}>
            <span className="section-label">{s.photoMapping.title}</span>
            <button className="btn-secondary flex items-center gap-1.5">
              <Plus size={12} />{s.photoMapping.addMapping}
            </button>
          </div>
          {photoMappings.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--stone)', textAlign: 'center', padding: 48 }}>{s.photoMapping.noMappings}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="nordic w-full">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 16px' }}>{s.photoMapping.sourceType}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{s.photoMapping.deviceId}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{s.photoMapping.cameraId}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{s.photoMapping.defaultComponent}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px' }}>{s.photoMapping.remarks}</th>
                    <th style={{ padding: '10px 12px', width: 64 }} />
                  </tr>
                </thead>
                <tbody>
                  {photoMappings.map(mapping => {
                    const comp = components.find(c => c.id === mapping.defaultComponentId)
                    return (
                      <tr key={mapping.id}>
                        <td style={{ padding: '12px 16px', color: 'var(--ink-2)' }}>{mapping.sourceType}</td>
                        <td style={{ padding: '12px', color: 'var(--muted)' }} className="mono">{mapping.deviceId}</td>
                        <td style={{ padding: '12px', color: 'var(--muted)' }} className="mono">{mapping.cameraId}</td>
                        <td style={{ padding: '12px', color: 'var(--ink-2)' }}>
                          {comp ? lf(locale, comp as Record<string, unknown>, 'name') : '—'}
                        </td>
                        <td style={{ padding: '12px', color: 'var(--stone)', fontSize: 12 }}>{mapping.remarks}</td>
                        <td style={{ padding: '12px' }}>
                          <div className="flex items-center gap-2">
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
                              <Edit2 size={13} />
                            </button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--stone)' }}>
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="section-label" style={{ display: 'block', marginBottom: 6 }}>
        {label}{required && <span style={{ color: 'var(--flag)', marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  )
}

function PlantForm({ plant, locale, t }: { plant: typeof plants[0]; locale: Locale; t: ReturnType<typeof useI18n>['t']['settings'] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label={t.form.name} required>
          <input type="text" defaultValue={lf(locale, plant as Record<string, unknown>, 'name')} className="form-input" />
        </FormField>
        <FormField label={t.form.code}>
          <input type="text" defaultValue={plant.id} className="form-input" />
        </FormField>
      </div>
      <FormField label={t.form.location}>
        <input type="text" defaultValue={plant.location} className="form-input" />
      </FormField>
      <FormField label={t.form.description}>
        <textarea rows={3} placeholder={t.form.descriptionPlaceholder} className="form-input resize-none" />
      </FormField>
    </div>
  )
}

function ZoneForm({ zone, locale, t }: { zone: typeof zones[0]; locale: Locale; t: ReturnType<typeof useI18n>['t']['settings'] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label={t.form.name} required>
          <input type="text" defaultValue={lf(locale, zone as Record<string, unknown>, 'name')} className="form-input" />
        </FormField>
        <FormField label={t.form.code}>
          <input type="text" defaultValue={zone.id} className="form-input" />
        </FormField>
      </div>
      <FormField label={t.form.location}>
        <input type="text" placeholder={t.form.locationPlaceholder} className="form-input" />
      </FormField>
      <FormField label={t.form.description}>
        <textarea rows={3} placeholder={t.form.descriptionPlaceholder} className="form-input resize-none" />
      </FormField>
    </div>
  )
}

function AssetForm({ asset, locale, t }: { asset: typeof assets[0]; locale: Locale; t: ReturnType<typeof useI18n>['t']['settings'] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label={t.form.name} required>
          <input type="text" defaultValue={lf(locale, asset as Record<string, unknown>, 'name')} className="form-input" />
        </FormField>
        <FormField label={t.form.code}>
          <input type="text" defaultValue={asset.id} className="form-input" />
        </FormField>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label={t.form.location}>
          <input type="text" placeholder={t.form.locationPlaceholder} className="form-input" />
        </FormField>
        <FormField label={t.form.owner}>
          <input type="text" defaultValue={asset.owner} className="form-input" />
        </FormField>
      </div>
      <FormField label={t.form.description}>
        <textarea rows={2} placeholder={t.form.descriptionPlaceholder} className="form-input resize-none" />
      </FormField>
    </div>
  )
}

type CritLvl = 'critical' | 'normal' | 'low'

function ComponentForm({
  component, locale, t, tagInput, setTagInput
}: {
  component: typeof components[0]; locale: Locale
  t: ReturnType<typeof useI18n>['t']['settings']
  tagInput: string; setTagInput: (v: string) => void
}) {
  const [tags, setTags] = useState<string[]>(component.tags ?? [])
  const [criticality, setCriticality] = useState<CritLvl>((component.criticality ?? 'normal') as CritLvl)
  const [profileId, setProfileId] = useState(component.ruleProfileId ?? '')

  const addTag = () => {
    const v = tagInput.trim()
    if (v && !tags.includes(v)) setTags(prev => [...prev, v])
    setTagInput('')
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label={t.form.name} required>
          <input type="text" defaultValue={lf(locale, component as Record<string, unknown>, 'name')} className="form-input" />
        </FormField>
        <FormField label={t.form.code}>
          <input type="text" defaultValue={component.id} className="form-input" />
        </FormField>
      </div>

      <FormField label={t.form.criticality} required>
        <div className="flex gap-2">
          {(['critical', 'normal', 'low'] as CritLvl[]).map(lvl => {
            const { color, border } = CRITICALITY_COLORS[lvl]
            const active = criticality === lvl
            return (
              <button
                key={lvl}
                onClick={() => setCriticality(lvl)}
                className="flex-1 mono"
                style={{
                  padding: '8px', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
                  border: `1px solid ${active ? border : 'var(--rule)'}`,
                  color: active ? 'var(--paper)' : 'var(--muted)',
                  background: active ? color : 'transparent',
                  cursor: 'pointer', transition: 'all .15s', fontFamily: 'inherit',
                }}
              >
                {t.criticality[lvl]}
              </button>
            )
          })}
        </div>
      </FormField>

      <FormField label={t.form.ruleProfile}>
        <select value={profileId} onChange={e => setProfileId(e.target.value)} className="form-input">
          <option value="">{t.form.selectProfile}</option>
          {ruleProfiles.map(rp => (
            <option key={rp.id} value={rp.id}>{lf(locale, rp as Record<string, unknown>, 'name')}</option>
          ))}
        </select>
      </FormField>

      <FormField label={t.form.tags}>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map(tag => (
            <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--canvas)', border: '1px solid var(--rule)', padding: '2px 8px', fontSize: 12, color: 'var(--ink-2)' }}>
              <Tag size={10} style={{ color: 'var(--muted)' }} />
              {tag}
              <button onClick={() => setTags(prev => prev.filter(t => t !== tag))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--stone)', display: 'flex', padding: 0 }}>
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text" value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder={t.form.tagsPlaceholder}
            className="form-input flex-1"
          />
          <button onClick={addTag} className="btn-secondary" style={{ padding: '8px 12px' }}>
            <Plus size={12} />
          </button>
        </div>
      </FormField>

      <FormField label={t.form.description}>
        <textarea rows={2} placeholder={t.form.descriptionPlaceholder} className="form-input resize-none" />
      </FormField>
    </div>
  )
}

function BatchCriticalityButton({ t }: { t: ReturnType<typeof useI18n>['t']['settings'] }) {
  return (
    <button className="btn-secondary">{t.componentTable.batchCriticality}</button>
  )
}
