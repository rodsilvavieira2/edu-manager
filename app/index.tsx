import { Center } from 'native-base'
import { ActivityIndicator } from 'react-native'
import { useWatchAuth } from '../src/hooks'

export default function App() {
  useWatchAuth()

  return (
    <Center bg="white" flex={1}>
      <ActivityIndicator color="info.500" size="large" />
    </Center>
  )
}
