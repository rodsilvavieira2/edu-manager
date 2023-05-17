import { Skeleton, Stack } from 'native-base'
import { ReactNode, useEffect, useState } from 'react'

const CARD_HEIGHT = 64

export function ListLoading() {
  const [containerHeight, setContainerHeight] = useState(0)
  const [items, setItems] = useState<ReactNode[]>([])

  useEffect(() => {
    if (!containerHeight) return

    const current = []

    const quantity = Math.floor(containerHeight / CARD_HEIGHT)

    for (let i = 0; i < quantity; i++) {
      current.push(
        <Skeleton
          key={i}
          _dark={{ startColor: 'dark.100' }}
          style={{ height: CARD_HEIGHT }}
          rounded="md"
        />
      )
    }

    setItems(current)
  }, [containerHeight])

  return (
    <Stack
      flex={1}
      space={3}
      onLayout={({ nativeEvent }) => {
        setContainerHeight(nativeEvent.layout.height)
      }}
    >
      {items}
    </Stack>
  )
}
