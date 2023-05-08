import auth from '@react-native-firebase/auth'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices'

export function useWatchAuth() {
  const dispatch = useDispatch()
  const route = useRouter()

  useEffect(() => {
    const sub = auth().onAuthStateChanged((current) => {
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

        route.replace('/app')
      } else {
        dispatch(setUser(null))

        route.replace('/sign-in')
      }
    })

    return () => {
      sub()
    }
  }, [])
}
