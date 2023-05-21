import { Container } from '@src/components/container'
import { useWatchAuth } from '@src/hooks'
import { useTheme } from 'native-base'
import { ActivityIndicator } from 'react-native'

export default function App() {
  useWatchAuth()

  const { colors } = useTheme()

  return (
    <Container safeArea alignItems="center" justifyContent="center">
      <ActivityIndicator color={colors.primary[500]} size="large" />
    </Container>
  )
}
