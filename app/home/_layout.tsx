import { Tabs } from 'expo-router'
import { useWatchTasks } from '../../src/hooks'

export default function ContentLayout() {
  useWatchTasks()

  return <Tabs screenOptions={{ headerShown: false }} />
}
