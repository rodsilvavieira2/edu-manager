import { IStackProps, Stack } from 'native-base'
import { BOTTOM_BAR_HEIGHT } from './bottom-bar'

export interface ContainerProps extends IStackProps {
  withBottomBar?: boolean
}

export function Container(props: ContainerProps) {
  return (
    <Stack
      flex={1}
      p={4}
      px={3}
      _light={{
        bg: 'light.50',
      }}
      _dark={{ bg: 'dark.50' }}
      style={{ marginBottom: props.withBottomBar ? BOTTOM_BAR_HEIGHT : 0 }}
      {...props}
    />
  )
}
