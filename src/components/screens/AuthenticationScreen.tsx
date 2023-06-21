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
import { auth, firestore } from "../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Colors } from "../styles/colors";
import { airtableBase } from "../../../airtableConfig";
import { FieldSet, Records } from "airtable";
import * as SecureStore from "expo-secure-store";

const AuthenticationScreen = () => {
  const [signUpUIShown, setSignUpUIShown] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [airtableUserRecordIdState, storeAirtableUserRecordIdState] =
    useState("");

  const createAirtableUserRecord = (
    mobilePhone: string,
    name: string,
    emailAddress: string
  ) => {
    return new Promise(
      (resolve: (value: Records<FieldSet>) => void, reject) => {
        airtableBase("Users").create(
          [
            {
              fields: {
                Phone: mobilePhone,
                Name: name,
                "Email Address": emailAddress,
                "Account Status": "Opened",
              },
            },
          ],
          (err, records) => {
            if (err) {
              reject(err);
            } else if (records) {
              resolve(records);
            }
          }
        );
      }
    );
  };

  const storeAirtableUserRecordIdLocallyDuringSignUp = async (
    records: Records<FieldSet>
  ) => {
    let recordId: string = await new Promise(
      (resolve: (value: string) => void) => {
        records.forEach((record) => {
          storeAirtableUserRecordIdState(record.getId());
          resolve(record.getId());
        });
      }
    );

    return SecureStore.setItemAsync("airtableUserRecordId", recordId);
  };

  const storeAirtableUserRecordIdOnFirestore = (
    uid: string,
    airtableUserRecordId: string
  ) => {
    return setDoc(doc(firestore, "users", uid), {
      airtableUserRecordId: airtableUserRecordId,
    });
  };

  const getAndStoreAirtableUserRecordIdLocallyDuringSignIn = async (
    uid: string
  ) => {
    const firestoreUserDocRef = doc(firestore, "users", uid);
    const firestoreUserDocSnap = await getDoc(firestoreUserDocRef);

    if (firestoreUserDocSnap.exists()) {
      return SecureStore.setItemAsync(
        "airtableUserRecordId",
        firestoreUserDocSnap.data().airtableUserRecordId
      );
    } else {
      // .data() is undefined
      return new Promise((reject: (value: string) => void) => {
        reject(
          "Airtable user record ID could not be found on Firebase Cloud Firestore."
        );
      });
    }
  };

  const showErrorAlert = (errorType: string, errorMessage: string) => {
    Alert.alert(`${errorType} Error`, errorMessage, [{ text: "Dismiss" }]);
  };

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

              createAirtableUserRecord(mobilePhone, name, emailAddress)
                .then((records) => {
                  return storeAirtableUserRecordIdLocallyDuringSignUp(records);
                })
                .then(() => {
                  return createUserWithEmailAndPassword(
                    auth,
                    emailAddress,
                    password
                  );
                })
                .then((userCredential) => {
                  // Signed in on Firebase Authentication
                  return storeAirtableUserRecordIdOnFirestore(
                    userCredential.user.uid,
                    airtableUserRecordIdState
                  );
                })
                .then(() => {
                  setIsAuthenticating(false);
                  navigation.reset({ index: 0, routes: [{ name: "Home" }] });
                })
                .catch((error) => {
                  setIsAuthenticating(false);
                  showErrorAlert(
                    "Authentication",
                    `We couldn't authenticate your account. ${error as string}`
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
                .then((userCredential) => {
                  return getAndStoreAirtableUserRecordIdLocallyDuringSignIn(
                    userCredential.user.uid
                  );
                })
                .then(() => {
                  // Signed in
                  setIsAuthenticating(false);
                  navigation.reset({ index: 0, routes: [{ name: "Home" }] });
                })
                .catch((error) => {
                  setIsAuthenticating(false);
                  showErrorAlert(
                    "Authentication",
                    `We couldn't sign you in. ${error as string}`
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
