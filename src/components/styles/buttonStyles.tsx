import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  baseButton: {
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  floatingActionButton: {
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 21,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  baseButtonText: {
    textAlign: "center",
    fontWeight: "600",
  },
  filledButtonTextAdditions: {
    color: "white",
  },
  floatingActionButtonPosition: {
    position: "absolute",
    bottom: 18,
    right: 18,
  },
});

export default buttonStyles;
