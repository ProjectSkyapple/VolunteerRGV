import { Text, TextProps } from "react-native";
// import { useFonts } from "expo-font";

/*
interface ADTextProps {
  children?: string;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
}
*/

const ADText = (props: TextProps) => {
  /* TODO: Implement when React Native support for custom fonts on Android matures.
  const [loaded] = useFonts({
    WixMadeforDisplay: require("../../../assets/fonts/WixMadeforDisplay-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }
  */

  return (
    <Text
      style={props.style}
      numberOfLines={props.numberOfLines}
      selectable={props.selectable}
    >
      {props.children}
    </Text>
  );
};

export default ADText;
