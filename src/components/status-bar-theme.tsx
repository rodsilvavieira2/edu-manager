import { useTheme } from 'native-base'
import { StatusBar, StatusBarProps } from 'react-native'

export function StatusBarTheme(props: StatusBarProps) {
  const {
    colors: { primary },
  } = useTheme()

  return (
    <StatusBar
      backgroundColor={primary[500]}
      barStyle="light-content"
      animated
      translucent
      {...props}
    />
  )
}
