import { IStackProps, Stack } from 'native-base'
import { BOTTOM_BAR_HEIGHT } from './bottom-bar'

export interface ContainerProps extends IStackProps {}

export function Container(props: ContainerProps) {
  return (
    <Stack
      flex={1}
      p={4}
      _light={{
        bg: 'light.50',
      }}
      _dark={{ bg: 'dark.50' }}
      style={{ marginBottom: BOTTOM_BAR_HEIGHT }}
      {...props}
    />
  )
}
