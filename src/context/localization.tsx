import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import enUs from '@src/services/translations/en-us'
import ptBr from '@src/services/translations/pt-br'
import { locale } from 'expo-localization'
import { I18n } from 'i18n-js'
import React, { createContext, useEffect, useState } from 'react'

const i18n = new I18n(
  {
    'pt-BR': ptBr,
    'en-US': enUs,
  },
  {
    defaultLocale: 'en-US',
    enableFallback: true,
  }
)

i18n.locale = locale

interface ContextData {
  setLocation: (location: string) => void
  t: I18n['t']
}

const LocationContext = createContext<ContextData>({} as ContextData)

export interface LocationProviderProps {
  children: React.ReactNode
  deviceLocation: string
}

export function LocationProvider({
  children,
  deviceLocation,
}: LocationProviderProps) {
  const [location, setLocation] = useState(deviceLocation)
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

    setItem(location)
  }, [location])

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
