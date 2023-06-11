import { TextInput, TextInputProps, TextStyle, View } from "react-native";
import ADText from "../ADText/ADText";
import textInputStyles from "../styles/textInputStyles";

interface ADTextInputProps extends Omit<TextInputProps, "style"> {
  labelText?: string;
  textInputStyle?: TextStyle | TextStyle[];
}

const ADTextInput = (props: ADTextInputProps) => {
  return (
    <View style={textInputStyles.baseTextInputView}>
      {props.labelText && (
        <ADText style={{ fontWeight: "600" }}>{props.labelText}</ADText>
      )}
      <TextInput
        {...props}
        style={[textInputStyles.baseTextInput, props.textInputStyle]}
      />
    </View>
  );
};

export default ADTextInput;
