import {
  FlatList,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import screenStyles from "../styles/screenStyles";
import ADText from "../ADText/ADText";
import ADIBEntry from "../ADEntries/ADIBEntry";
import textStyles from "../styles/textStyles";
import { useState } from "react";

type ItemData = {
  "Start Date": string;
  Blurb: string;
};

const MOCK_DATA: ItemData[] = [
  { "Start Date": "JUN 15", Blurb: "Event one" },
  { "Start Date": "JUN 16", Blurb: "Event two" },
  { "Start Date": "JUN 17", Blurb: "Event three" },
  { "Start Date": "JUN 18", Blurb: "Event four" },
];

interface EOViewerEventEntryProps {
  source?: ImageSourcePropType;
  isoDate: string;
  blurb: string;
  onPress?: () => void;
}

const EOViewerEventEntry = (props: EOViewerEventEntryProps) => {
  return (
    <TouchableOpacity>
      <ADIBEntry
        source={{ uri: "https://reactjs.org/logo-og.png" }}
        height={162}
      >
        <ADText>{props.isoDate}</ADText>
        <ADText style={textStyles.mediumHeading} numberOfLines={3}>
          {props.blurb}
        </ADText>
      </ADIBEntry>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [feedTabTextStyle, setFeedTabTextStyle] = useState(
    homeScreenStyles.selectedCustomTopTabText
  );
  const [followingTabTextStyle, setFollowingTabTextStyle] = useState(
    homeScreenStyles.unselectedCustomTopTabText
  );
  const [yourSharesTabTextStyle, setYourSharesTabTextStyle] = useState(
    homeScreenStyles.unselectedCustomTopTabText
  );

  const selectCustomTTBTab = (tab: string) => {
    if (tab === "Feed") {
      setFeedTabTextStyle(homeScreenStyles.selectedCustomTopTabText);
      setFollowingTabTextStyle(homeScreenStyles.unselectedCustomTopTabText);
      setYourSharesTabTextStyle(homeScreenStyles.unselectedCustomTopTabText);
    } else if (tab === "Following") {
      setFeedTabTextStyle(homeScreenStyles.unselectedCustomTopTabText);
      setFollowingTabTextStyle(homeScreenStyles.selectedCustomTopTabText);
      setYourSharesTabTextStyle(homeScreenStyles.unselectedCustomTopTabText);
    } else if (tab === "Your Shares") {
      setFeedTabTextStyle(homeScreenStyles.unselectedCustomTopTabText);
      setFollowingTabTextStyle(homeScreenStyles.unselectedCustomTopTabText);
      setYourSharesTabTextStyle(homeScreenStyles.selectedCustomTopTabText);
    }
  };

  return (
    <SafeAreaView style={screenStyles.baseScreen}>
      <View style={homeScreenStyles.customTTBView}>
        <Pressable
          onPress={() => {
            selectCustomTTBTab("Feed");
          }}
        >
          <ADText style={feedTabTextStyle}>Feed</ADText>
        </Pressable>
        <Pressable
          onPress={() => {
            selectCustomTTBTab("Following");
          }}
        >
          <ADText style={followingTabTextStyle}>Following</ADText>
        </Pressable>
        <Pressable
          onPress={() => {
            selectCustomTTBTab("Your Shares");
          }}
        >
          <ADText style={yourSharesTabTextStyle}>Your Shares</ADText>
        </Pressable>
      </View>

      <ScrollView
        style={screenStyles.baseScreenScrollView}
        contentContainerStyle={{ rowGap: 18 }}
      >
        <ADText
          style={[{ textAlign: "center", margin: 18 }, textStyles.largeHeading]}
        >
          Your feed.
        </ADText>

        <FlatList
          data={MOCK_DATA}
          renderItem={({ item }) => (
            <EOViewerEventEntry
              source={{ uri: "https://reactjs.org/logo-og.png" }}
              isoDate={item["Start Date"]}
              blurb={item["Blurb"]}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ padding: 9 }} />}
          /* TODO: ListEmptyComponent */
        />
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const homeScreenStyles = StyleSheet.create({
  customTTBView: {
    display: "flex",
    flexDirection: "row",
    columnGap: 18,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  selectedCustomTopTabText: {
    paddingVertical: 6,
    fontWeight: "600",
    borderBottomWidth: 3,
    opacity: 1,
  },
  unselectedCustomTopTabText: {
    paddingVertical: 6,
    fontWeight: "600",
    borderBottomWidth: 0,
    opacity: 0.33,
  },
});

export default HomeScreen;
