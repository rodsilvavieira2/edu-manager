import firestore from '@react-native-firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Task } from '../@types'
import { loadTasks, selectUser } from '../redux/slices'

export function useWatchTasks() {
  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.id)
      .collection('tasks')
      .onSnapshot((snapshot) => {
        const tasks: Task[] = []

        snapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
          } as Task)
        })

        dispatch(loadTasks(tasks))
      })
  }, [])
}
