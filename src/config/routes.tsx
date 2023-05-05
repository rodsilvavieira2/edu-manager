import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Welcome } from "../screens";

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="home">
        <Screen name="home" component={Welcome} />
      </Navigator>
    </NavigationContainer>
  );
}
