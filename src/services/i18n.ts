import AsyncStorage from '@react-native-async-storage/async-storage'
import { locale } from 'expo-localization'
import i18n from 'i18next'
import 'intl'
import 'intl-pluralrules'
import { initReactI18next } from 'react-i18next'
import enUs from './translations/en-us'
import ptBr from './translations/pt-br'

type CallbackLanguage = (language: string) => void

const cacheUserLanguage = () => ({
  type: 'languageDetector' as const,
  async: true,
  init: () => {},

  detect: async function (callback: CallbackLanguage) {
    try {
      const language = await AsyncStorage.getItem('@edu.manager.user-language')

      if (language) {
        return callback(language)
      } else {
        callback(locale)
      }
    } catch (error) {
      callback(locale)
    }
  },

  cacheUserLanguage: async function (language: string) {
    try {
      await AsyncStorage.setItem('@edu.manager.user-language', language)
    } catch (error) {
      console.log(error)
    }
  },
})

const resources = {
  'en-US': enUs,
  'pt-BR': ptBr,
}

export default i18n
  .use(initReactI18next)
  .use(cacheUserLanguage())
  .init({
    resources,
    fallbackLng: 'en-US',

    interpolation: {
      escapeValue: true,
    },
  })
