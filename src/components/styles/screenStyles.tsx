import { Dimensions, StyleSheet } from "react-native";

const screenStyles = StyleSheet.create({
  baseScreen: {
    flex: 1,
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  baseScreenScrollView: {
    padding: 18,
    width: "100%",
  },
});

export default screenStyles;