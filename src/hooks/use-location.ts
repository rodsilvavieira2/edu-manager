import { locale } from 'expo-localization'
import { I18n } from 'i18n-js'
import { useEffect, useState } from 'react'

const i18n = new I18n()

export function useLocation() {
  const [currentLocation, setCurrentLocation] = useState(locale)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const translations = require(`../services/translations/${currentLocation}`)

    i18n.store(translations)

    i18n.locale = currentLocation

    setIsLoaded(true)
  }, [currentLocation])

  return {
    setLocation: setCurrentLocation,

    t: i18n.t,

    isLoaded,
  }
}
