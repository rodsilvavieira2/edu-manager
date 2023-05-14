import { Box, IBoxProps } from 'native-base'

export interface ContainerProps extends IBoxProps {}

export function Container(props: ContainerProps) {
  return (
    <Box
      safeArea
      flex={1}
      p={4}
      _light={{
        bg: 'neutral.500',
      }}
      _dark={{ bg: 'black.500' }}
      {...props}
    />
  )
}
