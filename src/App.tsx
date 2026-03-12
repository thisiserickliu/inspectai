import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import InspectionTasks from './pages/InspectionTasks'
import AssetDetail from './pages/AssetDetail'
import InspectionExecution from './pages/InspectionExecution'
import FindingDetail from './pages/FindingDetail'
import ReportDetail from './pages/ReportDetail'
import MobileInspection from './pages/MobileInspection'
import AIInsights from './pages/AIInsights'
import { LocaleContext, Locale, locales } from './i18n'

export default function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const t = locales[locale]

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<InspectionTasks />} />
            <Route path="assets/:id" element={<AssetDetail />} />
            <Route path="assets" element={<AssetDetail />} />
            <Route path="tasks/:id/execute" element={<InspectionExecution />} />
            <Route path="findings/:id" element={<FindingDetail />} />
            <Route path="findings" element={<FindingDetail />} />
            <Route path="reports/:id" element={<ReportDetail />} />
            <Route path="reports" element={<ReportDetail />} />
            <Route path="mobile" element={<MobileInspection />} />
            <Route path="ai-insights" element={<AIInsights />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocaleContext.Provider>
  )
}
