import type React from 'react'
import './utils/i18n'
import { useTranslation } from 'react-i18next'

const App: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, onClick, ...props }) => {
  const { i18n } = useTranslation()

  return <></>
}

export default App
