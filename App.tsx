import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ADPrimaryFilledButton from "./src/components/ADButtons/ADPrimaryFilledButton";
import ADDangerFilledButton from "./src/components/ADButtons/ADDangerFilledButton";

export default function App() {
  return (
    <View style={styles.container}>
      <ADPrimaryFilledButton text="Primary" onPress={() => {}} />
      <ADDangerFilledButton text="Danger" onPress={() => {}} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
