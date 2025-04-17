import { Text, TextProps } from "react-native";
// import { useFonts } from "expo-font";

const ADText = (props: TextProps) => {
  /* TODO: Implement when React Native support for custom fonts on Android matures.
  const [loaded] = useFonts({
    WixMadeforDisplay: require("../../../assets/fonts/WixMadeforDisplay-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }
  */

  return <Text {...props} />;
};

export default ADText;
