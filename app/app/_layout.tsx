import { BottomBar } from '@src/components/layout'
import { useWatchDisciplines, useWatchTasks } from '@src/hooks'
import { Stack } from 'expo-router'
import React from 'react'

export default function ContentLayout() {
  useWatchTasks()
  useWatchDisciplines()

  return (
    <>
      <Stack
        initialRouteName="/app"
        screenOptions={{
          headerShown: false,
          animation: 'simple_push',
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      <BottomBar />
    </>
  )
}
