import { StyleSheet } from "react-native";

const cardStyles = StyleSheet.create({
  baseCard: {
    display: "flex",
    flexDirection: "column",
    rowGap: 3,
    borderRadius: 12,
    padding: 15,
    backgroundColor: "white",
    width: "100%",
  },
  headingText: {
    fontWeight: "600",
  },
});

export default cardStyles;
