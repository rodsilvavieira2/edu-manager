import {
  Lato_100Thin,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from '@expo-google-fonts/lato'
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins'
import { SnackbarDispatcher } from '@src/components/snackbar-dispatcher'
import { StatusBarTheme } from '@src/components/status-bar-theme'
import { appTheme } from '@src/config'
import { store } from '@src/redux/store'
import { colorModeManager } from '@src/services'
import translationService from '@src/services/i18n'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import React, { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider as ReduxProvider } from 'react-redux'

export default function AppLayout() {
  const [isTranslationsLoaded, setIsTranslationsLoaded] = useState(false)

  const [isFontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,

    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  })

  useEffect(() => {
    ;(async () => {
      await translationService

      setIsTranslationsLoaded(true)
    })()
  }, [])

  if (!isFontsLoaded || !isTranslationsLoaded) return <SplashScreen />

  return (
    <ReduxProvider store={store}>
      <I18nextProvider i18n={translationService as any}>
        <NativeBaseProvider
          theme={appTheme}
          colorModeManager={colorModeManager}
        >
          <StatusBarTheme />

          <SnackbarDispatcher />

          <Stack
            initialRouteName="/"
            screenOptions={{
              headerShown: false,
              animation: 'simple_push',
            }}
          />
        </NativeBaseProvider>
      </I18nextProvider>
    </ReduxProvider>
  )
}
