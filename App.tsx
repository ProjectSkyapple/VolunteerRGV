import { StatusBar } from "expo-status-bar";
import { Dimensions, View } from "react-native";
import AuthenticationScreen from "./src/components/screens/AuthenticationScreen";
import StatusBarArea from "./src/components/global/StatusBarArea";

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
      <AuthenticationScreen />
    </View>
  );
}
