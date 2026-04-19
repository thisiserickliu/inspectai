import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--paper)' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0" style={{ marginLeft: '16rem' }}>
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
