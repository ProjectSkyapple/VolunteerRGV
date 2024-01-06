import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ADPrimaryFilledButton from "../ADButtons/ADPrimaryFilledButton";
import ADDangerFilledButton from "../ADButtons/ADDangerFilledButton";
import ADText from "../ADText/ADText";
import ADTextInput from "../ADTextInputs/ADTextInput";
import screenStyles from "../styles/screenStyles";
import textStyles from "../styles/textStyles";
import { ReactNode, useRef, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RoutesParamList } from "../../types/RoutesParamList";
import { Colors } from "../styles/colors";
import Checkbox from "expo-checkbox";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as SecureStore from "expo-secure-store";
import { AIRTABLE_BASE_ID, AIRTABLE_PERSONAL_ACCESS_TOKEN } from "@env";

interface ADFormRowProps {
  labelText: string;
  inputComponent: ReactNode;
}

const ADFormRow = (props: ADFormRowProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ADText style={{ fontWeight: "600" }}>{props.labelText}</ADText>
      {props.inputComponent}
    </View>
  );
};

const ShareEventScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<RoutesParamList, "Share Event">>();

  const shareEventRouteParams = route.params;
  const eventFormType = shareEventRouteParams.formType;

  let initialBlurb;
  let initialHost;
  let initialStartDate;
  let initialStartTime;
  let initialEndDate;
  let initialEndTime;
  let initialLocationType;
  let initialIsLocationTypeCheckboxChecked;
  let initialLocationAddress;
  let initialSummary;

  let initialStartDateObject;
  let initialEndDateObject;

  if (eventFormType === "share") {
    initialStartDateObject = new Date(Date.now() + 7 * 86400000);
    initialEndDateObject = new Date(Date.now() + 7 * 86400000);

    initialBlurb = "";
    initialHost = "";
    initialLocationType = "In-Person";
    initialIsLocationTypeCheckboxChecked = false;
    initialLocationAddress = "";
    initialSummary = "";
  } else if (eventFormType === "edit") {
    initialStartDateObject = new Date(
      shareEventRouteParams.details.fields.Starts
    );
    initialEndDateObject = new Date(shareEventRouteParams.details.fields.Ends);

    initialBlurb = shareEventRouteParams.details.fields.Blurb;
    initialHost = shareEventRouteParams.details.fields.Host;
    initialLocationType = shareEventRouteParams.details.fields["Location Type"];
    initialIsLocationTypeCheckboxChecked = (() => {
      return initialLocationType === "Virtual" ? true : false;
    })();
    initialLocationAddress = shareEventRouteParams.details.fields.Location;
    initialSummary = shareEventRouteParams.details.fields.Summary;
  }

  const startDateObject = useRef(initialStartDateObject);
  const endDateObject = useRef(initialEndDateObject);
  const earliestAllowableDate = useRef(new Date());

  const [blurb, setBlurb] = useState(initialBlurb);
  const [host, setHost] = useState(initialHost);
  const [startDate, setStartDate] = useState(
    startDateObject.current.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );
  const [startTime, setStartTime] = useState(
    startDateObject.current.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
  );
  const [endDate, setEndDate] = useState(
    endDateObject.current.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );
  const [endTime, setEndTime] = useState(
    endDateObject.current.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
  );
  const [locationType, setLocationType] = useState(initialLocationType);
  const [isLocationTypeCheckboxChecked, setIsLocationTypeCheckboxChecked] =
    useState(initialIsLocationTypeCheckboxChecked);
  const [locationAddress, setLocationAddress] = useState(
    initialLocationAddress
  );
  const [summary, setSummary] = useState(initialSummary);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isStartDatePickerShown, setIsStartDatePickerShown] = useState(false);
  const [isStartTimePickerShown, setIsStartTimePickerShown] = useState(false);
  const [isEndDatePickerShown, setIsEndDatePickerShown] = useState(false);
  const [isEndTimePickerShown, setIsEndTimePickerShown] = useState(false);
  const [startDateISOString, setStartDateISOString] = useState(
    startDateObject.current.toISOString()
  );
  const [endDateISOString, setEndDateISOString] = useState(
    endDateObject.current.toISOString()
  );

  const validateInput = () => {
    return startDateISOString >= endDateISOString ? false : true;
  };

  const createAirtableEventRecord = async () => {
    let airtableUserRecordId = await SecureStore.getItemAsync(
      "airtableUserRecordId"
    );

    let eventDataInput = JSON.stringify({
      fields: {
        Blurb: blurb,
        Host: host,
        Starts: startDateISOString,
        Ends: endDateISOString,
        Location: locationAddress,
        "Location Type": locationType,
        Summary: summary,
        Status: "In Review",
        "Shared By": [airtableUserRecordId],
        "Image Background": "" + Math.ceil(Math.random() * 4) + 1, // Returns integer strings "1" to "5" inclusive
      },
    });

    let createdEventResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: eventDataInput,
      }
    );

    return createdEventResponse.json();
  };

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

          <ADFormRow
            labelText="Starts"
            inputComponent={
              <View style={{ flexDirection: "row", columnGap: 15 }}>
                <Pressable
                  onPress={() => {
                    setIsStartDatePickerShown(true);
                  }}
                >
                  <ADText>{startDate}</ADText>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsStartTimePickerShown(true);
                  }}
                >
                  <ADText>{startTime}</ADText>
                </Pressable>
              </View>
            }
          />
          {isStartDatePickerShown && (
            <RNDateTimePicker
              value={startDateObject}
              mode="date"
              minimumDate={earliestAllowableDate}
              onChange={(event, date) => {
                startDateObject = date;
                setIsStartDatePickerShown(false);
                setStartDate(
                  startDateObject.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                );
                setStartDateISOString(startDateObject.toISOString());
              }}
            />
          )}
          {isStartTimePickerShown && (
            <RNDateTimePicker
              value={startDateObject}
              mode="time"
              onChange={(event, date) => {
                startDateObject = date;
                setIsStartTimePickerShown(false);
                setStartTime(
                  startDateObject.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })
                );
                setStartDateISOString(startDateObject.toISOString());
              }}
            />
          )}

          <ADFormRow
            labelText="Ends"
            inputComponent={
              <View style={{ flexDirection: "row", columnGap: 15 }}>
                <Pressable
                  onPress={() => {
                    setIsEndDatePickerShown(true);
                  }}
                >
                  <ADText>{endDate}</ADText>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setIsEndTimePickerShown(true);
                  }}
                >
                  <ADText>{endTime}</ADText>
                </Pressable>
              </View>
            }
          />
          {isEndDatePickerShown && (
            <RNDateTimePicker
              value={endDateObject}
              mode="date"
              minimumDate={earliestAllowableDate}
              onChange={(event, date) => {
                endDateObject = date;
                setIsEndDatePickerShown(false);
                setEndDate(
                  endDateObject.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                );
                setEndDateISOString(endDateObject.toISOString());
              }}
            />
          )}
          {isEndTimePickerShown && (
            <RNDateTimePicker
              value={endDateObject}
              mode="time"
              onChange={(event, date) => {
                endDateObject = date;
                setIsEndTimePickerShown(false);
                setEndTime(
                  endDateObject.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })
                );
                setEndDateISOString(endDateObject.toISOString());
              }}
            />
          )}

          <ADFormRow
            labelText="Virtual Location?"
            inputComponent={
              <Checkbox
                value={isLocationTypeCheckboxChecked}
                onValueChange={() => {
                  if (!isLocationTypeCheckboxChecked) {
                    setLocationType("Virtual");
                    setIsLocationTypeCheckboxChecked(true);
                  } else {
                    setLocationType("In-Person");
                    setIsLocationTypeCheckboxChecked(false);
                  }
                }}
                color={Colors.primaryColor}
              />
            }
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

        {eventFormType === "share" && !isRequesting && (
          <ADPrimaryFilledButton
            text="Send event for review"
            onPress={() => {
              if (validateInput()) {
                setIsRequesting(true);
                createAirtableEventRecord().then(() => {
                  setIsRequesting(false);
                  Alert.alert(
                    "Event Sent!",
                    "The event has been sent for review.",
                    [{ text: "OK" }]
                  );
                  navigation.navigate("Home");
                });
              } else {
                Alert.alert(
                  "Input Error",
                  "The event cannot end before it starts.",
                  [{ text: "Dismiss" }]
                );
              }
            }}
          />
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
