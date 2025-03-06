import { Box } from '@mui/joy'
import type React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { RouteType } from './enums/routes'
import { Logger } from './utils/logger'
import EventView from './views/EventView'
import RootView from './views/RootView'
import SearchView from './views/SearchView'

const App: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage('ja')
  }, [i18n])

  useEffect(() => {
    Logger.info('CROSS ORIGIN ISOLATED', window.crossOriginIsolated)
    Logger.info('DEV', import.meta.env.DEV)
  }, [])

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', height: '100vh' }}>
        <Header />
        <Sidebar />
        <Box
          component='main'
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height) + env(safe-area-inset-top, 0px))',
              sm: 'calc(12px + var(--Header-height) + env(safe-area-inset-top, 0px))',
              md: 3
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1
          }}
        >
          <Routes>
            <Route path={RouteType.ROOT} element={<RootView />} />
            <Route path={RouteType.EVENTS} element={<EventView />} />
            <Route path={RouteType.SEARCH} element={<SearchView />} />
            <Route path={RouteType.MEMBERS} element={<div />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App
