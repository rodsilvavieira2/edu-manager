import { Skeleton, Stack } from 'native-base'
import { ReactNode, useEffect, useState } from 'react'

const CARD_HEIGHT = 64

export interface SkeletonListProps {
  height?: number
}

export function SkeletonList({ height = CARD_HEIGHT }: SkeletonListProps) {
  const [containerHeight, setContainerHeight] = useState(0)
  const [items, setItems] = useState<ReactNode[]>([])

  useEffect(() => {
    if (!containerHeight) return

    const current = []

    const quantity = Math.floor(containerHeight / height)

    for (let i = 0; i < quantity; i++) {
      current.push(
        <Skeleton
          key={i}
          _dark={{ startColor: 'dark.100' }}
          style={{ height }}
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
