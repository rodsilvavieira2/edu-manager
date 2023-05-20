import { Box, IBoxProps } from 'native-base'
import { BOTTOM_BAR_HEIGHT } from './bottom-bar'

export interface ContainerProps extends IBoxProps {}

export function Container(props: ContainerProps) {
  return (
    <Box
      flex={1}
      p={4}
      _light={{
        bg: 'light.50',
      }}
      _dark={{ bg: 'dark.50' }}
      safeArea
      style={{ marginBottom: BOTTOM_BAR_HEIGHT }}
      {...props}
    />
  )
}
