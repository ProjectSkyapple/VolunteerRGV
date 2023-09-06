import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import screenStyles from "../styles/screenStyles";
import ADText from "../ADText/ADText";
import { useState } from "react";
import HomeSubscreen from "./HomeSubscreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import ADFloatingActionButton from "../ADButtons/ADFloatingActionButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
        <View style={{ flex: 1, flexDirection: "row", columnGap: 18 }}>
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

        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} />
        </TouchableOpacity>
      </View>

      <HomeSubscreen type="feed" />

      <ADFloatingActionButton
        text="Share event"
        linearGradientColors={["#222", "#000"]}
        ioniconsGlyph="pencil-outline"
        onPress={() => {
          navigation.navigate("Share Event", { formType: "share" });
        }}
      />

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
    alignItems: "center",
  },
  selectedCustomTopTabText: {
    paddingVertical: 6,
    fontWeight: "600",
    fontSize: 16,
    borderBottomWidth: 2.5,
    opacity: 1,
  },
  unselectedCustomTopTabText: {
    paddingVertical: 6,
    fontWeight: "600",
    fontSize: 16,
    borderBottomWidth: 0,
    opacity: 0.33,
  },
});

export default HomeScreen;
