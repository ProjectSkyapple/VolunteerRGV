import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, View } from "react-native";
import ADOutlinedButton from "../ADButtons/ADOutlinedButton";
import ADPrimaryFilledButton from "../ADButtons/ADPrimaryFilledButton";
import ADText from "../ADText/ADText";
import ADTextInput from "../ADTextInputs/ADTextInput";
import screenStyles from "../styles/screenStyles";
import textStyles from "../styles/textStyles";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const AuthenticationScreen = () => {
  const [signUpUIShown, setSignUpUIShown] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const authenticate = () => {
    // TODO: Firebase Authentication stuff
    navigation.navigate("Verify Code");
  };

  return (
    <KeyboardAvoidingView
      style={[
        screenStyles.baseScreen,
        { justifyContent: "space-evenly", padding: 18 },
      ]}
    >
      {signUpUIShown && (
        <ADText style={textStyles.largeHeading}>
          Welcome! Let's create an account.
        </ADText>
      )}
      {!signUpUIShown && (
        <ADText style={textStyles.largeHeading}>Welcome back. Sign in.</ADText>
      )}

      <View style={{ rowGap: 18, width: "100%" }}>
        {signUpUIShown && (
          <ADTextInput labelText="Name" placeholder="Your Name" />
        )}
        {signUpUIShown && (
          <ADTextInput
            labelText="Email Address"
            inputMode="email"
            placeholder="someone@example.com"
          />
        )}
        <ADTextInput
          labelText="Mobile Phone"
          inputMode="tel"
          maxLength={10}
          placeholder="9565551212"
        />
      </View>

      {signUpUIShown && (
        <ADPrimaryFilledButton
          text="Create account"
          onPress={() => {
            authenticate();
          }}
        />
      )}

      {signUpUIShown && (
        <View
          style={{
            alignItems: "center",
            rowGap: 18,
            width: "100%",
          }}
        >
          <ADText>Already have an account?</ADText>
          <ADOutlinedButton
            text="Sign in with an existing account"
            onPress={() => setSignUpUIShown(false)}
          />
        </View>
      )}

      {!signUpUIShown && (
        <ADPrimaryFilledButton
          text="Sign in"
          onPress={() => {
            authenticate();
          }}
        />
      )}

      {!signUpUIShown && (
        <View
          style={{
            alignItems: "center",
            rowGap: 18,
            width: "100%",
          }}
        >
          <ADText>Don't have an account?</ADText>
          <ADOutlinedButton
            text="Create an account"
            onPress={() => setSignUpUIShown(true)}
          />
        </View>
      )}

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

export default AuthenticationScreen;
