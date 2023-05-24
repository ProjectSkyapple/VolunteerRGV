import { View } from "react-native";
import cardStyles from "../styles/cardStyles";
import ADText from "../ADText/ADText";

interface ADHPCardProps {
  heading: string;
  paragraph: string;
}

const ADHPCard = (props: ADHPCardProps) => {
  return (
    <View style={cardStyles.baseCard}>
      <ADText style={cardStyles.headingText}>{props.heading}</ADText>
      <ADText>{props.paragraph}</ADText>
    </View>
  );
};

export default ADHPCard;
