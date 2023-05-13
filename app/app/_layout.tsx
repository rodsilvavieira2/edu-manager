import { Slot } from 'expo-router'
import React from 'react'
import { useWatchTasks } from '../../src/hooks'

import { BottomBar } from '../../src/components/bottom-bar'

export default function ContentLayout() {
  useWatchTasks()

  return (
    <>
      <Slot />

      <BottomBar />
    </>
  )
}
