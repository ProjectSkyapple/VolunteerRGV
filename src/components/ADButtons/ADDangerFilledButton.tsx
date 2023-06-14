import ADFilledButton from "./ADFilledButton";
import { Colors } from "../styles/colors";

interface ADDangerFilledButtonProps {
  text: string;
  onPress?: (...args: any[]) => void;
}

const ADDangerFilledButton = (props: ADDangerFilledButtonProps) => {
  return (
    <ADFilledButton
      linearGradientColors={[Colors.dangerColor, Colors.darkDangerColor]}
      text={props.text}
      onPress={props.onPress}
    />
  );
};

export default ADDangerFilledButton;
