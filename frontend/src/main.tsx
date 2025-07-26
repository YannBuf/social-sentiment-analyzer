import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'next/app.js'
import './index.css'
import { AuthProvider } from './app/contexts/authcontext.jsx'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import theme from './theme/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider> {/* << 包裹整个应用 */}
      <App />
    </AuthProvider>
  </ThemeProvider>
  </React.StrictMode>,
)
