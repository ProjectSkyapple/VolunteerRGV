import { StatusBar } from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ADPrimaryFilledButton from "../ADButtons/ADPrimaryFilledButton";
import ADDangerFilledButton from "../ADButtons/ADDangerFilledButton";
import ADHPCard from "../ADCards/ADHPCard";
import ADIBEntry from "../ADEntries/ADIBEntry";
import textStyles from "../styles/textStyles";
import Constants from "expo-constants";
import ADText from "../ADText/ADText";
import HomeScreen from "../screens/HomeScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import screenStyles from "../styles/screenStyles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { EOEvent } from "../../types/EOEvent";
import {
  requireImageBackground,
  toADHourMinuteTimeString,
  toADMonthDayDateString,
} from "../../functions/functions";
import { RoutesParamList } from "../../types/RoutesParamList";
import * as SecureStore from "expo-secure-store";
import { AIRTABLE_BASE_ID, AIRTABLE_PERSONAL_ACCESS_TOKEN } from "@env";
import ADOutlinedButton from "../ADButtons/ADOutlinedButton";

interface ADVerticalDTStackProps {
  dateText: string;
  timeText: string;
}

const ADVerticalDTStack = (props: ADVerticalDTStackProps) => {
  return (
    <View>
      <ADText style={{ textAlign: "center" }}>{props.dateText}</ADText>
      <ADText
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        {props.timeText}
      </ADText>
    </View>
  );
};

export default function DetailsScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<RoutesParamList, "Details">>();

  const { eventsList, details } = route.params;

  const startDateShortString = toADMonthDayDateString(details.fields.Starts);
  const startTimeShortString = toADHourMinuteTimeString(details.fields.Starts);
  const endDateShortString = toADMonthDayDateString(details.fields.Ends);
  const endTimeShortString = toADHourMinuteTimeString(details.fields.Ends);

  const followEvent = async () => {
    // TODO: Handle Airtable "record not found" exceptions

    let airtableUserRecordId = await SecureStore.getItemAsync(
      "airtableUserRecordId"
    );

    let airtableApiUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Events/${details.id}`;

    let eventResponse = await fetch(airtableApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      },
    });

    let eventResponseJson: EOEvent = await eventResponse.json();
    let newFollowersList: string[];

    // When returning a record, the Airtable API doesn't return the record's "empty" or falsy fields.
    if (eventResponseJson.fields.hasOwnProperty("Followers")) {
      // If returned record has followers
      eventResponseJson.fields.Followers.push(airtableUserRecordId);
      newFollowersList = eventResponseJson.fields.Followers;
    } else {
      // If returned record doesn't have followers
      newFollowersList = [airtableUserRecordId];
    }

    let followResponse = await fetch(airtableApiUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Followers: newFollowersList,
        },
      }),
    });

    return followResponse.json();
  };

  const unfollowEvent = async () => {
    // TODO: Handle Airtable "record not found" exceptions

    let airtableUserRecordId = await SecureStore.getItemAsync(
      "airtableUserRecordId"
    );

    let airtableApiUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Events/${details.id}`;

    let eventResponse = await fetch(airtableApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      },
    });

    let eventResponseJson: EOEvent = await eventResponse.json();

    let followResponse = await fetch(airtableApiUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Followers: eventResponseJson.fields.Followers.filter((recordId) => {
            recordId !== airtableUserRecordId;
          }),
        },
      }),
    });

    return followResponse.json();
  };

  return (
    <SafeAreaView style={screenStyles.baseScreen}>
      <ScrollView
        style={screenStyles.baseScreenScrollView}
        contentContainerStyle={[
          { rowGap: 18 },
          screenStyles.baseScreenScrollViewContentContainer,
        ]}
      >
        <View>
          <ADIBEntry
            source={requireImageBackground(details.fields["Image Background"])}
            height={300}
          >
            <ADText style={[{ textAlign: "center" }, textStyles.mediumHeading]}>
              {details.fields.Blurb}
            </ADText>
            <ADText style={{ textAlign: "center" }}>
              {details.fields.Host}
            </ADText>
          </ADIBEntry>

          <View style={styles.dateAndTime}>
            <View
              style={{
                height: 15,
                borderTopWidth: 0.5,
                borderTopColor: "#DDD",
                width: "87.5%",
              }}
            />

            {startDateShortString === endDateShortString ? (
              <ADVerticalDTStack
                dateText={startDateShortString}
                timeText={`${startTimeShortString} – ${endTimeShortString}`}
              />
            ) : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: 15,
                  alignItems: "center",
                }}
              >
                <ADVerticalDTStack
                  dateText={startDateShortString}
                  timeText={startTimeShortString}
                />
                <ADText>to</ADText>
                <ADVerticalDTStack
                  dateText={endDateShortString}
                  timeText={endTimeShortString}
                />
              </View>
            )}
          </View>
        </View>

        <ADHPCard heading="Location" paragraph={details.fields.Location} />

        <ADHPCard heading="Summary" paragraph={details.fields.Summary} />

        {eventsList === "feed" && (
          <ADPrimaryFilledButton
            text="Follow"
            onPress={() => {
              followEvent().then(() => {
                Alert.alert(
                  "Event Followed!",
                  "The event has been added to your Following list.",
                  [{ text: "OK" }]
                );
                navigation.navigate("Home");
              });
            }}
          />
        )}
        {eventsList === "following" && (
          <ADDangerFilledButton
            text="Unfollow"
            onPress={() => {
              unfollowEvent().then(() => {
                navigation.navigate("Home");
              });
            }}
          />
        )}
        {eventsList === "your-shares" && (
          <ADOutlinedButton
            text="Edit"
            onPress={() => {
              navigation.navigate("Share Event", {
                formType: "share",
                details: details,
              });
            }}
          />
        )}
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );

  // return <AuthenticationScreen />;
}

const styles = StyleSheet.create({
  dateAndTime: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginHorizontal: 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
});
