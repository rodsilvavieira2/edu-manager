import { Box, Text } from "native-base";

export function Welcome (){
  return (
    <Box safeArea flex={1}>
        <Text>
          Welcome to NativeBase
        </Text>
    </Box>
  )
}