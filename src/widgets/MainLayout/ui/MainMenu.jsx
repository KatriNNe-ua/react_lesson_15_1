import { useSelector } from 'react-redux'
import { NavLink } from 'react-router'
import { routes } from '@/app/router'

export default function MainMenu() {
  const itemsForMenu = routes[0].children
    .filter((r) => r?.meta?.label)
    .map((r) => ({
      path: r.index ? '/' : r.path,
      label: r.meta.label,
    }))
  const cart = useSelector((state) => state.cart)
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      {itemsForMenu.map((r) => (
        <NavLink
          key={r.path}
          to={r.path}
          className={({ isActive }) =>
            isActive ? 'font-bold underline' : 'hover:underline'
          }
        >
          {r.label}
          {r.label === 'Cart' && <sup> {cart.length}</sup>}
        </NavLink>
      ))}
    </nav>
  )
}
