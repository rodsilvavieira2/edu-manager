import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { locale } from 'expo-localization'
import { SplashScreen } from 'expo-router'
import { I18n } from 'i18n-js'
import React, { createContext, useEffect, useState } from 'react'

const settings = {
  'en-US': () => import('../services/translations/en-us'),
  'pt-BR': () => import('../services/translations/pt-br'),
}

const i18n = new I18n(undefined, { defaultLocale: 'en-US' })

i18n.locale = locale

interface ContextData {
  setLocation: (location: string) => void
  t: I18n['t']
}

const LocationContext = createContext<ContextData>({} as ContextData)

async function loadLocationFromFile(locale: string) {
  const config = await settings[locale]()

  if (!config) return

  i18n.store({ [locale]: config.default })
}

export interface LocationProviderProps {
  children: React.ReactNode
  deviceLocation: string
}

export function LocationProvider({
  children,
  deviceLocation,
}: LocationProviderProps) {
  const [location, setLocation] = useState(deviceLocation)
  const [isLoaded, setIsLoaded] = useState(false)
  const { getItem, setItem } = useAsyncStorage('@location')

  useEffect(() => {
    async function loadLocation() {
      const location = await getItem()

      if (location) {
        setLocation(location)
      }
    }

    loadLocation()
  }, [])

  useEffect(() => {
    i18n.locale = location

    loadLocationFromFile(location).then(() => setIsLoaded(true))

    setItem(location)
  }, [location])

  if (!isLoaded) return <SplashScreen />

  return (
    <LocationContext.Provider value={{ setLocation, t: i18n.t.bind(i18n) }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = React.useContext(LocationContext)

  if (!context) {
    throw new Error('useLocation must be used within an LocationProvider')
  }

  return context
}
