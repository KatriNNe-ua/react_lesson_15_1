import { Outlet } from 'react-router'
import MainMenu from './ui/MainMenu'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainMenu />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
