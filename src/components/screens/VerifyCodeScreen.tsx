import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Text, View } from "react-native";
import ADOutlinedButton from "../ADButtons/ADOutlinedButton";
import ADPrimaryFilledButton from "../ADButtons/ADPrimaryFilledButton";
import ADText from "../ADText/ADText";
import ADTextInput from "../ADTextInputs/ADTextInput";
import screenStyles from "../styles/screenStyles";
import textStyles from "../styles/textStyles";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const VerifyCodeScreen = () => {
  const [selectedSignUp, setSelectedSignUp] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <KeyboardAvoidingView
      style={[
        screenStyles.baseScreen,
        { justifyContent: "space-evenly", padding: 18 },
      ]}
    >
      <ADText style={textStyles.largeHeading}>Check your messages.</ADText>

      {selectedSignUp && (
        <Text>
          We sent a code to{" "}
          <Text style={{ fontWeight: "600" }}>9565551212</Text>. Enter this code
          below to officially create your account. Do not share this code with
          anyone.
        </Text>
      )}
      {!selectedSignUp && (
        <Text>
          To verify your identity, sign in with the code sent to{" "}
          <Text style={{ fontWeight: "600" }}>9565551212</Text>. Do not share
          this code with anyone.
        </Text>
      )}

      <View style={{ rowGap: 18, width: "100%" }}>
        <ADTextInput
          labelText="One-time passcode"
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
        />
      </View>

      <View
        style={{
          alignItems: "center",
          rowGap: 18,
          width: "100%",
        }}
      >
        <ADPrimaryFilledButton
          text="Verify code"
          onPress={() =>
            // TODO: Firebase Authentication stuff
            navigation.reset({ index: 1, routes: [{ name: "Home" }] })
          }
        />
        <ADOutlinedButton text="Resend code" />
      </View>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

export default VerifyCodeScreen;
