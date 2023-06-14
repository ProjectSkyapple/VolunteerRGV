import ADFilledButton from "./ADFilledButton";
import { Colors } from "../styles/colors";

interface ADPrimaryFilledButtonProps {
  text: string;
  onPress?: (...args: any[]) => void;
}

const ADPrimaryFilledButton = (props: ADPrimaryFilledButtonProps) => {
  return (
    <ADFilledButton
      linearGradientColors={[Colors.lightPrimaryColor, Colors.primaryColor]}
      text={props.text}
      onPress={props.onPress}
    />
  );
};

export default ADPrimaryFilledButton;
