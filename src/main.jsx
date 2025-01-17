import React from 'react'
import { createRoot } from 'react-dom/client'
import DishesProvider from './context.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DishesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DishesProvider>
  </React.StrictMode>
)








