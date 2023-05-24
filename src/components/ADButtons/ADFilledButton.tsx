import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import buttonStyles from "../styles/buttonStyles";
import { useState } from "react";
import ADText from "../ADText/ADText";

interface ADFilledButtonProps {
  linearGradientColors: string[];
  text: string;
  onPress: () => void;
}

const ADFilledButton = (props: ADFilledButtonProps) => {
  const [lgColors, setLGColors] = useState(props.linearGradientColors);

  return (
    <Pressable
      onPressIn={() => {
        setLGColors([
          props.linearGradientColors[1],
          props.linearGradientColors[1],
        ]);
      }}
      onPressOut={() => {
        setLGColors(props.linearGradientColors);
      }}
      onPress={props.onPress}
    >
      <LinearGradient colors={lgColors} style={buttonStyles.baseButton}>
        <ADText
          style={[
            buttonStyles.baseButtonText,
            buttonStyles.filledButtonTextAdditions,
          ]}
        >
          {props.text}
        </ADText>
      </LinearGradient>
    </Pressable>
  );
};

export default ADFilledButton;
