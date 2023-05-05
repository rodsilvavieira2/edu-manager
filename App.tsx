import { NativeBaseProvider, StatusBar } from "native-base";

import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { Routes } from "./src/config/routes";
import { appTheme } from "./src/config/theme";

export default function App() {
  const [isFontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!isFontsLoaded) return null;

  return (
    <NativeBaseProvider theme={appTheme}>
      <StatusBar barStyle="dark-content" animated translucent />

      <Routes />
    </NativeBaseProvider>
  );
}
