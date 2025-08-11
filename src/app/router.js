import { createBrowserRouter } from 'react-router'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import ProductEditPage from '../pages/ProductEditPage'
import CartPage from '../pages/CartPage'
import PageNotFound from '../pages/PageNotFound'
import { MainLayout } from '@/widgets/MainLayout'


export const routes = [
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: HomePage,
        meta: {
          label: 'Home',
        },
      },
      {
        path: 'products',
        Component: ProductsPage,
        meta: {
          label: 'Products',
        },
      },
      { path: '/products/add', Component: ProductEditPage },
      { path: '/products/edit/:id', Component: ProductEditPage },
      {
        path: 'cart',
        Component: CartPage,
        meta: {
          label: 'Cart',
        },
      },
      { path: '*', Component: PageNotFound },
    ],
  },
]

export const router = createBrowserRouter(routes)
