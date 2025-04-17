import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "./colors";

const screenStyles = StyleSheet.create({
  baseScreen: {
    flex: 1,
    backgroundColor: Colors.screenBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  baseScreenScrollView: {
    width: "100%",
  },
  baseScreenScrollViewContentContainer: {
    padding: 18,
  },
  baseSubscreen: {
    flex: 1,
    width: "100%",
  },
});

export default screenStyles;
