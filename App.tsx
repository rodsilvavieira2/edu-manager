import { Box, NativeBaseProvider, Text } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Box>
        <Text>Test</Text>
      </Box>
    </NativeBaseProvider>
  );
}
