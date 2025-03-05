import { Box } from '@mui/joy'
import type React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Logger } from './utils/logger'

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
    <Box>
      <Header />
      <Sidebar />
    </Box>
  )
}

export default App
