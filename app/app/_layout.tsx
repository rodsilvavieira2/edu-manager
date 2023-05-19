import { Stack } from 'expo-router'
import React from 'react'
import { useWatchDisciplines, useWatchTasks } from '../../src/hooks'

import { BottomBar } from '../../src/components/bottom-bar'

export default function ContentLayout() {
  useWatchTasks()
  useWatchDisciplines()

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'simple_push',
        }}
      />

      <BottomBar />
    </>
  )
}
