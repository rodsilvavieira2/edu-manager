import { extendTheme } from "native-base";

export const appTheme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins-Light",
      },
      200: {
        normal: "Poppins-Light",
      },
      300: {
        normal: "Poppins-Light",
      },
      400: {
        normal: "Poppins-Regular",
      },
      500: {
        normal: "Poppins-Medium",
      },
      600: {
        normal: "Poppins-Medium",
      },
      700: {
        normal: "Poppins_700Bold",
      },
      800: {
        normal: "Poppins_800ExtraBold",
      },
    },
  },

  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});
