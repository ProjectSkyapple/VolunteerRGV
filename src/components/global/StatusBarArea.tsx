import { View } from "react-native";
import Constants from "expo-constants";

export default function StatusBarArea() {
  return (
    <View
      style={{
        height: Constants.statusBarHeight,
      }}
    />
  );
}
