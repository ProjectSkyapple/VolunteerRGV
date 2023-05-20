import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text } from "react-native";
import buttonStyles from "../styles/buttonStyles";
import { useState } from "react";

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
        <Text
          style={[
            buttonStyles.baseButtonText,
            buttonStyles.filledButtonTextAdditions,
          ]}
        >
          {props.text}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export default ADFilledButton;
