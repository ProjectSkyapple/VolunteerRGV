import { Text } from "react-native";

interface ADTextProps {
  children: string;
}

const ADText = (props: ADTextProps) => {
  return <Text style={{ fontFamily: "FiraSans" }}>{props.children}</Text>;
};

export default ADText;
