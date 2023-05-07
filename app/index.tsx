import { Center } from 'native-base'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import { useWatchAuth } from '../src/hooks'
import { addSnackbar } from '../src/redux/slices'

export default function App() {
  useWatchAuth()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      addSnackbar({
        message:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat culpa voluptas nemo. Ipsa quidem nam, dicta eligendi reiciendis officiis enim ratione aspernatur architecto consectetur suscipit optio dolore tempora obcaecati hic?',
        status: 'info',
      })
    )
  }, [])

  return (
    <Center bg="white" flex={1}>
      <ActivityIndicator color="info.500" size="large" />
    </Center>
  )
}
