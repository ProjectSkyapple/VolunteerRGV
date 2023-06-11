import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, View } from "react-native";
import ADOutlinedButton from "../ADButtons/ADOutlinedButton";
import ADPrimaryFilledButton from "../ADButtons/ADPrimaryFilledButton";
import ADText from "../ADText/ADText";
import ADTextInput from "../ADTextInputs/ADTextInput";
import screenStyles from "../styles/screenStyles";
import textStyles from "../styles/textStyles";
import { useState } from "react";

const AuthenticationScreen = () => {
  const [signUpUIShown, setSignUpUIShown] = useState(true);

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
        <ADTextInput
          labelText="Email Address"
          inputMode="email"
          placeholder="someone@example.com"
        />
        {signUpUIShown && (
          <ADTextInput
            labelText="Mobile Phone"
            inputMode="tel"
            maxLength={10}
            placeholder="9565551212"
          />
        )}
      </View>

      {signUpUIShown && <ADPrimaryFilledButton text="Create account" />}

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

      {!signUpUIShown && <ADPrimaryFilledButton text="Sign in" />}

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