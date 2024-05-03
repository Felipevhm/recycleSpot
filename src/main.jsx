import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UsersContextProvider } from './context/UsersContext.jsx'

import { RouterProvider } from 'react-router-dom'
import routes from './router/routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<UsersContextProvider>
  <RouterProvider router={routes}/>
</UsersContextProvider>

)
