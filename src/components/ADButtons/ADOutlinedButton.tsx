import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import buttonStyles from "../styles/buttonStyles";
import { useState } from "react";
import ADText from "../ADText/ADText";

interface ADOutlinedButtonProps {
  text: string;
  onPress?: (...args: any[]) => any;
}

const ADOutlinedButton = (props: ADOutlinedButtonProps) => {
  const [color, setColor] = useState("#FFF0");

  return (
    <Pressable
      onPressIn={() => {
        setColor("#DDD");
      }}
      onPressOut={() => {
        setColor("#FFF0");
      }}
      onPress={props.onPress}
      style={{ width: "100%" }}
    >
      <LinearGradient
        colors={[color, color]}
        style={[
          buttonStyles.baseButton,
          { borderColor: "#000", borderWidth: 1.5 },
        ]}
      >
        <ADText style={[buttonStyles.baseButtonText]}>{props.text}</ADText>
      </LinearGradient>
    </Pressable>
  );
};

export default ADOutlinedButton;
