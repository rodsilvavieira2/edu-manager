import { useColorMode } from 'native-base'
import { StatusBar, StatusBarProps } from 'react-native'

export function StatusBarTheme(props: StatusBarProps) {
  const { colorMode } = useColorMode()

  const style = colorMode === 'light' ? 'dark-content' : 'light-content'

  return <StatusBar barStyle={style} animated translucent />
}
