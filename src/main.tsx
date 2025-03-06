import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/i18n'
import { CssBaseline, CssVarsProvider, GlobalStyles, extendTheme } from '@mui/joy'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { SnackbarProvider } from 'notistack'
import { StrictMode, Suspense } from 'react'
import App from './App.tsx'
import FallbackView from './views/FallbackView.tsx'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Asia/Tokyo')

const theme = extendTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 512,
      md: 768,
      lg: 900,
      xl: 1280
    }
  }
})

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider disableTransitionOnChange theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            fontFamily: 'Kosugi Maru',
            userSelect: 'none'
          }
        }}
      />
      <Suspense fallback={<FallbackView />}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </Suspense>
    </CssVarsProvider>
  </StrictMode>
)
