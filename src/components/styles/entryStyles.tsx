import { StyleSheet } from "react-native";

const entryStyles = StyleSheet.create({
  baseEntryImageBackgroundStyle: {
    width: "100%",
  },
  baseEntryImageBackgroundImageStyle: {
    borderRadius: 15,
  },
  baseEntryBody: {
    display: "flex",
    rowGap: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 15,
    marginHorizontal: 15,
    padding: 15,
  },
});

export default entryStyles;
