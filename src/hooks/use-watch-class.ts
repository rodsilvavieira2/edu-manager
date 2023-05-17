import firestore from '@react-native-firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Class } from '../@types'
import { loadClasses, selectUser } from '../redux/slices'

export function useWatchClasses() {
  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.id)
      .collection('classes')
      .onSnapshot((snapshot) => {
        const data: Class[] = []

        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          } as Class)
        })

        dispatch(loadClasses(data))
      })
  }, [])
}
