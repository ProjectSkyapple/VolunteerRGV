import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ADPrimaryFilledButton from "./src/components/ADButtons/ADPrimaryFilledButton";
import ADDangerFilledButton from "./src/components/ADButtons/ADDangerFilledButton";
import ADHPCard from "./src/components/ADCards/ADHPCard";
import ADIBEntry from "./src/components/ADEntries/ADIBEntry";
import textStyles from "./src/components/styles/textStyles";
import Constants from "expo-constants";
import ADText from "./src/components/ADText/ADText";

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

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: Constants.statusBarHeight,
        }}
      />

      <ScrollView
        style={styles.scrollView}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    padding: 18,
    width: "100%",
  },
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