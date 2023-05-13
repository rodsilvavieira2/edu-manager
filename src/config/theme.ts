import { extendTheme } from 'native-base'

export const appTheme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins-Light',
      },
      200: {
        normal: 'Poppins-Light',
      },
      300: {
        normal: 'Poppins-Light',
      },
      400: {
        normal: 'Poppins-Regular',
      },
      500: {
        normal: 'Poppins-Medium',
      },
      600: {
        normal: 'Poppins-Medium',
      },
      700: {
        normal: 'Poppins_700Bold',
      },
      800: {
        normal: 'Poppins_800ExtraBold',
      },
    },
  },

  colors: {
    primary: {
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
    },

    secondary: {
      500: '#ffffff',
    },

    tertiary: {
      500: '#6366f1',
    },

    neutral: {
      500: '#F6F8FA',
    },

    icon: {
      500: '#737373',
      700: '#404040',
    },

    onPrimary: {
      500: '#ffffff',
    },

    onSecondary: {
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
    },

    border: {
      300: '#d6d3d1',
    },
  },

  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },

  components: {
    Heading: {
      defaultProps: {
        color: 'onSecondary.600',
      },
    },
    Text: {
      defaultProps: {
        color: 'onSecondary.600',
      },
    },
  },

  config: {
    initialColorMode: 'light',
  },
})

type CustomThemeType = typeof appTheme

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
