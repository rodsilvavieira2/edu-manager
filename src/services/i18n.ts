import { locale } from 'expo-localization'
import i18n from 'i18next'
import AsyncStoragePlugin from 'i18next-react-native-async-storage'
import { initReactI18next } from 'react-i18next'
import enUs from './translations/en-us'
import ptBr from './translations/pt-br'

const resources = {
  en: enUs,
  pt: ptBr,
}

export default i18n
  .use(initReactI18next)
  .use(
    AsyncStoragePlugin((cb) => {
      cb(locale)
    })
  )
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: true,
    },
  })
