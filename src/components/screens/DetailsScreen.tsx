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
  return (
    <SafeAreaView style={screenStyles.baseScreen}>
      <View
        style={{
          height: Constants.statusBarHeight,
        }}
      />

      <ScrollView
        style={screenStyles.baseScreenScrollView}
        contentContainerStyle={{ rowGap: 18 }}
      >
        <View>
          <ADIBEntry
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            height={300}
          >
            <ADText style={[{ textAlign: "center" }, textStyles.mediumHeading]}>
              This is a short description of the event
            </ADText>
            <ADText style={{ textAlign: "center" }}>Host</ADText>
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

            <ADVerticalDTStack dateText="MAY 23" timeText="9:00 AM" />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: 15,
                alignItems: "center",
              }}
            >
              <ADVerticalDTStack dateText="MAY 23" timeText="9:00 AM" />
              <ADText>to</ADText>
              <ADVerticalDTStack dateText="MAY 24" timeText="10:30 AM" />
            </View>
          </View>
        </View>

        <ADHPCard heading="Location" paragraph="Location" />

        <ADHPCard
          heading="Summary"
          paragraph="This is a summary about the event."
        />

        <ADPrimaryFilledButton text="Register" onPress={() => {}} />
        <ADDangerFilledButton text="Unregister" onPress={() => {}} />
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
