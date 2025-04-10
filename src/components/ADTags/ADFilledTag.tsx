import { LinearGradient } from "expo-linear-gradient";
import tagStyles from "../styles/tagStyles";
import ADText from "../ADText/ADText";

interface ADFilledTagProps {
  linearGradientColors: string[];
  text: string;
}

const ADFilledTag = (props: ADFilledTagProps) => {
  return (
    <LinearGradient
      colors={props.linearGradientColors}
      style={tagStyles.baseTag}
    >
      <ADText style={[tagStyles.baseTagText, tagStyles.filledTagTextAdditions]}>
        {props.text}
      </ADText>
    </LinearGradient>
  );
};

export default ADFilledTag;
