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
import { StatusBarTheme } from '@src/components/layout'
import { SnackbarDispatcher } from '@src/components/snackbar-dispatcher'
import { appTheme } from '@src/config'
import { store } from '@src/redux/store'
import { colorModeManager } from '@src/services'
import translation from '@src/services/i18n'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Box, NativeBaseProvider } from 'native-base'
import React, { useEffect, useState } from 'react'
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
      await translation

      setIsTranslationsLoaded(true)
    })()
  }, [])

  if (!isFontsLoaded || !isTranslationsLoaded) return <SplashScreen />

  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider theme={appTheme} colorModeManager={colorModeManager}>
        <StatusBarTheme />

        <SnackbarDispatcher />

        <Box
          flex={1}
          safeArea
          _light={{
            bg: 'light.50',
          }}
          _dark={{ bg: 'dark.50' }}
        >
          <Stack
            initialRouteName="/"
            screenOptions={{
              headerShown: false,
              animation: 'fade_from_bottom',
              contentStyle: {
                backgroundColor: 'transparent',
              },
            }}
          />
        </Box>
      </NativeBaseProvider>
    </ReduxProvider>
  )
}
