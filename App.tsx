import { NativeBaseProvider } from "native-base";
import { Welcome } from "./src/screens";

export default function App() {
  return (
    <NativeBaseProvider>
      <Welcome/>
    </NativeBaseProvider>
  );
}
