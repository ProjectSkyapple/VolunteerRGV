import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  baseButton: {
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  floatingActionButton: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  baseButtonText: {
    textAlign: "center",
    fontWeight: "600",
  },
  filledButtonTextAdditions: {
    color: "white",
  },
});

export default buttonStyles;
