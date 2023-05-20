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
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

export default function AppLayout() {
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

  if (!isFontsLoaded) return <SplashScreen />

  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider theme={appTheme} colorModeManager={colorModeManager}>
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
    </ReduxProvider>
  )
}
