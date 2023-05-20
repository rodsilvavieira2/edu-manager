import { BottomBar } from '@src/components/bottom-bar'
import { useWatchDisciplines, useWatchTasks } from '@src/hooks'
import { Stack } from 'expo-router'
import React from 'react'

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
