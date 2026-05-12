import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PricingProvider } from './contexts/PricingContext'
import AnalyticsBoot from './components/AnalyticsBoot'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PricingProvider>
      <AnalyticsBoot />
      <App />
    </PricingProvider>
  </React.StrictMode>,
)
