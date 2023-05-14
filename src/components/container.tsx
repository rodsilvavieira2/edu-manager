import { Box, IBoxProps } from 'native-base'

export interface ContainerProps extends IBoxProps {}

export function Container(props: ContainerProps) {
  return (
    <Box
      safeArea
      flex={1}
      p={4}
      _light={{
        bg: 'light.50',
      }}
      _dark={{ bg: 'dark.50' }}
      {...props}
    />
  )
}
