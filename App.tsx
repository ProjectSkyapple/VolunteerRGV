import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ADFilledButton from "./src/components/ADButtons/ADFilledButton";

export default function App() {
  return (
    <View style={styles.container}>
      <ADFilledButton
        linearGradientColors={["#30A8FF", "#0061FF"]}
        text="Hello!"
        onPress={() => {}}
      />
      <ADFilledButton
        linearGradientColors={["#FF0000", "#CF0000"]}
        text="Hello!"
        onPress={() => {}}
      />
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
