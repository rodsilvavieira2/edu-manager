import { Box, Heading } from 'native-base'

export interface ScreenHeaderProps {
  title: string
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <Box
      safeAreaTop
      alignItems="center"
      justifyContent="center"
      flexDir="row"
      py="4"
      bg="primary.500"
      shadow={8}
    >
      <Heading color="white" fontSize="lg">
        {title}
      </Heading>
    </Box>
  )
}
