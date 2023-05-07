import { NativeBaseProvider, StatusBar } from 'native-base'

import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { appTheme } from '../src/config/theme'

export default function Layout() {
  const [isFontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  })

  if (!isFontsLoaded) return <SplashScreen />

  return (
    <NativeBaseProvider theme={appTheme}>
      <StatusBar barStyle="dark-content" animated translucent />

      <Stack
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </NativeBaseProvider>
  )
}
