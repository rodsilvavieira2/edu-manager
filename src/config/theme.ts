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

    background: {
      500: '#F6F8FA',
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
        color: 'gray.600',
      },
    },
    Text: {
      defaultProps: {
        color: 'gray.600',
      },
    },
  },
})

type CustomThemeType = typeof appTheme

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
