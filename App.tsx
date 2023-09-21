import { View } from "react-native";
import AuthenticationScreen from "./src/components/screens/AuthenticationScreen";
import DetailsScreen from "./src/components/screens/DetailsScreen";
import HomeScreen from "./src/components/screens/HomeScreen";
import ShareEventScreen from "./src/components/screens/ShareEventScreen";
import StatusBarArea from "./src/components/global/StatusBarArea";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

const Stack = createStackNavigator();

const noHeaderScreen = { headerShown: false };

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
          screenOptions={{
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
            headerTintColor: "#000",
            headerStyle: {
              backgroundColor: "#EEE",
            },
          }}
        >
          <Stack.Screen
            name="Authentication"
            component={AuthenticationScreen}
            options={noHeaderScreen}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={noHeaderScreen}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="Share Event"
            component={ShareEventScreen}
            options={{ title: "Input Event Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
