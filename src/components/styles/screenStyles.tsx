import { Dimensions, StyleSheet } from "react-native";

const screenStyles = StyleSheet.create({
  baseScreen: {
    flex: 1,
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  baseScreenScrollView: {
    padding: 18,
    width: "100%",
  },
  baseSubscreen: {
    flex: 1,
    width: "100%",
  },
});

export default screenStyles;
