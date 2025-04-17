import { View } from "react-native";
import AuthenticationScreen from "./src/components/screens/AuthenticationScreen";
import DetailsScreen from "./src/components/screens/DetailsScreen";
import HomeScreen from "./src/components/screens/HomeScreen";
import ShareEventScreen from "./src/components/screens/ShareEventScreen";
import StatusBarArea from "./src/components/global/StatusBarArea";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Colors } from "./src/components/styles/colors";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const noHeaderScreen = { headerShown: false };

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState<string>(null);

  // The following effect determines and sets the initial route before hiding the splash screen.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      SecureStore.getItemAsync("airtableUserRecordId").then(
        (localAirtableUserRecordId) => {
          if (user && localAirtableUserRecordId) {
            setInitialRouteName("Home");
            unsubscribe(); // Unsubs auth state changed observer
            SplashScreen.hideAsync();
          } else {
            setInitialRouteName("Authentication");
            unsubscribe();
            SplashScreen.hideAsync();
          }
        },
        () => {
          setInitialRouteName("Authentication"); // If getItemAsync() fails
          unsubscribe();
          SplashScreen.hideAsync();
        }
      );
    });
    /*
    return () => {
      unsubscribe();
    };
    */
  }, []);

  if (initialRouteName == null) {
    // Initializing
    return null;
  }

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: Colors.screenBackgroundColor,
        height: "100%",
      }}
    >
      <StatusBarArea />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
            headerTintColor: "#000",
            headerStyle: {
              backgroundColor: Colors.screenBackgroundColor,
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
