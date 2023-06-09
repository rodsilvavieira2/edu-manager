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

    Lato: {
      100: {
        normal: 'Lato_100Thin',
      },

      300: {
        normal: 'Lato_300Light',
      },

      500: {
        normal: 'Lato_400Regular',
      },

      600: {
        normal: 'Lato_700Bold',
      },

      900: {
        normal: 'Lato_900Black',
      },
    },
  },

  colors: {
    primary: {
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
    },

    secondary: {
      500: '#ffffff',
    },

    neutral: {
      500: '#F6F8FA',
    },

    icon: {
      500: '#ffffff',
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
      300: '#b1b1b1',
    },

    black: {
      400: '#111111',
      500: '#000000',
    },
  },

  fonts: {
    heading: 'Lato',
    body: 'Poppins',
    mono: 'Poppins',
  },

  components: {
    Text: {
      baseStyle: {
        _light: {
          color: 'gray.700',
        },
      },
    },

    Heading: {
      baseStyle: {
        _light: {
          color: 'gray.700',
        },
      },
    },

    IconButton: {
      variants: {
        bottom: {
          rounded: 'full',

          bg: 'dark.300',

          _pressed: { bg: 'indigo.400' },
        },

        icon: {
          rounded: 'full',

          _dark: {
            _pressed: { bg: 'indigo.400' },
          },

          _light: {
            _pressed: { bg: 'indigo.200' },
          },
        },
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
