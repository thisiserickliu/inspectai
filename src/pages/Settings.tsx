import { useState } from 'react'
import {
  ChevronRight, ChevronDown, Factory, MapPin, Wrench, Cpu,
  Plus, Trash2, Save, Search, Edit2, X, Tag,
} from 'lucide-react'
import { useI18n, Locale } from '../i18n'
import { lf } from '../utils/localize'
import { plants, zones, assets, components, ruleProfiles, photoMappings } from '../data/mockData'

type TabKey = 'structure' | 'riskRules' | 'photoMapping'
type NodeType = 'plant' | 'zone' | 'asset' | 'component'
type CriticalityLevel = 'critical' | 'normal' | 'low'

interface SelectedNode {
  type: NodeType
  id: string
}

const CRITICALITY_COLORS: Record<CriticalityLevel, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  normal: 'bg-blue-100 text-blue-700 border-blue-200',
  low: 'bg-gray-100 text-gray-600 border-gray-200',
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
    setExpandedPlants(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleZone = (id: string) => {
    setExpandedZones(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // Derived data
  const selectedPlant = selected?.type === 'plant' ? plants.find(p => p.id === selected.id) : null
  const selectedZone = selected?.type === 'zone' ? zones.find(z => z.id === selected.id) : null
  const selectedAsset = selected?.type === 'asset' ? assets.find(a => a.id === selected.id) : null
  const selectedComponent = selected?.type === 'component' ? components.find(c => c.id === selected.id) : null
  const assetComponents = selectedAsset ? components.filter(c => c.assetId === selectedAsset.id) : []
  const activeProfile = ruleProfiles.find(r => r.id === selectedProfile)

  const matchesSearch = (name: string) =>
    !treeSearch || name.toLowerCase().includes(treeSearch.toLowerCase())

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'structure', label: s.tabs.structure },
    { key: 'riskRules', label: s.tabs.riskRules },
    { key: 'photoMapping', label: s.tabs.photoMapping },
  ]

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{s.title}</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Structure Tab */}
      {activeTab === 'structure' && (
        <div className="grid grid-cols-12 gap-4" style={{ minHeight: '600px' }}>
          {/* Tree Panel */}
          <div className="col-span-4 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-100 space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  value={treeSearch}
                  onChange={e => setTreeSearch(e.target.value)}
                  placeholder={s.tree.search}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                <Plus className="w-3.5 h-3.5" />
                {s.tree.addPlant}
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
                    <button
                      onClick={() => { togglePlant(plant.id); setSelected({ type: 'plant', id: plant.id }) }}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors text-sm ${
                        isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                      <Factory className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="font-medium truncate">{plantName}</span>
                    </button>
                    {isExpanded && plantZones.map(zone => {
                      const zoneName = lf(locale, zone as Record<string, unknown>, 'name')
                      if (treeSearch && !matchesSearch(zoneName)) return null
                      const isZoneExpanded = expandedZones.has(zone.id)
                      const zoneAssets = assets.filter(a => a.zoneId === zone.id)
                      const isZoneSelected = selected?.type === 'zone' && selected.id === zone.id
                      return (
                        <div key={zone.id} className="ml-5">
                          <button
                            onClick={() => { toggleZone(zone.id); setSelected({ type: 'zone', id: zone.id }) }}
                            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors text-sm ${
                              isZoneSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            {isZoneExpanded ? <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" /> : <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />}
                            <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                            <span className="truncate">{zoneName}</span>
                          </button>
                          {isZoneExpanded && zoneAssets.map(asset => {
                            const assetName = lf(locale, asset as Record<string, unknown>, 'name')
                            if (treeSearch && !matchesSearch(assetName)) return null
                            const isAssetSelected = selected?.type === 'asset' && selected.id === asset.id
                            const assetComps = components.filter(c => c.assetId === asset.id)
                            return (
                              <div key={asset.id} className="ml-5">
                                <button
                                  onClick={() => setSelected({ type: 'asset', id: asset.id })}
                                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors text-sm ${
                                    isAssetSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-600'
                                  }`}
                                >
                                  <span className="w-3 shrink-0" />
                                  <Wrench className="w-3 h-3 text-orange-400 shrink-0" />
                                  <span className="truncate text-xs">{assetName}</span>
                                </button>
                                {isAssetSelected && assetComps.map(comp => {
                                  const compName = lf(locale, comp as Record<string, unknown>, 'name')
                                  const isCompSelected = selected?.type === 'component' && selected.id === comp.id
                                  return (
                                    <button
                                      key={comp.id}
                                      onClick={e => { e.stopPropagation(); setSelected({ type: 'component', id: comp.id }) }}
                                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors ml-5 ${
                                        isCompSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-500'
                                      }`}
                                    >
                                      <span className="w-3 shrink-0" />
                                      <Cpu className="w-3 h-3 text-purple-400 shrink-0" />
                                      <span className="text-xs truncate">{compName}</span>
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
          <div className="col-span-8 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
            {!selected ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">{s.noSelection}</div>
            ) : (
              <>
                {/* Panel Header */}
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selected.type === 'plant' && <Factory className="w-4 h-4 text-slate-500" />}
                    {selected.type === 'zone' && <MapPin className="w-4 h-4 text-blue-500" />}
                    {selected.type === 'asset' && <Wrench className="w-4 h-4 text-orange-500" />}
                    {selected.type === 'component' && <Cpu className="w-4 h-4 text-purple-500" />}
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {s.nodeType[selected.type]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {savedMsg && (
                      <span className="text-xs text-green-600 font-medium">{s.saved}</span>
                    )}
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {s.saveNode}
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                      {s.deleteNode}
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  {/* Plant Detail */}
                  {selectedPlant && (
                    <PlantForm plant={selectedPlant} locale={locale} t={s} />
                  )}

                  {/* Zone Detail */}
                  {selectedZone && (
                    <ZoneForm zone={selectedZone} locale={locale} t={s} />
                  )}

                  {/* Asset Detail */}
                  {selectedAsset && (
                    <>
                      <AssetForm asset={selectedAsset} locale={locale} t={s} />
                      {/* Component sub-table */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-800">{s.nodeType.component}</h3>
                          <div className="flex items-center gap-2">
                            <BatchCriticalityButton t={s} />
                            <button className="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                              <Plus className="w-3 h-3" />
                              {s.addComponent}
                            </button>
                          </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-3 py-2 font-medium text-gray-600">{s.componentTable.name}</th>
                                <th className="text-left px-3 py-2 font-medium text-gray-600">{s.componentTable.type}</th>
                                <th className="text-left px-3 py-2 font-medium text-gray-600">{s.componentTable.criticality}</th>
                                <th className="text-left px-3 py-2 font-medium text-gray-600">{s.componentTable.ruleProfile}</th>
                                <th className="text-left px-3 py-2 font-medium text-gray-600">{s.componentTable.condition}</th>
                                <th className="px-3 py-2"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {assetComponents.map((comp, i) => {
                                const profile = ruleProfiles.find(r => r.id === comp.ruleProfileId)
                                const crit = (comp.criticality ?? 'normal') as CriticalityLevel
                                return (
                                  <tr key={comp.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                    <td className="px-3 py-2 font-medium text-gray-900">{lf(locale, comp as Record<string, unknown>, 'name')}</td>
                                    <td className="px-3 py-2 text-gray-600">{lf(locale, comp as Record<string, unknown>, 'type')}</td>
                                    <td className="px-3 py-2">
                                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${CRITICALITY_COLORS[crit]}`}>
                                        {s.criticality[crit]}
                                      </span>
                                    </td>
                                    <td className="px-3 py-2 text-gray-600">
                                      {profile ? lf(locale, profile as Record<string, unknown>, 'name') : '—'}
                                    </td>
                                    <td className="px-3 py-2 text-gray-600">{comp.condition}</td>
                                    <td className="px-3 py-2">
                                      <button
                                        onClick={() => setSelected({ type: 'component', id: comp.id })}
                                        className="text-blue-500 hover:text-blue-700 transition-colors"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
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

                  {/* Component Detail */}
                  {selectedComponent && (
                    <ComponentForm
                      component={selectedComponent}
                      locale={locale}
                      t={s}
                      tagInput={tagInput}
                      setTagInput={setTagInput}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Risk & Rules Tab */}
      {activeTab === 'riskRules' && (
        <div className="grid grid-cols-12 gap-4" style={{ minHeight: '600px' }}>
          {/* Profile List */}
          <div className="col-span-4 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-800">{s.ruleProfiles.title}</span>
              <button className="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                <Plus className="w-3 h-3" />
                {s.ruleProfiles.addProfile}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {ruleProfiles.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6">{s.ruleProfiles.noProfiles}</p>
              ) : ruleProfiles.map(profile => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                    selectedProfile === profile.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">{lf(locale, profile as Record<string, unknown>, 'name')}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{lf(locale, profile as Record<string, unknown>, 'description')}</p>
                  <p className="text-xs text-gray-400 mt-1">{profile.rules.length} {s.ruleProfiles.rules}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Detail */}
          <div className="col-span-8 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
            {!activeProfile ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">{s.noSelection}</div>
            ) : (
              <>
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{lf(locale, activeProfile as Record<string, unknown>, 'name')}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{lf(locale, activeProfile as Record<string, unknown>, 'description')}</p>
                  </div>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {s.saveNode}
                  </button>
                </div>
                <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                  {/* Basic fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label={s.ruleProfiles.profileName} required>
                      <input
                        type="text"
                        defaultValue={activeProfile.name}
                        className="form-input"
                      />
                    </FormField>
                    <FormField label={s.ruleProfiles.description}>
                      <input
                        type="text"
                        defaultValue={activeProfile.description}
                        className="form-input"
                      />
                    </FormField>
                  </div>

                  {/* Rules table */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-800">{s.ruleProfiles.rules}</h3>
                      <button className="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                        <Plus className="w-3 h-3" />
                        {s.ruleProfiles.addRule}
                      </button>
                    </div>
                    {activeProfile.rules.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-lg">{s.ruleProfiles.noRules}</p>
                    ) : (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="text-left px-3 py-2 font-medium text-gray-600">{s.ruleProfiles.defect}</th>
                              <th className="text-left px-3 py-2 font-medium text-gray-600">{s.ruleProfiles.severity}</th>
                              <th className="px-3 py-2 w-8"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeProfile.rules.map((rule, i) => (
                              <tr key={rule.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                <td className="px-3 py-2 text-gray-900">{lf(locale, rule as Record<string, unknown>, 'defect')}</td>
                                <td className="px-3 py-2">
                                  <SeverityBadge severity={rule.severity} t={t} />
                                </td>
                                <td className="px-3 py-2">
                                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                                    <X className="w-3.5 h-3.5" />
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
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800">{s.photoMapping.title}</span>
            <button className="flex items-center gap-1.5 text-xs text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              {s.photoMapping.addMapping}
            </button>
          </div>
          {photoMappings.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-12">{s.photoMapping.noMappings}</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs">{s.photoMapping.sourceType}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs">{s.photoMapping.deviceId}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs">{s.photoMapping.cameraId}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs">{s.photoMapping.defaultComponent}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 text-xs">{s.photoMapping.remarks}</th>
                  <th className="px-4 py-3 w-16"></th>
                </tr>
              </thead>
              <tbody>
                {photoMappings.map((mapping, i) => {
                  const comp = components.find(c => c.id === mapping.defaultComponentId)
                  return (
                    <tr key={mapping.id} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="px-4 py-3 text-gray-900">{mapping.sourceType}</td>
                      <td className="px-4 py-3 text-gray-600 font-mono">{mapping.deviceId}</td>
                      <td className="px-4 py-3 text-gray-600 font-mono">{mapping.cameraId}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {comp ? lf(locale, comp as Record<string, unknown>, 'name') : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{mapping.remarks}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-500 hover:text-blue-700 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

function PlantForm({ plant, locale, t }: { plant: typeof plants[0]; locale: Locale; t: ReturnType<typeof useI18n>['t']['settings'] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
      <div className="grid grid-cols-2 gap-4">
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
      <div className="grid grid-cols-2 gap-4">
        <FormField label={t.form.name} required>
          <input type="text" defaultValue={lf(locale, asset as Record<string, unknown>, 'name')} className="form-input" />
        </FormField>
        <FormField label={t.form.code}>
          <input type="text" defaultValue={asset.id} className="form-input" />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-4">
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

function ComponentForm({
  component, locale, t, tagInput, setTagInput
}: {
  component: typeof components[0]
  locale: Locale
  t: ReturnType<typeof useI18n>['t']['settings']
  tagInput: string
  setTagInput: (v: string) => void
}) {
  const [tags, setTags] = useState<string[]>(component.tags ?? [])
  const [criticality, setCriticality] = useState<CriticalityLevel>((component.criticality ?? 'normal') as CriticalityLevel)
  const [profileId, setProfileId] = useState(component.ruleProfileId ?? '')

  const addTag = () => {
    const v = tagInput.trim()
    if (v && !tags.includes(v)) setTags(prev => [...prev, v])
    setTagInput('')
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label={t.form.name} required>
          <input type="text" defaultValue={lf(locale, component as Record<string, unknown>, 'name')} className="form-input" />
        </FormField>
        <FormField label={t.form.code}>
          <input type="text" defaultValue={component.id} className="form-input" />
        </FormField>
      </div>

      <FormField label={t.form.criticality} required>
        <div className="flex gap-2">
          {(['critical', 'normal', 'low'] as CriticalityLevel[]).map(lvl => (
            <button
              key={lvl}
              onClick={() => setCriticality(lvl)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                criticality === lvl
                  ? CRITICALITY_COLORS[lvl] + ' shadow-sm'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t.criticality[lvl]}
            </button>
          ))}
        </div>
      </FormField>

      <FormField label={t.form.ruleProfile}>
        <select
          value={profileId}
          onChange={e => setProfileId(e.target.value)}
          className="form-input"
        >
          <option value="">{t.form.selectProfile}</option>
          {ruleProfiles.map(rp => (
            <option key={rp.id} value={rp.id}>{lf(locale, rp as Record<string, unknown>, 'name')}</option>
          ))}
        </select>
      </FormField>

      <FormField label={t.form.tags}>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              <Tag className="w-2.5 h-2.5" />
              {tag}
              <button onClick={() => setTags(prev => prev.filter(t => t !== tag))} className="text-gray-400 hover:text-red-500 transition-colors ml-0.5">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder={t.form.tagsPlaceholder}
            className="form-input flex-1"
          />
          <button onClick={addTag} className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" />
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
    <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
      {t.componentTable.batchCriticality}
    </button>
  )
}

function SeverityBadge({ severity, t }: { severity: string; t: ReturnType<typeof useI18n>['t'] }) {
  const colors: Record<string, string> = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  }
  const label = (t.severity as Record<string, string>)[severity] ?? severity
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors[severity] ?? 'bg-gray-100 text-gray-700'}`}>
      {label}
    </span>
  )
}
