import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import buttonStyles from "../styles/buttonStyles";
import { useState } from "react";
import ADText from "../ADText/ADText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import _default from "@expo/vector-icons/build/Ionicons";

// Extract Ionicons icon names (glyphs) as a type from Icon generic
type ExtractGlyphs<I> = I extends Icon<infer G, "ionicons"> ? G : never;

interface ADFloatingActionButtonProps {
  linearGradientColors: string[];
  text: string;
  ioniconsGlyph: ExtractGlyphs<typeof _default>;
  onPress?: (...args: any[]) => any;
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
      style={buttonStyles.floatingActionButtonPosition}
    >
      <LinearGradient
        colors={lgColors}
        style={buttonStyles.floatingActionButton}
      >
        <Ionicons name={props.ioniconsGlyph} size={24} color="white" />
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
