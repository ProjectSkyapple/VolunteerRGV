import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ADPrimaryFilledButton from "../ADButtons/ADPrimaryFilledButton";
import ADDangerFilledButton from "../ADButtons/ADDangerFilledButton";
import ADText from "../ADText/ADText";
import ADTextInput from "../ADTextInputs/ADTextInput";
import screenStyles from "../styles/screenStyles";
import textStyles from "../styles/textStyles";
import { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RoutesParamList } from "../../types/RoutesParamList";
import { Colors } from "../styles/colors";

const ShareEventScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<RoutesParamList, "Share Event">>();

  const shareEventRouteParams = route.params;
  const eventFormType = shareEventRouteParams.formType;

  const [blurb, setBlurb] = useState("");
  const [host, setHost] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [locationType, setLocationType] = useState("In-Person");
  const [locationAddress, setLocationAddress] = useState("");
  const [summary, setSummary] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  return (
    <KeyboardAwareScrollView>
      <View
        style={[
          screenStyles.baseScreen,
          { justifyContent: "space-evenly", padding: 18 },
        ]}
      >
        {eventFormType === "share" && (
          <ADText style={textStyles.largeHeading}>
            Share an event you know.
          </ADText>
        )}
        {eventFormType === "edit" && (
          <ADText style={textStyles.largeHeading}>Edit this event.</ADText>
        )}

        <Text>
          Shared events should follow the Shared Event Guidelines and are
          subject to review.
        </Text>

        <View style={{ rowGap: 18, width: "100%" }}>
          <ADTextInput
            labelText="Blurb"
            placeholder="Event Name or call to action"
            onChangeText={(newText) => setBlurb(newText)}
          />
          <ADTextInput
            labelText="Host"
            placeholder="Host Name"
            onChangeText={(newText) => setHost(newText)}
          />
          <ADTextInput
            labelText="Location Address"
            placeholder="999 Anystreet Rd, Harlingen, TX"
            onChangeText={(newText) => setLocationAddress(newText)}
          />
          <ADTextInput
            labelText="Summary"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholder="Include any other important information potential participants need to know such as contact information in this box."
            onChangeText={(newText) => setSummary(newText)}
          />
        </View>

        {eventFormType === "share" && (
          <ADPrimaryFilledButton text="Send event for review" />
        )}
        {eventFormType === "edit" && (
          <ADPrimaryFilledButton text="Send edits for review" />
        )}

        {eventFormType == "edit" && (
          <View
            style={{
              alignItems: "center",
              rowGap: 18,
              width: "100%",
            }}
          >
            <ADText>Is the event no longer happening?</ADText>
            <ADDangerFilledButton text="Cancel event" onPress={() => {}} />
          </View>
        )}

        {isRequesting && (
          <ActivityIndicator color={Colors.primaryColor} size="large" />
        )}

        <StatusBar style="auto" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ShareEventScreen;
