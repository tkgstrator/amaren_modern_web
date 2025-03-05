import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.yaml'
import ja from './locales/ja.yaml'

const I18n = i18n

i18n.use(initReactI18next).init({
  resources: {
    en: en,
    ja: ja
  },
  lng: 'ja',
  fallbackLng: 'ja',
  interpolation: {
    escapeValue: false
  }
})

export default I18n
