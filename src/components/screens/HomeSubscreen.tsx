import { FlatList, ScrollView, View } from "react-native";
import ADText from "../ADText/ADText";
import EOViewerEventEntry from "../ADEntries/EOViewerEventEntry";
import screenStyles from "../styles/screenStyles";
import textStyles from "../styles/textStyles";
import { EOEvent } from "../../types/EOEvent";

interface HomeSubscreenProps {
  type: "feed" | "following" | "your-shares";
  data: EOEvent[];
}

const HomeSubscreen = (props: HomeSubscreenProps) => {
  return (
    <View style={screenStyles.baseSubscreen}>
      <FlatList
        data={props.data}
        renderItem={({ item }) => (
          <EOViewerEventEntry
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            isoDate={item["Start Date"]}
            blurb={item["Blurb"]}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ padding: 9 }} />}
        /* TODO: ListEmptyComponent */
        ListHeaderComponent={
          <ADText
            style={[
              { textAlign: "center", marginVertical: 26, marginHorizontal: 18 },
              textStyles.largeHeading,
            ]}
          >
            Your feed.
          </ADText>
        }
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 18 }}
      />
    </View>
  );
};

export default HomeSubscreen;
