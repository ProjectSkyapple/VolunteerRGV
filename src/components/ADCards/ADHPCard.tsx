import { Text, View } from "react-native";
import cardStyles from "../styles/cardStyles";

interface ADHPCardProps {
  heading: string;
  paragraph: string;
}

const ADHPCard = (props: ADHPCardProps) => {
  return (
    <View style={cardStyles.baseCard}>
      <Text style={cardStyles.headingText}>{props.heading}</Text>
      <Text>{props.paragraph}</Text>
    </View>
  );
};

export default ADHPCard;
