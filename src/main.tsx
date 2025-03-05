import { createRoot } from 'react-dom/client'
import './index.css'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { StrictMode, Suspense } from 'react'
import App from './App.tsx'
import FallbackView from './views/FallbackView.tsx'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Suspense fallback={<FallbackView />}>
        <App />
      </Suspense>
    </CssVarsProvider>
  </StrictMode>
)
