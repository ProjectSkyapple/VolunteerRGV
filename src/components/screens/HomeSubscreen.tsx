import { FlatList, View } from "react-native";
import ADText from "../ADText/ADText";
import EOViewerEventEntry from "../ADEntries/EOViewerEventEntry";
import screenStyles from "../styles/screenStyles";
import textStyles from "../styles/textStyles";
import { EOEvent } from "../../types/EOEvent";
import { useCallback, useState } from "react";
import { AIRTABLE_BASE_ID, AIRTABLE_PERSONAL_ACCESS_TOKEN } from "@env";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Return user's Airtable Feed
const returnAirtableEventsListUrl = (
  user: string,
  type: "feed" | "following" | "your-shares"
) => {
  switch (type) {
    case "feed":
      return encodeURI(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Events?filterByFormula=AND(NOT({Status} = "Canceled"), NOT(SEARCH("${user}", {Rollup: Shared By})), NOT(SEARCH("${user}", {Rollup: Followers})))&sort[0][field]=Starts&sort[0][direction]=asc&view=Grid view`
      ); // Feed list displays only events that are (1) not canceled (but scheduled, had details changed/scheduled with changes, or in review/not approved yet), (2) not shared by the user, and (3) not followed by the user.
    case "following": // TODO: Get user's Airtable Following events from Airtable Users table instead
      return encodeURI(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Events?filterByFormula=SEARCH("${user}", {Rollup: Followers})&sort[0][field]=Starts&sort[0][direction]=asc&view=Grid view`
      );
    case "your-shares": // TODO: Same here
      return encodeURI(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Events?filterByFormula=SEARCH("${user}", {Rollup: Shared By})&sort[0][field]=Starts&sort[0][direction]=asc&view=Grid view`
      );
  }
};

interface HomeSubscreenProps {
  type?: "feed" | "following" | "your-shares";
  data?: any;
}

const HomeSubscreen = (props: HomeSubscreenProps) => {
  const [eventsData, setEventsData] = useState<EOEvent[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const fetchEvents = async () => {
    let airtableUserRecordId = await SecureStore.getItemAsync(
      "airtableUserRecordId"
    );

    let eventsResponse = await fetch(
      returnAirtableEventsListUrl(airtableUserRecordId, props.type),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        },
      }
    );

    return eventsResponse.json();
  };

  const showStatus = () => {
    switch (props.type) {
      case "feed":
        return false;
      case "following":
        return true;
      case "your-shares":
        return true;
      default:
        return false;
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsRefreshing(true);
      setEventsData([]); // Empty events data to prevent user from interacting with stale data during refresh
      fetchEvents().then((eventsObject) => {
        setEventsData(eventsObject.records);
        setIsRefreshing(false);
      });
    }, [])
  ); // TODO: Should probably add a cleanup function :) However, this useFocusEffect approach is temporary

  return (
    <View style={screenStyles.baseSubscreen}>
      <FlatList
        data={eventsData}
        renderItem={({ item }) => (
          <View>
            {item["fields"]["Image Background"] === "1" && (
              <EOViewerEventEntry
                source={require("../../../assets/1.jpg")}
                isoDate={item["fields"]["Starts"]}
                status={item["fields"]["Status"]}
                showStatus={showStatus()}
                blurb={item["fields"]["Blurb"]}
                onPress={() => {
                  navigation.navigate("Details", {
                    eventsList: props.type,
                    details: item,
                  });
                }}
              />
            )}
            {item["fields"]["Image Background"] === "2" && (
              <EOViewerEventEntry
                source={require("../../../assets/2.jpg")}
                isoDate={item["fields"]["Starts"]}
                status={item["fields"]["Status"]}
                showStatus={showStatus()}
                blurb={item["fields"]["Blurb"]}
                onPress={() => {
                  navigation.navigate("Details", {
                    eventsList: props.type,
                    details: item,
                  });
                }}
              />
            )}
            {item["fields"]["Image Background"] === "3" && (
              <EOViewerEventEntry
                source={require("../../../assets/3.jpg")}
                isoDate={item["fields"]["Starts"]}
                status={item["fields"]["Status"]}
                showStatus={showStatus()}
                blurb={item["fields"]["Blurb"]}
                onPress={() => {
                  navigation.navigate("Details", {
                    eventsList: props.type,
                    details: item,
                  });
                }}
              />
            )}
            {item["fields"]["Image Background"] === "4" && (
              <EOViewerEventEntry
                source={require("../../../assets/4.jpg")}
                isoDate={item["fields"]["Starts"]}
                status={item["fields"]["Status"]}
                showStatus={showStatus()}
                blurb={item["fields"]["Blurb"]}
                onPress={() => {
                  navigation.navigate("Details", {
                    eventsList: props.type,
                    details: item,
                  });
                }}
              />
            )}
            {item["fields"]["Image Background"] === "5" && (
              <EOViewerEventEntry
                source={require("../../../assets/5.jpg")}
                isoDate={item["fields"]["Starts"]}
                status={item["fields"]["Status"]}
                showStatus={showStatus()}
                blurb={item["fields"]["Blurb"]}
                onPress={() => {
                  navigation.navigate("Details", {
                    eventsList: props.type,
                    details: item,
                  });
                }}
              />
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ padding: 9 }} />}
        ListEmptyComponent={
          <ADText style={{ textAlign: "center" }}>
            {(() => {
              switch (props.type) {
                case "feed":
                  return "There's nothing in your Feed right now.";
                case "following":
                  return "Your Following list is empty.";
                case "your-shares":
                  return "You haven't shared any events recently.";
              }
            })()}
          </ADText>
        }
        ListHeaderComponent={
          <ADText
            style={[
              { textAlign: "center", marginVertical: 36, marginHorizontal: 18 },
              textStyles.largeHeading,
            ]}
          >
            {(() => {
              switch (props.type) {
                case "feed":
                  return "Your feed.";
                case "following":
                  return "Events you're following.";
                case "your-shares":
                  return "Your shares.";
              }
            })()}
          </ADText>
        }
        onRefresh={() => {
          setIsRefreshing(true);
          fetchEvents().then((eventsObject) => {
            setEventsData(eventsObject.records);
            setIsRefreshing(false);
          });
        }}
        refreshing={isRefreshing}
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 18 }}
      />
    </View>
  );
};

export default HomeSubscreen;
