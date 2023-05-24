import { Text, TextStyle } from "react-native";
// import { useFonts } from "expo-font";

interface ADTextProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

const ADText = (props: ADTextProps) => {
  /* TODO: Implement when React Native support for custom fonts on Android matures.
  const [loaded] = useFonts({
    WixMadeforDisplay: require("../../../assets/fonts/WixMadeforDisplay-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }
  */

  return <Text style={props.style}>{props.children}</Text>;
};

export default ADText;
