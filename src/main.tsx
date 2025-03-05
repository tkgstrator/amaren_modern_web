import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { StrictMode, Suspense } from 'react'
import App from './App.tsx'
import FallbackView from './views/FallbackView.tsx'

const theme = createTheme({})

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Suspense fallback={<FallbackView />}>
        <App />
      </Suspense>
    </ThemeProvider>
  </StrictMode>
)
