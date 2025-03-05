import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/i18n'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { StrictMode, Suspense } from 'react'
import App from './App.tsx'
import FallbackView from './views/FallbackView.tsx'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Asia/Tokyo')

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
