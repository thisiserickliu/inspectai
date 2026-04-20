# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview built app locally
npx tsc           # Type-check (no test or lint scripts configured)
```

## Architecture

**InspectAI** is an AI-powered industrial inspection SaaS app. React 18 + TypeScript + Vite, using React Router v6, Tailwind CSS, Recharts for charts, and Lucide for icons.

### Key directories
- `src/pages/` — One component per route (Dashboard, Tasks, AssetDetail, FindingDetail, Reports, MobileInspection, AIInsights, Settings)
- `src/components/common/` — Shared UI pieces (KPICard, SeverityBadge, StatusBadge)
- `src/components/layout/` — Shell (Layout, Header, Sidebar)
- `src/i18n/` — Translation objects: `en.ts`, `zh-TW.ts`, `ja.ts`
- `src/data/mockData.ts` — All mock data (plants, zones, assets, tasks, findings, KPIs)
- `src/utils/localize.ts` — `lf(locale, item, field)` helper for localized data fields

### Routing
Defined in `src/App.tsx`. All routes are nested under `<Layout>`:
```
/dashboard  /tasks  /assets/:id  /tasks/:id/execute
/findings/:id  /reports/:id  /mobile  /ai-insights  /settings
```

### Internationalization
Custom Context-based i18n (not i18next). Use the `useI18n()` hook for `{ locale, setLocale, t }`. Data entities use parallel localized fields (`nameZh`, `nameJa`); pick the right one with `lf(locale, item, 'name')`. Supported locales: `en`, `zh-TW`, `ja`.

### Styling
- **Design tokens** live in `src/index.css` as CSS custom properties (`--paper`, `--ink`, `--rust`, `--flag`, etc.) — use these for color, never hardcode hex
- **Component classes** also in `index.css`: `.card`, `.badge`, `.btn-primary`, `.btn-secondary`, `.form-input`, `.sidebar-link`
- **Typography**: Inter Tight (UI), IBM Plex Mono (code/monospace), Fraunces (display numbers)
- Tailwind utilities + custom classes — avoid inline styles

### State management
No Redux/Zustand. `LocaleContext` (in `App.tsx`) is the only global context. All other state is local `useState`.
