import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
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

type RoutesParamList = {
  Details: {
    eventsList: string;
    details: EOEvent;
  };
};

export default function DetailsScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<RoutesParamList, "Details">>();

  const { eventsList, details } = route.params;

  const startDateShortString = toADMonthDayDateString(details.fields.Starts);
  const startTimeShortString = toADHourMinuteTimeString(details.fields.Starts);
  const endDateShortString = toADMonthDayDateString(details.fields.Ends);
  const endTimeShortString = toADHourMinuteTimeString(details.fields.Ends);

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
          <ADPrimaryFilledButton text="Follow" onPress={() => {}} />
        )}
        {eventsList === "following" && (
          <ADDangerFilledButton text="Unfollow" onPress={() => {}} />
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
