import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import buttonStyles from "../styles/buttonStyles";
import { useState } from "react";
import ADText from "../ADText/ADText";

interface ADFloatingActionButtonProps {
  linearGradientColors: string[];
  text: string;
  onPress?: (...args: any[]) => void;
}

const ADFloatingActionButton = (props: ADFloatingActionButtonProps) => {
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
      style={{ width: "100%" }}
    >
      <LinearGradient
        colors={lgColors}
        style={buttonStyles.floatingActionButton}
      >
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

export default ADFloatingActionButton;
