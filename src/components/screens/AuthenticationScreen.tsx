import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Alert, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ADOutlinedButton from "../ADButtons/ADOutlinedButton";
import ADPrimaryFilledButton from "../ADButtons/ADPrimaryFilledButton";
import ADText from "../ADText/ADText";
import ADTextInput from "../ADTextInputs/ADTextInput";
import screenStyles from "../styles/screenStyles";
import textStyles from "../styles/textStyles";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Colors } from "../styles/colors";

const AuthenticationScreen = () => {
  const [signUpUIShown, setSignUpUIShown] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  return (
    <KeyboardAwareScrollView>
      <View
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
          <ADText style={textStyles.largeHeading}>
            Welcome back. Sign in.
          </ADText>
        )}

        <View style={{ rowGap: 18, width: "100%" }}>
          {signUpUIShown && (
            <ADTextInput
              labelText="Name"
              placeholder="Your Name"
              onChangeText={(newText) => setName(newText)}
            />
          )}
          <ADTextInput
            labelText="Email Address"
            inputMode="email"
            placeholder="someone@example.com"
            onChangeText={(newText) => setEmailAddress(newText)}
          />
          {signUpUIShown && (
            <ADTextInput
              labelText="Mobile Phone"
              inputMode="tel"
              maxLength={10}
              placeholder="9565551212"
              onChangeText={(newText) => setMobilePhone(newText)}
            />
          )}
          <ADTextInput
            labelText="Password"
            inputMode="text"
            secureTextEntry
            onChangeText={(newText) => setPassword(newText)}
          />
        </View>

        {!isAuthenticating && signUpUIShown && (
          <ADPrimaryFilledButton
            text="Create account"
            onPress={() => {
              setIsAuthenticating(true);

              createUserWithEmailAndPassword(auth, emailAddress, password)
                .then(() => {
                  // Signed in
                  setIsAuthenticating(false);
                  navigation.reset({ index: 0, routes: [{ name: "Home" }] });
                })
                .catch((error) => {
                  setIsAuthenticating(false);

                  const errorCode = error.code;
                  const errorMessage = error.message;

                  Alert.alert(
                    "Authentication Error",
                    errorMessage + " (Firebase error code " + errorCode + ")",
                    [{ text: "Dismiss" }]
                  );
                });
            }}
          />
        )}

        {!isAuthenticating && signUpUIShown && (
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

        {!isAuthenticating && !signUpUIShown && (
          <ADPrimaryFilledButton
            text="Sign in"
            onPress={() => {
              setIsAuthenticating(true);

              signInWithEmailAndPassword(auth, emailAddress, password)
                .then(() => {
                  // Signed in
                  setIsAuthenticating(false);
                  navigation.reset({ index: 0, routes: [{ name: "Home" }] });
                })
                .catch((error) => {
                  setIsAuthenticating(false);

                  const errorCode = error.code;
                  const errorMessage = error.message;

                  Alert.alert(
                    "Authentication Error",
                    errorMessage + " (Firebase error code " + errorCode + ")",
                    [{ text: "Dismiss" }]
                  );
                });
            }}
          />
        )}

        {!isAuthenticating && !signUpUIShown && (
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

        {isAuthenticating && (
          <ActivityIndicator color={Colors.primaryColor} size="large" />
        )}

        <StatusBar style="auto" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AuthenticationScreen;
