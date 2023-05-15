import { useTheme } from 'native-base'
import { ActivityIndicator } from 'react-native'
import { Container } from '../src/components/container'
import { useWatchAuth } from '../src/hooks'

export default function App() {
  useWatchAuth()

  const { colors } = useTheme()

  return (
    <Container alignItems="center" justifyContent="center">
      <ActivityIndicator color={colors.primary[500]} size="large" />
    </Container>
  )
}
