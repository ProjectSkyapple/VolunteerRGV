import { FlatList, ScrollView, View } from "react-native";
import ADText from "../ADText/ADText";
import EOViewerEventEntry from "../ADEntries/EOViewerEventEntry";
import screenStyles from "../styles/screenStyles";
import textStyles from "../styles/textStyles";
import { EOEvent } from "../../types/EOEvent";
import { useEffect, useState } from "react";
import { AIRTABLE_BASE_ID, AIRTABLE_PERSONAL_ACCESS_TOKEN } from "@env";
import * as SecureStore from "expo-secure-store";

// Return user's Airtable Feed
const returnAirtableEventsListUrl = (sharedBy: string) => {
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Events?filterByFormula=AND((%7BStatus%7D+%3D+'Scheduled')%2C+NOT(%7BShared+By%7D+%3D+'${sharedBy}'))&sort%5B0%5D%5Bfield%5D=Starts&sort%5B0%5D%5Bdirection%5D=asc&view=Grid+view`;
};

interface HomeSubscreenProps {
  type?: "feed" | "following" | "your-shares";
  data?: any;
}

const HomeSubscreen = (props: HomeSubscreenProps) => {
  const [eventsData, setEventsData] = useState<EOEvent[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const fetchEvents = async () => {
    let airtableUserRecordId = await SecureStore.getItemAsync(
      "airtableUserRecordId"
    );

    let eventsResponse = await fetch(
      returnAirtableEventsListUrl(airtableUserRecordId),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        },
      }
    );

    return eventsResponse.json();
  };

  useEffect(() => {
    setIsRefreshing(true);
    fetchEvents().then((eventsObject) => {
      setEventsData(eventsObject.records);
      setIsRefreshing(false);
    });
  }, []);

  return (
    <View style={screenStyles.baseSubscreen}>
      <FlatList
        data={eventsData}
        renderItem={({ item }) => (
          <EOViewerEventEntry
            source={require("../../../assets/1.jpg")}
            isoDate={item["fields"]["Starts"]}
            blurb={item["fields"]["Blurb"]}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ padding: 9 }} />}
        /* TODO: ListEmptyComponent */
        ListHeaderComponent={
          <ADText
            style={[
              { textAlign: "center", marginVertical: 36, marginHorizontal: 18 },
              textStyles.largeHeading,
            ]}
          >
            Your feed.
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
