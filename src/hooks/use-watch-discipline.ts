import firestore from '@react-native-firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Discipline } from '../@types'
import { loadDiscipline, selectUser } from '../redux/slices'

export function useWatchDisciplines() {
  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.id)
      .collection('disciplines')
      .onSnapshot((snapshot) => {
        const data: Discipline[] = []

        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          } as Discipline)
        })

        dispatch(loadDiscipline(data))
      })
  }, [])
}
