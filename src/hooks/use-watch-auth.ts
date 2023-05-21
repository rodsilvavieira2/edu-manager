import auth from '@react-native-firebase/auth'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProvider, setUser } from '../redux/slices'

export function useWatchAuth() {
  const dispatch = useDispatch()
  const route = useRouter()

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((current) => {
      if (current) {
        dispatch(
          setUser({
            id: current.uid,
            name: current.displayName,
            email: current.email,
            profile_url: current.photoURL,
            created_at: current.metadata.creationTime,
            updated_at: current.metadata.lastSignInTime,
          })
        )

        dispatch(setProvider(current.providerData[0].providerId as any))

        route.replace('/app')
      } else {
        route.replace('/sign-in')

        dispatch(setUser(null))
      }
    })

    return () => unsubscribe()
  }, [])
}
