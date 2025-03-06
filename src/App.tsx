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
      <Header />
      <Sidebar />
      <Routes>
        <Route path={RouteType.ROOT} element={<RootView />} />
        <Route path={RouteType.EVENTS} element={<EventView />} />
        <Route path={RouteType.SEARCH} element={<SearchView />} />
        <Route path={RouteType.MEMBERS} element={<div />} />
      </Routes>
    </Router>
  )
}

export default App
