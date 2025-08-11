import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { store } from './app/store.js'
import { router } from './app/router.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
