import { View } from "react-native";
import AuthenticationScreen from "./src/components/screens/AuthenticationScreen";
import DetailsScreen from "./src/components/screens/DetailsScreen";
import HomeScreen from "./src/components/screens/HomeScreen";
import VerifyCodeScreen from "./src/components/screens/VerifyCodeScreen";
import StatusBarArea from "./src/components/global/StatusBarArea";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#EEE",
        height: "100%",
      }}
    >
      <StatusBarArea />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Authentication"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Authentication"
            component={AuthenticationScreen}
          />
          <Stack.Screen name="Verify Code" component={VerifyCodeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
