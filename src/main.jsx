import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppContextProvider } from './context/AppContext.jsx'

import { RouterProvider,Navigate } from 'react-router-dom'
import routes from './router/routes.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
<AppContextProvider>
  <RouterProvider router={routes}/>
</AppContextProvider>

)
